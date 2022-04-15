import { TestBed } from '@angular/core/testing';

import { I18nServiceImpl } from './i18n.service.impl';

describe('I18nServiceImpl', () => {
	let service: I18nServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(I18nServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
