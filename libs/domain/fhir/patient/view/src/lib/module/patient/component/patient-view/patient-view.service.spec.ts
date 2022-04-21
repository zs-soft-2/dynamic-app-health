import { TestBed } from '@angular/core/testing';

import { PatientViewService } from './patient-view.service';

describe('PatientViewService', () => {
	let service: PatientViewService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PatientViewService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
