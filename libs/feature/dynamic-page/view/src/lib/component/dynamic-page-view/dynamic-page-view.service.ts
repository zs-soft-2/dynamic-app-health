import {
	combineLatest,
	delay,
	Observable,
	ReplaySubject,
	Subject,
	switchMap,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
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
export class DynamicPageViewService {
	private dynamicPageParams!: DynamicPageParams;
	private params$$: Subject<DynamicPageParams>;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicPageStateService: DynamicPageStateService,
		private dynamicComponentMappingService: DynamicComponentMappingService,
		private dynamicConfigStateService: DynamicConfigStateService
	) {
		this.params$$ = new ReplaySubject();
	}

	public init$(): Observable<DynamicPageParams> {
		return combineLatest([
			this.activatedRoute.data,
			this.dynamicPageStateService.selectEntities$(),
			this.dynamicComponentMappingService.getComponentMapping$(),
			this.dynamicConfigStateService.selectEntities$(),
		]).pipe(
			delay(100),
			switchMap(([data, entities, componentMap, configs]) => {
				const dynamicPage: DynamicPageEntity | undefined = (
					entities
				).find((dynamicPage) => {
					return dynamicPage.path === data['param'];
				});

				const layout: DynamicLayout | undefined = dynamicPage?.layout;

				if (layout) {
					const dynamicPageView: DynamicPageView = {
						layout: {
							...layout,
							layoutItems: layout.layoutItems.map(
								(layoutItem) => {
									const componentName =
										layoutItem.content?.componentName || '';
									const configId =
										layoutItem.content?.configId || '';

									return {
										item: layoutItem.item,
										content: layoutItem.content
											? {
													component:
														componentMap.get(
															componentName
														)?.component,
													config: (
														configs as DynamicConfigEntity[]
													).find(
														(config) =>
															config.id ===
															configId
													),
													componentName,
													configId,
											  }
											: undefined,
									};
								}
							),
						},
					};

					this.dynamicPageParams = {
						dynamicPageView,
						dynamicLayoutViewParams: {
							mode: DynamicLayoutModeEnum.view,
							options: {
								minCols: layout.minCols,
								maxCols: layout.maxCols,
								minRows: layout.minRows,
								maxRows: layout.maxRows,
								margin: layout.margin
							},
						},
					};

					this.params$$.next(this.dynamicPageParams);
				}

				return this.params$$;
			})
		);
	}
}
