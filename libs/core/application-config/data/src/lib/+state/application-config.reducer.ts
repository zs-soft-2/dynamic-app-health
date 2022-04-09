import {
	APPLICATION_CONFIG_FEATURE_KEY,
	ApplicationConfigEntity,
} from '@dynamic-app-health/api';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ApplicationConfigActions from './application-config.actions';

export interface State extends EntityState<ApplicationConfigEntity> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface ApplicationConfigPartialState {
	readonly [APPLICATION_CONFIG_FEATURE_KEY]: State;
}

export const applicationConfigAdapter: EntityAdapter<ApplicationConfigEntity> =
	createEntityAdapter<ApplicationConfigEntity>();

export const initialState: State = applicationConfigAdapter.getInitialState({
	selectedId: null,
	loading: false,
});

const applicationConfigReducer = createReducer(
	initialState,
	on(ApplicationConfigActions.init, (state) => ({
		...state,
		loaded: false,
		error: null,
	})),
	on(
		ApplicationConfigActions.loadApplicationConfigSuccess,
		(state, { applicationConfig }) =>
			applicationConfigAdapter.setAll(applicationConfig, {
				...state,
				loaded: true,
			})
	),
	on(
		ApplicationConfigActions.loadApplicationConfigFailure,
		(state, { error }) => ({ ...state, error })
	)
);

export function reducer(state: State | undefined, action: Action) {
	return applicationConfigReducer(state, action);
}
