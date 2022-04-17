import {
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
} from '@dynamic-app-health/api';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addDynamicConfig = createAction(
	'[DynamicConfig] Add DynamicConfig',
	props<{ dynamicConfig: DynamicConfigEntityAdd }>()
);

export const addDynamicConfigFail = createAction(
	'[DynamicConfig] Add DynamicConfig Fail',
	props<{ error: Error }>()
);

export const addDynamicConfigSuccess = createAction(
	'[DynamicConfig] Add DynamicConfig Success',
	props<{ dynamicConfig: DynamicConfigEntity }>()
);

export const clearDynamicConfigs = createAction(
	'[DynamicConfig] Clear DynamicConfigs'
);

export const deleteDynamicConfig = createAction(
	'[DynamicConfig] Delete DynamicConfig',
	props<{ dynamicConfig: DynamicConfigEntity }>()
);

export const deleteDynamicConfigFail = createAction(
	'[DynamicConfig] Delete DynamicConfig Fail',
	props<{ error: Error }>()
);

export const deleteDynamicConfigSuccess = createAction(
	'[DynamicConfig] Delete DynamicConfig Success',
	props<{ dynamicConfig: DynamicConfigEntity }>()
);

export const listDynamicConfigs = createAction(
	'[DynamicConfig] List DynamicConfigs'
);

export const listDynamicConfigsFail = createAction(
	'[DynamicConfig] List DynamicConfigs FAIL',
	props<{ error: Error }>()
);

export const listDynamicConfigsSuccess = createAction(
	'[DynamicConfig] List DynamicConfigs Success',
	props<{ dynamicConfigs: DynamicConfigEntity[] }>()
);

export const loadDynamicConfig = createAction(
	'[DynamicConfig] Load DynamicConfig',
	props<{ id: string }>()
);

export const loadDynamicConfigFail = createAction(
	'[DynamicConfig] Load DynamicConfig FAIL',
	props<{ error: Error }>()
);

export const loadDynamicConfigSuccess = createAction(
	'[DynamicConfig] Load DynamicConfig Success',
	props<{ dynamicConfig: DynamicConfigEntity }>()
);

export const setSelectDynamicConfig = createAction(
	'[DynamicConfig] Set Selected DynamicConfig',
	props<{ dynamicConfigId: string }>()
);

export const setSelectedDynamicConfigId = createAction(
	'[DynamicConfig Admin] Set Selected DynamicConfig Id',
	props<{ dynamicConfigId: string }>()
);

export const updateDynamicConfig = createAction(
	'[DynamicConfig] Update DynamicConfig',
	props<{ dynamicConfig: DynamicConfigEntity }>()
);

export const updateDynamicConfigFail = createAction(
	'[DynamicConfig] Update DynamicConfig Fail',
	props<{ error: Error }>()
);

export const updateDynamicConfigSuccess = createAction(
	'[DynamicConfig] Update DynamicConfig Success',
	props<{ dynamicConfig: Update<DynamicConfigEntity> }>()
);
