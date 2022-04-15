import {
	APPLICATION_CONFIG_FEATURE_KEY,
	ApplicationConfigEntity,
} from '@dynamic-app-health/api';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as applicationConfigActions from './application-config.actions';

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
	on(applicationConfigActions.init, (state, { applicationConfig }) => {
		return applicationConfigAdapter.upsertOne(applicationConfig, state);
	}),
	on(
		applicationConfigActions.loadApplicationConfigSuccess,
		(state, { applicationConfig }) =>
			applicationConfigAdapter.upsertOne(applicationConfig, state)
	),
	on(
		applicationConfigActions.setSelectedApplicationConfigId,
		(state, { applicationConfigId }) => ({
			...state,
			selectedId: applicationConfigId,
		})
	),
	on(
		applicationConfigActions.updateApplicationConfigSuccess,
		(state, { applicationConfigUpdate }) =>
			applicationConfigAdapter.updateOne(applicationConfigUpdate, state)
	),
	on(
		applicationConfigActions.updateApplicationConfigFailure,
		(state, { error }) => ({ ...state, error })
	)
);

export function reducer(state: State | undefined, action: Action) {
	return applicationConfigReducer(state, action);
}
