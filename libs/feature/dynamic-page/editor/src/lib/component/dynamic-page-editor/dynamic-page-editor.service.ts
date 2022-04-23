import {
	GridsterItem,
	GridsterItemComponentInterface,
} from 'angular-gridster2';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { combineLatest, Observable, ReplaySubject, switchMap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	DynamicComponent,
	DynamicComponentMappingService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	DynamicContent,
	DynamicLayout,
	DynamicLayoutItem,
	DynamicLayoutModeEnum,
	DynamicPageEditorParams,
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
	DynamicPageStateService,
	DynamicPageView,
} from '@dynamic-app-health/api';

import { DynamicPageEditorUtilService } from '../../util';

@Injectable()
export class DynamicPageEditorService {
	private componentMap!: Map<string, DynamicComponent>;
	private defaultItem: GridsterItem = { x: 0, y: 0, cols: 2, rows: 2 };
	private dynamicConfigs!: DynamicConfigEntity[];
	private dynamicPage!: DynamicPageEntity | undefined;
	private dynamicPageView!: DynamicPageView;
	private layout: DynamicLayout;
	private params!: DynamicPageEditorParams;
	private params$$: ReplaySubject<DynamicPageEditorParams>;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicPageStateService: DynamicPageStateService,
		private dynamicComponentMapping: DynamicComponentMappingService,
		private dynamicConfigStateService: DynamicConfigStateService,
		private componentUtil: DynamicPageEditorUtilService,
		private router: Router,
		private location: Location
	) {
		this.params$$ = new ReplaySubject();
		this.layout = {
			name: '',
			layoutItems: [],
			minCols: 1,
			maxCols: 100,
			minRows: 1,
			maxRows: 100,
		};
	}

	public addClickHandler(componentName: string): void {
		this.addItem(componentName);
	}

	public cancel(): void {
		this.back();
	}

	public edit(layoutItem: DynamicLayoutItem): void {
		let configId = layoutItem.content?.configId;

		if (!configId || configId === '0') {
			configId = nanoid(10);

			const content: DynamicContent | undefined = layoutItem.content;

			if (content) {
				content.configId = configId;

				const itemIndex: number = this.layout.layoutItems.findIndex(
					(item) => item.item['id'] === layoutItem.item['id']
				);

				if (itemIndex > -1) {
					this.layout.layoutItems[itemIndex] = layoutItem;
				}
			}

			this.updateDynamicPage(this.layout);
		}

		this.router.navigate([`config/${configId}`], {
			relativeTo: this.activatedRoute,
			queryParams: {
				componentName: layoutItem.content?.componentName,
			},
		});
	}

	public init$(): Observable<DynamicPageEditorParams> {
		return this.activatedRoute.params.pipe(
			switchMap((data) =>
				combineLatest([
					this.dynamicPageStateService.selectEntities$(),
					this.dynamicComponentMapping.getComponentMapping$(),
					this.dynamicConfigStateService.selectEntities$(),
				]).pipe(
					switchMap(([entities, componentMap, dynamicConfigs]) => {
						this.dynamicConfigs =
							dynamicConfigs as DynamicConfigEntity[];
						this.componentMap = componentMap;
						this.dynamicPage = this.componentUtil.findDynamicPage(
							entities as DynamicPageEntity[],
							data['path']
						);

						this.layout = cloneDeep(
							this.dynamicPage?.layout || this.layout
						);

						this.dynamicPageView = this.createDynamicPageView(
							this.layout,
							this.componentMap,
							this.dynamicConfigs
						);

						this.params = this.createDynamicPageEditorParams(
							componentMap,
							this.dynamicPageView,
							this.dynamicPage
						);

						this.params$$.next(this.params);

						return this.params$$;
					})
				)
			)
		);
	}

	public remove(removableItem: DynamicLayoutItem): void {
		this.removeItem(removableItem, this.layout);

		this.params = {
			...this.params,
			dynamicPageView: this.createDynamicPageView(
				this.layout,
				this.componentMap,
				this.dynamicConfigs
			),
		};

		this.params$$.next(this.params);
	}

	public submit(): void {
		if (this.dynamicPage) {
			this.updateDynamicPage(this.layout);
		} else {
			this.addDynamicPage();
		}

		this.back();
	}

	private addDynamicPage(): void {
		const dynamicPage: DynamicPageEntityAdd =
			this.componentUtil.createDynamicPage(
				this.params.formGroup,
				this.layout
			);

		this.dynamicPageStateService.dispatchAddEntityAction(dynamicPage);
	}

	private addItem(componentName: string): void {
		const layoutItem: DynamicLayoutItem =
			this.createLayoutItem(componentName);

		this.layout.layoutItems.push(layoutItem);

		this.params = {
			...this.params,
			dynamicPageView: this.createDynamicPageView(
				this.layout,
				this.componentMap,
				this.dynamicConfigs
			),
		};

		this.params$$.next(this.params);
	}

	private back(): void {
		this.location.back();
	}

	private createDynamicPageEditorParams(
		componentMap: Map<string, DynamicComponent>,
		pageView: DynamicPageView,
		dynamicPage: DynamicPageEntity | undefined
	): DynamicPageEditorParams {
		const formGroup = this.componentUtil.createFormGroup(dynamicPage);
		const layout: DynamicLayout | undefined = dynamicPage?.layout;

		const dynamicPageEditorParams: DynamicPageEditorParams = {
			components: Array.from(componentMap.values()).map((value) => value),
			formGroup,
			dynamicPageView: pageView,
			dynamicLayoutViewParams: {
				options: {
					draggable: {
						enabled: true,
					},
					resizable: {
						enabled: true,
					},
					displayGrid: 'always',
					minCols: layout?.minCols || 1,
					maxCols: layout?.maxCols || 100,
					minRows: layout?.minRows || 1,
					maxRows: layout?.maxRows || 100,
					itemChangeCallback: this.itemChangeHandler,
				},
				mode: DynamicLayoutModeEnum.edit,
			},
		};

		return dynamicPageEditorParams;
	}

	private createDynamicPageView(
		layout: DynamicLayout,
		componentMap: Map<string, DynamicComponent>,
		configs: DynamicConfigEntity[]
	): DynamicPageView {
		const dynamicPageView: DynamicPageView = {
			layout: {
				...layout,
				layoutItems: layout.layoutItems.map((layoutItem) => {
					return {
						item: layoutItem.item,
						content: layoutItem.content
							? {
									component: componentMap.get(
										layoutItem.content.componentName
									)?.component,
									config: (
										configs as DynamicConfigEntity[]
									).find(
										(config) =>
											config.id ===
											layoutItem.content?.configId
									),
									componentName:
										layoutItem.content.componentName,
									configId: layoutItem.content?.configId,
							  }
							: undefined,
					};
				}),
			},
		};

		return dynamicPageView;
	}

	private createLayoutItem(componentName: string): DynamicLayoutItem {
		return {
			item: {
				...this.defaultItem,
				id: nanoid(3),
			},
			content: {
				componentName,
			},
		};
	}

	private getConfig(configId: string): DynamicConfigEntity {
		const config: DynamicConfigEntity | undefined =
			this.dynamicConfigs.find((config) => config.id === configId);

		if (!config) {
			throw new Error('No DynamicConfigEntity');
		}

		return config;
	}

	private getLayoutByName(
		layouts: DynamicLayout[],
		layoutName: string
	): DynamicLayout {
		const foundedLayout: DynamicLayout | undefined = layouts.find(
			(layout) => layout.name === layoutName
		);

		if (!foundedLayout) {
			throw new Error();
		}

		return foundedLayout;
	}

	private itemChangeHandler(
		item: GridsterItem,
		itemComponent: GridsterItemComponentInterface
	): void {
		console.log(item, itemComponent);
	}

	private removeItem(
		removableItem: DynamicLayoutItem,
		layout: DynamicLayout
	): DynamicLayout {
		const itemIndex = layout.layoutItems.findIndex(
			(layoutItem) => layoutItem.item === removableItem.item
		);

		layout.layoutItems.splice(itemIndex, 1);

		return {
			...layout,
		};
	}

	private updateDynamicPage(layout: DynamicLayout): void {
		const dynamicPage: DynamicPageEntityUpdate =
			this.componentUtil.updateDynamicPage(this.params.formGroup, layout);

		this.dynamicPageStateService.dispatchUpdateEntityAction(dynamicPage);
	}
}
