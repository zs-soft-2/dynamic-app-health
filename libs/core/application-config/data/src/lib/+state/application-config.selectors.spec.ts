import { ApplicationConfigEntity } from './application-config.models';
import {
	applicationConfigAdapter,
	ApplicationConfigPartialState,
	initialState,
} from './application-config.reducer';
import * as ApplicationConfigSelectors from './application-config.selectors';

describe('ApplicationConfig Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getApplicationConfigId = (it: ApplicationConfigEntity) => it.id;
	const createApplicationConfigEntity = (id: string, name = '') =>
		({
			id,
			name: name || `name-${id}`,
		} as ApplicationConfigEntity);

	let state: ApplicationConfigPartialState;

	beforeEach(() => {
		state = {
			applicationConfig: applicationConfigAdapter.setAll(
				[
					createApplicationConfigEntity('PRODUCT-AAA'),
					createApplicationConfigEntity('PRODUCT-BBB'),
					createApplicationConfigEntity('PRODUCT-CCC'),
				],
				{
					...initialState,
					selectedId: 'PRODUCT-BBB',
					error: ERROR_MSG,
					loaded: true,
				}
			),
		};
	});

	describe('ApplicationConfig Selectors', () => {
		it('getAllApplicationConfig() should return the list of ApplicationConfig', () => {
			const results =
				ApplicationConfigSelectors.getAllApplicationConfig(state);
			const selId = getApplicationConfigId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getSelected() should return the selected Entity', () => {
			const result = ApplicationConfigSelectors.getSelected(
				state
			) as ApplicationConfigEntity;
			const selId = getApplicationConfigId(result);

			expect(selId).toBe('PRODUCT-BBB');
		});

		it('getApplicationConfigLoaded() should return the current "loaded" status', () => {
			const result =
				ApplicationConfigSelectors.getApplicationConfigLoaded(state);

			expect(result).toBe(true);
		});

		it('getApplicationConfigError() should return the current "error" state', () => {
			const result =
				ApplicationConfigSelectors.getApplicationConfigError(state);

			expect(result).toBe(ERROR_MSG);
		});
	});
});
