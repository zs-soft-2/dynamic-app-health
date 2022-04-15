import {
	ApplicationConfigEntity,
	ApplicationConfigEntityUpdate,
} from '@dynamic-app-health/api';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const init = createAction(
	'[ApplicationConfig] Init',
	props<{ applicationConfig: ApplicationConfigEntity }>()
);

export const loadApplicationConfig = createAction(
	'[ApplicationConfig] Load ApplicationConfig',
	props<{ id: string }>()
);

export const loadApplicationConfigSuccess = createAction(
	'[ApplicationConfig] Load ApplicationConfig Success',
	props<{ applicationConfig: ApplicationConfigEntity }>()
);

export const loadApplicationConfigFailure = createAction(
	'[ApplicationConfig] Load ApplicationConfig Failure',
	props<{ error: any }>()
);

export const setSelectedApplicationConfigId = createAction(
	'[ApplicationConfig] Set Selected ApplicationConfig Id',
	props<{ applicationConfigId: string }>()
);

export const updateApplicationConfig = createAction(
	'[ApplicationConfig] Update ApplicationConfig',
	props<{ applicationConfigUpdate: ApplicationConfigEntityUpdate }>()
);

export const updateApplicationConfigSuccess = createAction(
	'[ApplicationConfig] Update ApplicationConfig Success',
	props<{ applicationConfigUpdate: Update<ApplicationConfigEntityUpdate> }>()
);

export const updateApplicationConfigFailure = createAction(
	'[ApplicationConfig] Update ApplicationConfig Failure',
	props<{ error: any }>()
);
