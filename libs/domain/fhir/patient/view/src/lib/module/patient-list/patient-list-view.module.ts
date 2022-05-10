import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientListComponent } from './component';
import { PatientListConfigComponent } from './component/patient-list-config';

@NgModule({
	declarations: [PatientListComponent, PatientListConfigComponent],
	imports: [
		CommonModule,
		ButtonModule,
		CheckboxModule,
		FieldsetModule,
		FlexLayoutModule,
		FormsModule,
		InputTextModule,
		InputNumberModule,
		ReactiveFormsModule,
		SkeletonModule,
		TableModule,
	],
})
export class PatientListViewModule {}
