import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ApplicationConfigActions from './application-config.actions';
import * as ApplicationConfigFeature from './application-config.reducer';

@Injectable()
export class ApplicationConfigEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ApplicationConfigActions.init),
			fetch({
				run: (action) => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return ApplicationConfigActions.loadApplicationConfigSuccess(
						{ applicationConfig: [] }
					);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ApplicationConfigActions.loadApplicationConfigFailure(
						{ error }
					);
				},
			})
		)
	);

	constructor(private readonly actions$: Actions) {}
}
