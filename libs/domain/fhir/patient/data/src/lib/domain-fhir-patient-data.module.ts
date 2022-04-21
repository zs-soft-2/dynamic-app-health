import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	PatientDataService,
	PatientStateService,
} from '@dynamic-app-health/api';

import { PatientDataServiceImpl } from './service';
import { PatientStateServiceImpl } from './service/patient-state.service.impl';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: PatientDataService,
			useClass: PatientDataServiceImpl,
		},
		{
			provide: PatientStateService,
			useClass: PatientStateServiceImpl,
		},
	],
})
export class DomainFhirPatientDataModule {}
