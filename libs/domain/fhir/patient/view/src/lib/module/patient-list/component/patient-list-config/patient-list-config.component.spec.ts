import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListConfigComponent } from './patient-list-config.component';

describe('PatientListConfigComponent', () => {
	let component: PatientListConfigComponent;
	let fixture: ComponentFixture<PatientListConfigComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PatientListConfigComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PatientListConfigComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
