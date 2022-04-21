import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConfigComponent } from './patient-config.component';

describe('PatientConfigComponent', () => {
	let component: PatientConfigComponent;
	let fixture: ComponentFixture<PatientConfigComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PatientConfigComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PatientConfigComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
