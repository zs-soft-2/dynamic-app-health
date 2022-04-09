import { first, of } from 'rxjs';

import {
	ApplicationConfigEntity,
	ApplicationConfigStateService,
} from '@dynamic-app-health/api';

export function initializeApp(
	applicationConfigStateService: ApplicationConfigStateService,
	applicationId: string,
	applicationConfig: ApplicationConfigEntity
) {
	return () => {
		return new Promise((resolve) => {
			of(true)
				.pipe(first())
				.subscribe(() => {
					applicationConfigStateService.dispatchInitAction({
						...applicationConfig,
						id: applicationId,
					});

					resolve(true);
				});
		});
	};
}
