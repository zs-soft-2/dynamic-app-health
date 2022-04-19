import { TestBed } from '@angular/core/testing';

import { DynamicLayoutViewService } from './dynamic-layout-view.service';

describe('DynamicLayoutViewService', () => {
	let service: DynamicLayoutViewService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicLayoutViewService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
