import { TestBed } from '@angular/core/testing';

import { DynamicPageEditorService } from './dynamic-page-editor.service';

describe('DynamicPageEditorService', () => {
	let service: DynamicPageEditorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicPageEditorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
