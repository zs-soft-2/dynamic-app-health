import { combineLatest, delay, Observable, switchMap, takeUntil } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	ComponentBaseService,
	DynamicComponent,
	DynamicComponentMappingService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	DynamicLayout,
	DynamicLayoutModeEnum,
	DynamicPageEntity,
	DynamicPageParams,
	DynamicPageStateService,
	DynamicPageView,
} from '@dynamic-app-health/api';

@Injectable()
export class DynamicPageViewService extends ComponentBaseService<
	DynamicPageParams,
	null
> {
	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicPageStateService: DynamicPageStateService,
		private dynamicComponentMappingService: DynamicComponentMappingService,
		private dynamicConfigStateService: DynamicConfigStateService
	) {
		super();
	}

	public init$(): Observable<DynamicPageParams> {
		combineLatest([
			this.activatedRoute.data,
			this.dynamicPageStateService.selectEntities$(),
			this.dynamicComponentMappingService.getComponentMapping$(),
			this.dynamicConfigStateService.selectEntities$(),
		])
			.pipe(
				delay(100),
				switchMap(([data, entities, componentMap, configs]) => {
					const dynamicPage: DynamicPageEntity | undefined =
						entities.find((dynamicPage) => {
							return dynamicPage.path === data['param'];
						});

					const layout: DynamicLayout | undefined =
						dynamicPage?.layout;

					if (layout) {
						const dynamicPageView: DynamicPageView =
							this.createDynamicPageView(
								layout,
								configs,
								componentMap
							);

						this.params = this.createDynamicPageParams(
							dynamicPageView,
							layout
						);

						this.params$$.next(this.params);
					}

					return this.params$$;
				}),
				takeUntil(this.destroy)
			)
			.subscribe();

		return this.params$$.asObservable();
	}

	private createDynamicPageParams(
		dynamicPageView: DynamicPageView,
		layout: DynamicLayout
	): DynamicPageParams {
		return {
			dynamicPageView,
			dynamicLayoutViewParams: {
				mode: DynamicLayoutModeEnum.view,
				options: {
					minCols: layout.minCols,
					maxCols: layout.maxCols,
					minRows: layout.minRows,
					maxRows: layout.maxRows,
					margin: layout.margin,
				},
			},
		};
	}

	private createDynamicPageView(
		layout: DynamicLayout,
		configs: DynamicConfigEntity[],
		componentMap: Map<string, DynamicComponent>
	): DynamicPageView {
		return {
			layout: {
				...layout,
				layoutItems: layout.layoutItems.map((layoutItem) => {
					const componentName =
						layoutItem.content?.componentName || '';
					const configId = layoutItem.content?.configId || '';

					return {
						item: layoutItem.item,
						content: layoutItem.content
							? {
									component:
										componentMap.get(componentName)
											?.component,
									config: configs.find(
										(config) => config.id === configId
									),
									componentName,
									configId,
							  }
							: undefined,
					};
				}),
			},
		};
	}
}
