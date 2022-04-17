import {
	DYNAMIC_CONFIG_FEATURE_KEY,
	DynamicConfigEntity,
} from '@dynamic-app-health/api';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { dynamicConfigAdapter, State } from './dynamic-config.reducer';

const { selectAll, selectEntities } = dynamicConfigAdapter.getSelectors();

export const getDynamicConfigState = createFeatureSelector<State>(
	DYNAMIC_CONFIG_FEATURE_KEY
);

export const getDynamicConfigError = createSelector(
	getDynamicConfigState,
	(state: State) => state.error
);

export const getDynamicConfigLoading = createSelector(
	getDynamicConfigState,
	(state: State) => state.loading
);

export const getSelectedId = createSelector(
	getDynamicConfigState,
	(state: State) => state.selectedId || ''
);

export const selectDynamicConfigEntities = createSelector(
	getDynamicConfigState,
	selectEntities
);

export const selectAllDynamicConfig = createSelector(
	getDynamicConfigState,
	selectAll
);

export const selectSelectedDynamicConfig = createSelector(
	selectDynamicConfigEntities,
	getSelectedId,
	(dynamicConfigEntities, dynamicConfigID) =>
		dynamicConfigEntities[dynamicConfigID]
);

export const selectDynamicConfigById = (id: string) =>
	createSelector(
		selectDynamicConfigEntities,
		(dynamicConfigs: Dictionary<DynamicConfigEntity>) => {
			const dynamicConfig: DynamicConfigEntity | undefined =
				dynamicConfigs[id];

			if (!dynamicConfig) {
				throw new Error('No DynamicConfig entity!');
			}

			return dynamicConfig;
		}
	);
