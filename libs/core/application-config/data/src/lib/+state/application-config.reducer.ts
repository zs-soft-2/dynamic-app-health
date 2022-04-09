import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ApplicationConfigActions from './application-config.actions';
import { ApplicationConfigEntity } from './application-config.models';

export const APPLICATION_CONFIG_FEATURE_KEY = 'applicationConfig';

export interface State extends EntityState<ApplicationConfigEntity> {
	selectedId?: string | number; // which ApplicationConfig record has been selected
	loaded: boolean; // has the ApplicationConfig list been loaded
	error?: string | null; // last known error (if any)
}

export interface ApplicationConfigPartialState {
	readonly [APPLICATION_CONFIG_FEATURE_KEY]: State;
}

export const applicationConfigAdapter: EntityAdapter<ApplicationConfigEntity> =
	createEntityAdapter<ApplicationConfigEntity>();

export const initialState: State = applicationConfigAdapter.getInitialState({
	// set initial required properties
	loaded: false,
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
