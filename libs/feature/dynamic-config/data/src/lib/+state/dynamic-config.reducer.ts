import {
	DYNAMIC_CONFIG_FEATURE_KEY,
	DynamicConfigEntity,
} from '@dynamic-app-health/api';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as dynamicConfigActions from './dynamic-config.actions';

export interface State extends EntityState<DynamicConfigEntity> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface DynamicConfigPartialState {
	readonly [DYNAMIC_CONFIG_FEATURE_KEY]: State;
}

export const dynamicConfigAdapter: EntityAdapter<DynamicConfigEntity> =
	createEntityAdapter<DynamicConfigEntity>({
		selectId: (entity: DynamicConfigEntity) => entity.id,
	});

export const initialState: State = dynamicConfigAdapter.getInitialState({
	loading: false,
	error: null,
	selectedId: null,
});

export const dynamicConfigReducer = createReducer(
	initialState,
	on(
		dynamicConfigActions.addDynamicConfigSuccess,
		(state, { dynamicConfig }) =>
			dynamicConfigAdapter.addOne(dynamicConfig, state)
	),
	on(
		dynamicConfigActions.setSelectDynamicConfig,
		(state, { dynamicConfigId }) => ({
			...state,
			loading: false,
			error: null,
			selectedId: dynamicConfigId,
		})
	),
	on(
		dynamicConfigActions.updateDynamicConfigSuccess,
		(state, { dynamicConfig }) =>
			dynamicConfigAdapter.updateOne(dynamicConfig, state)
	),
	on(
		dynamicConfigActions.deleteDynamicConfigSuccess,
		(state, { dynamicConfig }) =>
			dynamicConfigAdapter.removeOne(dynamicConfig.id, state)
	),
	on(
		dynamicConfigActions.listDynamicConfigsSuccess,
		(state, { dynamicConfigs }) =>
			dynamicConfigAdapter.upsertMany(dynamicConfigs, state)
	),
	on(
		dynamicConfigActions.loadDynamicConfigSuccess,
		(state, { dynamicConfig }) =>
			dynamicConfigAdapter.upsertOne(dynamicConfig, state)
	),
	on(dynamicConfigActions.clearDynamicConfigs, (state) =>
		dynamicConfigAdapter.removeAll(state)
	),
	on(
		dynamicConfigActions.setSelectedDynamicConfigId,
		(state, { dynamicConfigId }) => ({
			...state,
			selectedId: dynamicConfigId,
		})
	)
);

export function reducer(state: State | undefined, action: Action) {
	return dynamicConfigReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	dynamicConfigAdapter.getSelectors();
