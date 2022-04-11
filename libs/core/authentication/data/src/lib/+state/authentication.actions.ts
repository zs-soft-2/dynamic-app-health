import { User } from '@dynamic-app-health/api';
import { createAction, props } from '@ngrx/store';

export const getUser = createAction('[Auth] Get User');

export const authenticated = createAction(
	'[Auth] Authenticated',
	props<{ user: User | undefined }>()
);

export const authenticatedSuccess = createAction(
	'[Auth] Authenticated Success',
	props<{ user: User | undefined }>()
);

export const notAuthenticated = createAction('[Auth] Not Authenticated');

export const login = createAction('[Auth] Login Attempt');

export const loginSuccess = createAction(
	'[Auth] Login Attempt Success',
	props<{ user: User | undefined }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const authError = createAction(
	'[Auth] Error',
	props<{ error: string }>()
);
