import { AUTHENTICATION_FEATURE_KEY, User } from '@dynamic-app-health/api';
import { createReducer, on } from '@ngrx/store';

import * as authenticationActions from './authentication.actions';

export interface AuthenticationState {
	authenticatedUser: User | undefined;
	loading: boolean;
	error: string | null;
}

export interface AuthenticationPartialState {
	readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const authenticationReducer = createReducer(
	{ loading: false },
	on(authenticationActions.authenticated, (state, { user }) => ({
		...state,
		authenticatedUser: user,
		loading: false,
	})),
	on(authenticationActions.notAuthenticated, (state) => {
		return {
			...state,
			authenticatedUser: undefined,
			loading: false,
		};
	}),
	on(authenticationActions.logoutSuccess, (state) => {
		return {
			...state,
			authenticatedUser: undefined,
			loading: false,
		};
	}),
	on(authenticationActions.login, (state) => ({ ...state, loading: true })),
	on(authenticationActions.authError, (state) => ({
		...state,
		authenticatedUser: undefined,
		loading: false,
	}))
);
