import { TestBed } from '@angular/core/testing';

import { PatientListConfigService } from './patient-list-config.service';

describe('PatientListConfigService', () => {
	let service: PatientListConfigService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PatientListConfigService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
