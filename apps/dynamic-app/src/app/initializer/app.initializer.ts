import {
	delay,
	filter,
	firstValueFrom,
	map,
	of,
	switchMap,
	tap,
} from 'rxjs';

import { Router } from '@angular/router';
import {
	ApplicationConfigEntity,
	ApplicationConfigInitializerService,
	ApplicationConfigStateService,
	DynamicPageRouteService,
	DynamicPageStateService,
} from '@dynamic-app-health/api';

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
