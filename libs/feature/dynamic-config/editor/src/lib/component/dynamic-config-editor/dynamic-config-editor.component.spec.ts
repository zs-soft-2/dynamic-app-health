import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicConfigEditorComponent } from './dynamic-config-editor.component';

describe('DynamicComponentConfigEditorComponent', () => {
	let component: DynamicConfigEditorComponent;
	let fixture: ComponentFixture<DynamicConfigEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DynamicConfigEditorComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicConfigEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
