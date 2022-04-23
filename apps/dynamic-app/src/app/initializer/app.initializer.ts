import {
	delay,
	filter,
	find,
	firstValueFrom,
	map,
	of,
	switchMap,
	tap,
} from 'rxjs';

import { Router, Routes } from '@angular/router';
import {
	ApplicationConfigEntity,
	ApplicationConfigInitializerService,
	ApplicationConfigStateService,
	DynamicPageEntity,
	DynamicPageRouteService,
	DynamicPageStateService,
} from '@dynamic-app-health/api';
import { DynamicPageViewComponent } from '@dynamic-app-health/feature/dynamic-page/view';

export function initializeApp(
	applicationConfigStateService: ApplicationConfigStateService,
	applicationId: string,
	applicationConfig: ApplicationConfigEntity,
	dynamicPageStateService: DynamicPageStateService,
	router: Router
) {
	return () =>
		firstValueFrom(
			of(true).pipe(
				delay(1),
				tap(() => {
					applicationConfigStateService.dispatchInitAction({
						...applicationConfig,
						id: applicationId,
					});
					applicationConfigStateService.dispatchLoadEntityAction(
						applicationId
					);
					dynamicPageStateService.dispatchListEntitiesAction();
				}),
				switchMap(() => {
					return applicationConfigStateService
						.selectEntityById$(applicationId)
						.pipe(
							map((applicationConfigEntity) => {
								ApplicationConfigInitializerService.applicationConfig =
									{
										...applicationConfig,
										...applicationConfigEntity,
									};
							})
						);
				}),
				switchMap((applicationConfig) => {
					return dynamicPageStateService.selectEntities$().pipe(
						filter((entities) => !!entities),
						map((entities) => {
							DynamicPageRouteService.dynamicPages = entities;

							return router;
						})
					);
				})
			)
		);
}
