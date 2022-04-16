import { TestBed } from '@angular/core/testing';

import { DynamicComponentMappingServiceImpl } from './dynamic-component-mapping.service.impl';

describe('DynamicComponentMappingServiceImpl', () => {
	let service: DynamicComponentMappingServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicComponentMappingServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
