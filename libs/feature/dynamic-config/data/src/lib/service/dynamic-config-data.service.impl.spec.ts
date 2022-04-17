import { TestBed } from '@angular/core/testing';

import { DynamicConfigDataServiceImpl } from './dynamic-config-data.service.impl';

describe('DynamicConfigDataService', () => {
	let service: DynamicConfigDataServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicConfigDataServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
