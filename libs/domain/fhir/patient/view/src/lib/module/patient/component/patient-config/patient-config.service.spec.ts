import { TestBed } from '@angular/core/testing';

import { PatientConfigService } from './patient-config.service';

describe('PatientConfigService', () => {
	let service: PatientConfigService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PatientConfigService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
