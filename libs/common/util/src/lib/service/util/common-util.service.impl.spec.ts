import { TestBed } from '@angular/core/testing';

import { CommonUtilServiceImpl } from './common-util.service.impl';

describe('CommonUtilServiceImpl', () => {
	let service: CommonUtilServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});

		service = TestBed.inject(CommonUtilServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
