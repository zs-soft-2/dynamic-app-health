import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Bundle, PatientDataService } from '@dynamic-app-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as patientActions from './patient.actions';

@Injectable()
export class PatientEffects {
	public listPatients = createEffect(() => {
		return this.actions$.pipe(
			ofType(patientActions.listPatients),
			switchMap((action) =>
				this.patientDataService
					.search$({
						resourceType: 'Patient',
						searchParams: { _count: action.count, _sort: 'name' },
					})
					.pipe(
						map((bundle) => {
							const bundles: any = {};

							bundles[action.index] = bundle;

							return patientActions.listPatientsSuccess({
								patientBundle: {
									total: bundle.total || 0,
									bundles,
									requesterId: action.requesterId,
								},
							});
						})
					)
			)
		);
	});

	public constructor(
		private actions$: Actions,
		private patientDataService: PatientDataService
	) {}
}
