import { TestBed } from '@angular/core/testing';

import { DynamicPageViewService } from './dynamic-page-view.service';

describe('DynamicPageViewService', () => {
	let service: DynamicPageViewService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicPageViewService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
