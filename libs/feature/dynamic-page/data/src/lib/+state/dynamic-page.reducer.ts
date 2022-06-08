import {
	DYNAMIC_PAGE_FEATURE_KEY,
	DynamicPageEntity,
} from '@dynamic-app-health/api';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as dynamicPageActions from './dynamic-page.actions';

export interface State extends EntityState<DynamicPageEntity> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface DynamicPagePartialState {
	readonly [DYNAMIC_PAGE_FEATURE_KEY]: State;
}

export const dynamicPageAdapter: EntityAdapter<DynamicPageEntity> =
	createEntityAdapter<DynamicPageEntity>({
		selectId: (entity: DynamicPageEntity) => entity.id,
	});

export const initialState: State = dynamicPageAdapter.getInitialState({
	loading: false,
	error: null,
	selectedId: null,
});

export const dynamicPageReducer = createReducer(
	initialState,
	on(dynamicPageActions.addDynamicPageSuccess, (state, { dynamicPage }) =>
		dynamicPageAdapter.addOne(dynamicPage, state)
	),
	on(dynamicPageActions.setSelectDynamicPage, (state, { dynamicPageId }) => ({
		...state,
		loading: false,
		error: null,
		selectedId: dynamicPageId,
	})),
	on(dynamicPageActions.updateDynamicPageSuccess, (state, { dynamicPage }) =>
		dynamicPageAdapter.updateOne(dynamicPage, state)
	),
	on(
		dynamicPageActions.deleteDynamicPageSuccess,
		(state, { dynamicPageId }) =>
			dynamicPageAdapter.removeOne(dynamicPageId, state)
	),
	on(
		dynamicPageActions.listDynamicPagesSuccess,
		(state, { dynamicPages }) => {
			if (!state.ids.length) {
				return dynamicPageAdapter.upsertMany(dynamicPages, state);
			} else {
				return state;
			}
		}
	),
	on(dynamicPageActions.loadDynamicPageSuccess, (state, { dynamicPage }) =>
		dynamicPageAdapter.upsertOne(dynamicPage, state)
	),
	on(dynamicPageActions.clearDynamicPages, (state) =>
		dynamicPageAdapter.removeAll(state)
	),
	on(
		dynamicPageActions.setSelectedDynamicPageId,
		(state, { dynamicPageId }) => ({ ...state, selectedId: dynamicPageId })
	)
);

export function reducer(state: State | undefined, action: Action) {
	return dynamicPageReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	dynamicPageAdapter.getSelectors();
