import { TestBed } from '@angular/core/testing';

import { DynamicConfigEditorService } from './dynamic-config-editor.service';

describe('DynamicConfigEditorService', () => {
	let service: DynamicConfigEditorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});

		service = TestBed.inject(DynamicConfigEditorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
