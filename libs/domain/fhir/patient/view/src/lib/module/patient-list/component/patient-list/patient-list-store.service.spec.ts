import { TestBed } from '@angular/core/testing';

import { PatientListStoreService } from './patient-list-store.service';

describe('PatientListStoreService', () => {
	let service: PatientListStoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({});

		service = TestBed.inject(PatientListStoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
