import { TestBed } from '@angular/core/testing';

import { FhirClientServiceImpl } from './fhir-client.service.impl';

describe('FhirClientService', () => {
	let service: FhirClientServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});

		service = TestBed.inject(FhirClientServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
