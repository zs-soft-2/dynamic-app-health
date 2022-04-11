import { TestBed } from '@angular/core/testing';

import { ErrorUtilService } from './error-util.service';

describe('ErrorUtilService', () => {
	let service: ErrorUtilService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ErrorUtilService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
