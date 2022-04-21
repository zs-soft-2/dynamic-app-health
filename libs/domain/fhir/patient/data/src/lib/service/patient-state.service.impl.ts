import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	PatientEntity,
	PatientEntityAdd,
	PatientStateService,
} from '@dynamic-app-health/api';
import { select, Store } from '@ngrx/store';

import * as patientActions from '../+state/patient.actions';
import * as fromPatient from '../+state/patient.reducer';
import * as patientSelectors from '../+state/patient.selectors';

@Injectable()
export class PatientStateServiceImpl extends PatientStateService {
	public constructor(private store: Store<fromPatient.PatientPartialState>) {
		super();
	}

	public dispatchAddEntityAction(entity: PatientEntityAdd): void {
		this.store.dispatch(patientActions.addPatient({ patient: entity }));
	}

	public dispatchDeleteEntityAction(patient: PatientEntity): void {
		this.store.dispatch(
			patientActions.deletePatient({ patientId: patient.id })
		);
	}

	public dispatchListEntitiesAction(): void {
		this.store.dispatch(patientActions.listPatients());
	}

	public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
		throw new Error('Method not implemented.');
	}

	public dispatchLoadEntityAction(id: string): void {
		this.store.dispatch(patientActions.loadPatient({ id }));
	}

	public dispatchSetSelectPatientAction(id: string): void {
		this.store.dispatch(
			patientActions.setSelectPatient({
				patientId: id,
			})
		);
	}

	public dispatchSetSelectedEntityIdAction(entityId: string): void {
		this.store.dispatch(
			patientActions.setSelectedPatientId({
				patientId: entityId,
			})
		);
	}

	public dispatchUpdateEntityAction(entity: PatientEntity): void {
		this.store.dispatch(
			patientActions.updatePatient({
				patient: entity,
			})
		);
	}

	public isLoading$(): Observable<boolean> {
		throw new Error('Method not implemented.');
	}

	public selectEntities$(): Observable<PatientEntity[]> {
		return this.store.pipe(select(patientSelectors.selectAllPatient));
	}

	public selectEntity$(): Observable<PatientEntity | undefined> {
		return this.store.pipe(select(patientSelectors.selectSelectedPatient));
	}

	public selectEntityById$(
		id: string
	): Observable<PatientEntity | undefined> {
		return this.store.pipe(select(patientSelectors.selectPatientById(id)));
	}

	public selectSelectedEntity$(): Observable<PatientEntity | undefined> {
		return this.store.pipe(select(patientSelectors.selectSelectedPatient));
	}

	public selectSelectedEntityId$(): Observable<string> {
		return this.store.pipe(select(patientSelectors.getSelectedId));
	}
}
