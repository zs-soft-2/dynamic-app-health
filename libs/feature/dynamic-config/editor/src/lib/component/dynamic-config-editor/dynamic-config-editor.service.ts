import { map, Observable, ReplaySubject, Subject, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	DynamicComponent,
	DynamicComponentMappingService,
	DynamicConfigEditorParams,
} from '@dynamic-app-health/api';

@Injectable()
export class DynamicConfigEditorService {
	private params!: DynamicConfigEditorParams;
	private params$$: Subject<DynamicConfigEditorParams>;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicComponentMappingService: DynamicComponentMappingService
	) {
		this.params$$ = new ReplaySubject();
	}

	public init$(): Observable<DynamicConfigEditorParams> {
		return this.activatedRoute.queryParams.pipe(
			map((queryParams) => queryParams['componentName']),
			switchMap((componentName) => {
				const dynamicComponent: DynamicComponent | undefined =
					this.dynamicComponentMappingService.getComponentByKey(
						componentName
					);

				if (dynamicComponent) {
					this.params = {
						configComponent: dynamicComponent?.configComponent,
					};
				}

				this.params$$.next(this.params);

				return this.params$$;
			})
		);
	}
}
