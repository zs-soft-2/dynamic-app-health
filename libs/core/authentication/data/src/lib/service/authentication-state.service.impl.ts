import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AuthenticationStateService, User } from '@dynamic-app-health/api';
import { select, Store } from '@ngrx/store';

import * as authenticationActions from '../+state/authentication.actions';
import { AuthenticationPartialState } from '../+state/authentication.reducer';
import * as authenticationSelectors from '../+state/authentication.selectors';

@Injectable()
export class AuthenticationStateServiceImpl extends AuthenticationStateService {
	public constructor(private store: Store<AuthenticationPartialState>) {
		super();
	}

	public dispatchAuthenticated(user: User | undefined): void {
		this.store.dispatch(authenticationActions.authenticated({ user }));
	}

	public dispatchGetUser(): void {
		this.store.dispatch(authenticationActions.getUser());
	}

	public dispatchLogin(): void {
		this.store.dispatch(authenticationActions.login());
	}

	public dispatchLogout(): void {
		this.store.dispatch(authenticationActions.logout());
	}

	public selectAuthenticatedUser$(): Observable<User | undefined> {
		return this.store.pipe(
			select(authenticationSelectors.selectAuthenticatedUser)
		);
	}

	public selectIsAuthenticated$(): Observable<boolean> {
		return this.store.pipe(
			select(authenticationSelectors.selectIsAuthenticated)
		);
	}
}
