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
					entities as DynamicPageEntity[]
				).find((dynamicPage) => {
					return dynamicPage.path === data['param'];
				});

				if (dynamicPage) {
					const dynamicPageView: DynamicPageView = {
						rows: dynamicPage.layout.rows.map((row) => {
							return {
								columns: row.columns.map((column) => {
									return {
										class: column.class,
										percent: column.percent,
										contents: column.contents
											? column.contents?.map(
													(content) => {
														return {
															component:
																componentMap.get(
																	content.key
																)?.component,
															config: (
																configs as DynamicConfigEntity[]
															).find(
																(config) =>
																	config.id ===
																	content.value
															),
															keyValue: content,
														};
													}
											  )
											: [],
									};
								}),
								layout: row.layout,
							};
						}),
					};

					this.dynamicPageParams = {
						dynamicPageView,
					};

					this.params$$.next(this.dynamicPageParams);
				}

				return this.params$$;
			})
		);
	}
}
