import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientUtilService } from '@dynamic-app-health/api';

import { PatientUtilServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: PatientUtilService,
			useClass: PatientUtilServiceImpl,
		},
	],
})
export class DomainFhirPatientUtilModule {}
