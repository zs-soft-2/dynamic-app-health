import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	Bundle,
    PatientBundle, PatientEntity, PatientEntityAdd, PatientStateService
} from '@dynamic-app-health/api';
import { Store } from '@ngrx/store';

import * as patientActions from '../+state/patient.actions';
import * as patientSelectors from '../+state/patient.selectors';

@Injectable()
export class PatientStateServiceImpl extends PatientStateService {
    public constructor(private store: Store) {
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
		throw new Error();
	}

    public dispatchListPatient(
		requesterId: string,
		index: number,
		count: number
	): void {
		this.store.dispatch(
			patientActions.listPatients({ requesterId, index, count })
		);
	}

	public dispatchNextPatient(
		requesterId: string,
		index: number,
		bundle: Bundle
	): void {
		this.store.dispatch(
			patientActions.nextPatients({ requesterId, index, bundle })
		);
	}

    public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
		throw new Error('Method not implemented.');
	}

    public dispatchLoadEntityAction(id: string): void {
		this.store.dispatch(patientActions.loadPatient({ id }));
	}

    public dispatchSetSelectPatientAction(patient: PatientEntity): void {
		this.store.dispatch(
			patientActions.setSelectedPatient({
				patient,
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

    public selectAllPatientBundles$(): Observable<PatientBundle[]> {
		return this.store.select(patientSelectors.selectAllPatientBundles);
	}

    public selectEntities$(): Observable<PatientEntity[]> {
		throw new Error();
	}

    public selectEntity$(): Observable<PatientEntity | undefined> {
		throw new Error();
	}

    public selectEntityById$(
		id: string
	): Observable<PatientEntity | undefined> {
		throw new Error();
	}

    public selectPatientBundleByRequesterId$(
		requesterId: string
	): Observable<PatientBundle | undefined> {
		return this.store.select(
			patientSelectors.selectPatientBundleByRequesterId(requesterId)
		);
	}

    public selectSelectedEntity$(): Observable<PatientEntity | undefined> {
		throw new Error();
	}

    public selectSelectedEntityId$(): Observable<string> {
		return this.store.select(patientSelectors.selectSelectedPatientId);
	}
}
