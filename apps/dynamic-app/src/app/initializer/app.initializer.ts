import { delay, firstValueFrom, map, of, switchMap, tap } from 'rxjs';

import {
	ApplicationConfigEntity,
	ApplicationConfigInitializerService,
	ApplicationConfigStateService,
} from '@dynamic-app-health/api';

export function initializeApp(
	applicationConfigStateService: ApplicationConfigStateService,
	applicationId: string,
	applicationConfig: ApplicationConfigEntity
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
				})
			)
		);
}
