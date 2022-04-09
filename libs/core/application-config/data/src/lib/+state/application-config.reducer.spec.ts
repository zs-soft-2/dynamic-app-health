import { Action } from '@ngrx/store';

import * as ApplicationConfigActions from './application-config.actions';
import { ApplicationConfigEntity } from './application-config.models';
import { State, initialState, reducer } from './application-config.reducer';

describe('ApplicationConfig Reducer', () => {
	const createApplicationConfigEntity = (
		id: string,
		name = ''
	): ApplicationConfigEntity => ({
		id,
		name: name || `name-${id}`,
	});

	describe('valid ApplicationConfig actions', () => {
		it('loadApplicationConfigSuccess should return the list of known ApplicationConfig', () => {
			const applicationConfig = [
				createApplicationConfigEntity('PRODUCT-AAA'),
				createApplicationConfigEntity('PRODUCT-zzz'),
			];
			const action =
				ApplicationConfigActions.loadApplicationConfigSuccess({
					applicationConfig,
				});

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
