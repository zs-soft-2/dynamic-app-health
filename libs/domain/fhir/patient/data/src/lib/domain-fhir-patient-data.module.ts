import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	PATIENT_BUNDLE_KEY,
	PatientDataService,
	PatientStateService,
} from '@dynamic-app-health/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PatientEffects } from './+state/patient.effects';
import * as fromPatient from './+state/patient.reducer';
import { PatientDataServiceImpl, PatientStateServiceImpl } from './service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(PATIENT_BUNDLE_KEY, fromPatient.reducer),
		EffectsModule.forFeature([PatientEffects]),
	],
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
