import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientViewComponent, PatientConfigComponent } from './component';

@NgModule({
	declarations: [PatientViewComponent, PatientConfigComponent],
	imports: [
		CommonModule,
		ButtonModule,
		CheckboxModule,
		DropdownModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		SkeletonModule,
		TableModule,
	],
})
export class PatientViewModule {}
