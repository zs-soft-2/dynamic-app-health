import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientConfigComponent, PatientViewComponent } from './component';

@NgModule({
	declarations: [PatientViewComponent, PatientConfigComponent],
	imports: [
		CommonModule,
		ButtonModule,
		CheckboxModule,
		FieldsetModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		SkeletonModule,
		TableModule,
	],
})
export class PatientViewModule {}
