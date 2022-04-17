import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPageEditorComponent } from './dynamic-page-editor.component';

describe('DynamicPageEditorComponent', () => {
	let component: DynamicPageEditorComponent;
	let fixture: ComponentFixture<DynamicPageEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DynamicPageEditorComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicPageEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
