import { createAction, props } from '@ngrx/store';
import { ApplicationConfigEntity } from './application-config.models';

export const init = createAction('[ApplicationConfig Page] Init');

export const loadApplicationConfigSuccess = createAction(
	'[ApplicationConfig/API] Load ApplicationConfig Success',
	props<{ applicationConfig: ApplicationConfigEntity[] }>()
);

export const loadApplicationConfigFailure = createAction(
	'[ApplicationConfig/API] Load ApplicationConfig Failure',
	props<{ error: any }>()
);
