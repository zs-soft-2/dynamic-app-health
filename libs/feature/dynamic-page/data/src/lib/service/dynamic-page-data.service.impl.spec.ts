import { TestBed } from '@angular/core/testing';

import { DynamicPageDataServiceImpl } from './dynamic-page-data.service.impl';

describe('DynamicPageDataService', () => {
	let service: DynamicPageDataServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicPageDataServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
