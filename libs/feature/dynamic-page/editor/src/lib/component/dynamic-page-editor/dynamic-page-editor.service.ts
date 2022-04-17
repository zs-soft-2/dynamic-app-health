import cloneDeep from 'lodash/cloneDeep';
import { nanoid } from 'nanoid';
import { combineLatest, Observable, ReplaySubject, switchMap, tap } from 'rxjs';

import { KeyValue, Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	DynamicComponent,
	DynamicComponentMappingService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	DynamicLayout,
	DynamicPageDataService,
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
	private dragedComponent!: DynamicComponent | null;
	private dynamicConfigs!: DynamicConfigEntity[];
	private dynamicPage!: DynamicPageEntity | undefined;
	private dynamicPageView!: DynamicPageView;
	private layouts!: DynamicLayout[];
	private params!: DynamicPageEditorParams;
	private params$$: ReplaySubject<DynamicPageEditorParams>;
	private selectedLayout!: DynamicLayout;
	private selectedLayoutName!: string;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicPageDataService: DynamicPageDataService,
		private dynamicPageStateService: DynamicPageStateService,
		private dynamicComponentMapping: DynamicComponentMappingService,
		private dynamicConfigStateService: DynamicConfigStateService,
		private componentUtil: DynamicPageEditorUtilService,
		private router: Router,
		private location: Location
	) {
		this.params$$ = new ReplaySubject();
	}

	public cancel(): void {
		this.back();
	}

	public dragEnd(): void {
		this.dragedComponent = null;
	}

	public dragStart(component: DynamicComponent): void {
		this.dragedComponent = component;
	}

	public drop(rowIndex: number, columnIndex: number) {
		if (this.dragedComponent) {
			const contents: KeyValue<string, string | null>[] =
				this.selectedLayout.rows[rowIndex].columns[columnIndex]
					.contents || [];

			const content: KeyValue<string, string | null> = {
				key: this.dragedComponent.name,
				value: null,
			};

			contents.push(content);

			this.dragedComponent = null;
			this.selectedLayout.rows[rowIndex].columns[columnIndex].contents =
				contents;
			this.params = {
				...this.params,
				dynamicPageView: this.createDynamicPageView(
					this.dynamicPage,
					this.selectedLayout,
					this.componentMap
				),
			};
			this.params$$.next(this.params);
		}
	}

	public edit(
		configId: string,
		componentName: string,
		rowIndex: number,
		columnIndex: number,
		componentIndex: number
	): void {
		if (configId === '0') {
			configId = nanoid(10);

			const contents: KeyValue<string, string | null>[] =
				this.selectedLayout.rows[rowIndex].columns[columnIndex]
					.contents || [];

			let content: KeyValue<string, string | null> =
				contents[componentIndex];

			if (content) {
				content.value = configId;
			} else {
				content = {
					key: componentName,
					value: configId,
				};
			}

			contents[componentIndex] = content;

			this.updateDynamicPage();
		}

		this.router.navigate([`config/${configId}`], {
			relativeTo: this.activatedRoute,
			queryParams: {
				componentName,
			},
		});
	}

	public init$(): Observable<DynamicPageEditorParams> {
		return this.activatedRoute.params.pipe(
			switchMap((data) =>
				combineLatest([
					this.dynamicPageStateService.selectEntities$(),
					this.dynamicPageDataService.getDynamicLayouts$(),
					this.dynamicComponentMapping.getComponentMapping$(),
					this.dynamicConfigStateService.selectEntities$(),
				]).pipe(
					switchMap(
						([entities, layouts, componentMap, dynamicConfigs]) => {
							this.dynamicConfigs =
								dynamicConfigs as DynamicConfigEntity[];
							this.componentMap = componentMap;
							this.layouts = cloneDeep(layouts);
							this.dynamicPage =
								this.componentUtil.findDynamicPage(
									entities as DynamicPageEntity[],
									data['path']
								);

							const layout: DynamicLayout = this.dynamicPage
								?.layout
								? this.dynamicPage?.layout
								: this.layouts[0];

							this.selectedLayout = cloneDeep(layout);
							this.selectedLayoutName = this.selectedLayout.name;
							this.dynamicPageView = this.createDynamicPageView(
								this.dynamicPage,
								this.selectedLayout,
								componentMap
							);

							this.params = this.createDynamicPageEditorParams(
								componentMap,
								layouts
							);
							this.params$$.next(this.params);

							return this.params$$;
						}
					)
				)
			)
		);
	}

	public remove(
		rowIndex: number,
		columnIndex: number,
		componentIndex: number
	): void {
		const contents: KeyValue<string, string | null>[] =
			this.selectedLayout.rows[rowIndex].columns[columnIndex].contents ||
			[];

		if (contents) {
			contents.splice(componentIndex, 1);

			this.params = {
				...this.params,
				dynamicPageView: this.createDynamicPageView(
					this.dynamicPage,
					this.selectedLayout,
					this.componentMap
				),
			};

			this.params$$.next(this.params);
		}
	}

	public submit(): void {
		if (this.dynamicPage) {
			this.updateDynamicPage();
		} else {
			this.addDynamicPage();
		}

		this.back();
	}

	private addDynamicPage(): void {
		const dynamicPage: DynamicPageEntityAdd =
			this.componentUtil.createDynamicPage(
				this.params.formGroup,
				this.selectedLayout
			);

		this.dynamicPageStateService.dispatchAddEntityAction(dynamicPage);
	}

	private back(): void {
		this.location.back();
	}

	private changeLayout(layoutName: string): void {
		const layout = this.getLayoutByName(this.layouts, layoutName);

		if (layout) {
			this.selectedLayout = layout;
			this.selectedLayoutName = layoutName;
			this.params.dynamicPageView = this.createDynamicPageView(
				this.dynamicPage,
				this.selectedLayout,
				this.componentMap
			);

			this.params$$.next(this.params);
		}
	}

	private createDynamicPageEditorParams(
		componentMap: Map<string, DynamicComponent>,
		layouts: DynamicLayout[]
	): DynamicPageEditorParams {
		const formGroup = this.componentUtil.createFormGroup(
			this.dynamicPage,
			this.selectedLayout.name
		);

		formGroup.valueChanges
			.pipe(
				tap((values) => {
					if (values['layout'] !== this.selectedLayoutName) {
						this.changeLayout(values['layout']);
					}
				})
			)
			.subscribe();

		const dynamicPageEditorParams = {
			components: Array.from(componentMap.values()).map((value) => value),
			formGroup,
			layouts: layouts,
			dynamicPageView: this.dynamicPageView,
		};

		return dynamicPageEditorParams;
	}

	private createDynamicPageView(
		dynamicPage: DynamicPageEntity | undefined,
		layout: DynamicLayout,
		componentMap: Map<string, DynamicComponent>
	): DynamicPageView {
		return {
			rows: layout.rows.map((row) => {
				return {
					columns: row.columns.map((column) => {
						return {
							class: column.class,
							percent: column.percent,
							contents: column.contents
								? column.contents.map((content) => {
										return {
											component: componentMap.get(
												content.key
											)?.component,
											config: this.dynamicConfigs.find(
												(config) =>
													config.id === content.value
											),
											keyValue: content,
										};
								  })
								: [],
						};
					}),
					layout: row.layout,
				};
			}),
		};
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

	private updateDynamicPage(): void {
		const dynamicPage: DynamicPageEntityUpdate =
			this.componentUtil.updateDynamicPage(
				this.params.formGroup,
				this.selectedLayout
			);
		this.dynamicPageStateService.dispatchUpdateEntityAction(dynamicPage);
	}
}
