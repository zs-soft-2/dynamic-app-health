import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ApplicationConfigActions from './application-config.actions';
import { ApplicationConfigEffects } from './application-config.effects';

describe('ApplicationConfigEffects', () => {
	let actions: Observable<Action>;
	let effects: ApplicationConfigEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [
				ApplicationConfigEffects,
				provideMockActions(() => actions),
				provideMockStore(),
			],
		});

		effects = TestBed.inject(ApplicationConfigEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ApplicationConfigActions.init() });

			const expected = hot('-a-|', {
				a: ApplicationConfigActions.loadApplicationConfigSuccess({
					applicationConfig: [],
				}),
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
