import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { PatientDataService, PatientEntity } from '@dynamic-app-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as patientActions from './patient.actions';

@Injectable()
export class PatientEffects {
	public addPatient = createEffect(() =>
		this.actions$.pipe(
			ofType(patientActions.addPatient),
			switchMap((action) =>
				this.patientDataService.add$(action.patient).pipe(
					map((patient) => {
						return patientActions.addPatientSuccess({
							patient: patient as PatientEntity,
						});
					})
				)
			)
		)
	);
	public listPatients = createEffect(() =>
		this.actions$.pipe(
			ofType(patientActions.listPatients),
			switchMap(() =>
				this.patientDataService
					.search$({ resourceType: 'Patient' })
					.pipe(
						map((patients) =>
							patientActions.listPatientsSuccess({
								patients,
							})
						)
					)
			)
		)
	);
	public loadPatient = createEffect(() =>
		this.actions$.pipe(
			ofType(patientActions.loadPatient),
			switchMap((action) =>
				this.patientDataService.load$(action.id).pipe(
					map((patient) => {
						if (patient) {
							return patientActions.loadPatientSuccess({
								patient: patient as PatientEntity,
							});
						} else {
							throw new Error('Patient not exists!');
						}
					})
				)
			)
		)
	);
	public updatePatient = createEffect(() =>
		this.actions$.pipe(
			ofType(patientActions.updatePatient),
			switchMap((action) =>
				this.patientDataService.update$(action.patient).pipe(
					map((patient) => {
						return patientActions.updatePatientSuccess({
							patient: {
								id: patient.id || '',
								changes: patient,
							},
						});
					})
				)
			)
		)
	);

	public constructor(
		private actions$: Actions,
		private patientDataService: PatientDataService
	) {}
}
