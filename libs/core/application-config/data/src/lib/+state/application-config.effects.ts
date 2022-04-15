import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApplicationConfigDataService } from '@dynamic-app-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as applicationConfigActions from './application-config.actions';

@Injectable()
export class ApplicationConfigEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(applicationConfigActions.init),
			switchMap((action) =>
				this.applicationConfigDataService
					.update$(action.applicationConfig)
					.pipe(
						map((applicationConfigUpdate) =>
							applicationConfigActions.updateApplicationConfigSuccess(
								{
									applicationConfigUpdate: {
										changes: { ...applicationConfigUpdate },
										id:
											(applicationConfigUpdate &&
												applicationConfigUpdate.id) ||
											'',
									},
								}
							)
						),
						catchError((error) => {
							return of(
								applicationConfigActions.loadApplicationConfigFailure(
									{ error }
								)
							);
						})
					)
			)
		)
	);
	loadApplicationConfig$ = createEffect(() =>
		this.actions$.pipe(
			ofType(applicationConfigActions.loadApplicationConfig),
			switchMap((action) => {
				return this.applicationConfigDataService.load$(action.id).pipe(
					map((applicationConfig) => {
						return applicationConfigActions.loadApplicationConfigSuccess(
							{ applicationConfig }
						);
					}),
					catchError((error) => {
						return of(
							applicationConfigActions.loadApplicationConfigFailure(
								{ error }
							)
						);
					})
				);
			})
		)
	);

	constructor(
		private actions$: Actions,
		private applicationConfigDataService: ApplicationConfigDataService
	) {}
}
