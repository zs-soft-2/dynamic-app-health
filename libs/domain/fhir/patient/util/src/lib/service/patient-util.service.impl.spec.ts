import { TestBed } from '@angular/core/testing';

import { PatientUtilServiceImpl } from './patient-util.service.impl';

describe('PatientUtilServiceImpl', () => {
	let service: PatientUtilServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PatientUtilServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
