import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ApplicationConfigActions from './application-config.actions';

@Injectable()
export class ApplicationConfigEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ApplicationConfigActions.updateApplicationConfig),
			fetch({
				run: (action) => {
					return ApplicationConfigActions.updateApplicationConfigSuccess(
						{
							applicationConfigUpdate: {
								id: action.applicationConfigUpdate.id,
								changes: action.applicationConfigUpdate,
							},
						}
					);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ApplicationConfigActions.updateApplicationConfigFailure(
						{ error }
					);
				},
			})
		)
	);

	constructor(private readonly actions$: Actions) {}
}
