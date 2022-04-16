import {
	DynamicPageEntity,
	DynamicPageEntityAdd,
} from '@dynamic-app-health/api';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addDynamicPage = createAction(
	'[DynamicPage] Add DynamicPage',
	props<{ dynamicPage: DynamicPageEntityAdd }>()
);

export const addDynamicPageFail = createAction(
	'[DynamicPage] Add DynamicPage Fail',
	props<{ error: Error }>()
);

export const addDynamicPageSuccess = createAction(
	'[DynamicPage] Add DynamicPage Success',
	props<{ dynamicPage: DynamicPageEntity }>()
);

export const clearDynamicPages = createAction(
	'[DynamicPage] Clear DynamicPages'
);

export const deleteDynamicPage = createAction(
	'[DynamicPage] Delete DynamicPage',
	props<{ dynamicPage: DynamicPageEntity }>()
);

export const deleteDynamicPageFail = createAction(
	'[DynamicPage] Delete DynamicPage Fail',
	props<{ error: Error }>()
);

export const deleteDynamicPageSuccess = createAction(
	'[DynamicPage] Delete DynamicPage Success',
	props<{ dynamicPageId: string }>()
);

export const listDynamicPages = createAction('[DynamicPage] List DynamicPages');

export const listDynamicPagesFail = createAction(
	'[DynamicPage] List DynamicPages FAIL',
	props<{ error: Error }>()
);

export const listDynamicPagesSuccess = createAction(
	'[DynamicPage] List DynamicPages Success',
	props<{ dynamicPages: DynamicPageEntity[] }>()
);

export const loadDynamicPage = createAction(
	'[DynamicPage] Load DynamicPage',
	props<{ id: string }>()
);

export const loadDynamicPageFail = createAction(
	'[DynamicPage] Load DynamicPage FAIL',
	props<{ error: Error }>()
);

export const loadDynamicPageSuccess = createAction(
	'[DynamicPage] Load DynamicPage Success',
	props<{ dynamicPage: DynamicPageEntity }>()
);

export const setSelectDynamicPage = createAction(
	'[DynamicPage] Set Selected DynamicPage',
	props<{ dynamicPageId: string }>()
);

export const setSelectedDynamicPageId = createAction(
	'[DynamicPage Admin] Set Selected DynamicPage Id',
	props<{ dynamicPageId: string }>()
);

export const updateDynamicPage = createAction(
	'[DynamicPage] Update DynamicPage',
	props<{ dynamicPage: DynamicPageEntity }>()
);

export const updateDynamicPageFail = createAction(
	'[DynamicPage] Update DynamicPage Fail',
	props<{ error: Error }>()
);

export const updateDynamicPageSuccess = createAction(
	'[DynamicPage] Update DynamicPage Success',
	props<{ dynamicPage: Update<DynamicPageEntity> }>()
);
