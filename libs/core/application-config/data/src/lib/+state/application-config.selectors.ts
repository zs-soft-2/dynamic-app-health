import { APPLICATION_CONFIG_FEATURE_KEY } from '@dynamic-app-health/api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, applicationConfigAdapter } from './application-config.reducer';

export const getApplicationConfigState = createFeatureSelector<State>(
	APPLICATION_CONFIG_FEATURE_KEY
);

const { selectAll, selectEntities } = applicationConfigAdapter.getSelectors();

export const getApplicationConfigLoading = createSelector(
	getApplicationConfigState,
	(state: State) => state.loading
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
