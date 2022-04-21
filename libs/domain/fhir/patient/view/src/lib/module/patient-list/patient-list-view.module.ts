import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientListComponent } from './component';
import { CheckboxModule } from 'primeng/checkbox';
import { PatientListConfigComponent } from './component/patient-list-config';

@NgModule({
	declarations: [PatientListComponent, PatientListConfigComponent],
	imports: [
		CommonModule,
		ButtonModule,
		CheckboxModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		SkeletonModule,
		TableModule,
	],
})
export class PatientListViewModule {}
