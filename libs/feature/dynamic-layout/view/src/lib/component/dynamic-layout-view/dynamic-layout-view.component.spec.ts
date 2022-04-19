import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLayoutViewComponent } from './dynamic-layout-view.component';

describe('DynamicLayoutViewComponent', () => {
	let component: DynamicLayoutViewComponent;
	let fixture: ComponentFixture<DynamicLayoutViewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DynamicLayoutViewComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicLayoutViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
