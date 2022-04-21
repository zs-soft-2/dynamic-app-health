import {
	DYNAMIC_PAGE_FEATURE_KEY,
	DynamicPageEntity,
} from '@dynamic-app-health/api';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
	dynamicPageAdapter,
	DynamicPagePartialState,
	State,
} from './dynamic-page.reducer';

const { selectAll, selectEntities } = dynamicPageAdapter.getSelectors();

export const getDynamicPageState = createFeatureSelector<State>(
	DYNAMIC_PAGE_FEATURE_KEY
);

export const getDynamicPageError = createSelector(
	getDynamicPageState,
	(state: State) => state.error
);

export const getDynamicPageLoading = createSelector(
	getDynamicPageState,
	(state: State) => state.loading
);

export const getSelectedId = createSelector(
	getDynamicPageState,
	(state: State) => state.selectedId || ''
);

export const selectDynamicPageEntities = createSelector(
	getDynamicPageState,
	selectEntities
);

export const selectAllDynamicPage = createSelector(
	getDynamicPageState,
	selectAll
);

export const selectSelectedDynamicPage = createSelector(
	selectDynamicPageEntities,
	getSelectedId,
	(dynamicPageEntities, dynamicPageID) => dynamicPageEntities[dynamicPageID]
);

export const selectDynamicPageById = (id: string) =>
	createSelector(
		selectDynamicPageEntities,
		(dynamicPages: Dictionary<DynamicPageEntity>) => dynamicPages[id]
	);
