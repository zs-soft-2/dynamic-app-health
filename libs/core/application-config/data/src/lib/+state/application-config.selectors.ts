import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	APPLICATION_CONFIG_FEATURE_KEY,
	State,
	applicationConfigAdapter,
} from './application-config.reducer';

// Lookup the 'ApplicationConfig' feature state managed by NgRx
export const getApplicationConfigState = createFeatureSelector<State>(
	APPLICATION_CONFIG_FEATURE_KEY
);

const { selectAll, selectEntities } = applicationConfigAdapter.getSelectors();

export const getApplicationConfigLoaded = createSelector(
	getApplicationConfigState,
	(state: State) => state.loaded
);

export const getApplicationConfigError = createSelector(
	getApplicationConfigState,
	(state: State) => state.error
);

export const getAllApplicationConfig = createSelector(
	getApplicationConfigState,
	(state: State) => selectAll(state)
);

export const getApplicationConfigEntities = createSelector(
	getApplicationConfigState,
	(state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
	getApplicationConfigState,
	(state: State) => state.selectedId
);

export const getSelected = createSelector(
	getApplicationConfigEntities,
	getSelectedId,
	(entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
