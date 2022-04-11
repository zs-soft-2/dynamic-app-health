import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BaseService } from '@dynamic-app-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as authenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects extends BaseService {
	public login = createEffect(() =>
		this.actions$.pipe(
			ofType(authenticationActions.authenticated),
			switchMap((action) => {
				return of(
					authenticationActions.authenticatedSuccess({
						user: action.user,
					})
				);
			}),
			catchError((err) => {
				return of(
					authenticationActions.authError({ error: err.message })
				);
			})
		)
	);
	public logout = createEffect(() =>
		this.actions$.pipe(
			ofType(authenticationActions.logout),
			map(() => {
				return authenticationActions.logoutSuccess();
			}),
			catchError((error) =>
				of(authenticationActions.authError({ error: error.message }))
			)
		)
	);

	public constructor(private actions$: Actions) {
		super();
	}
}
