import { TestBed } from '@angular/core/testing';

import { DynamicPageEditorUtilService } from './dynamic-page-editor-util.service';

describe('DynamicPageEditorUtilService', () => {
	let service: DynamicPageEditorUtilService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DynamicPageEditorUtilService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
