import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { PATIENT_FEATURE_KEY, PatientEntity } from '@dynamic-app-health/api';

import * as patientActions from './patient.actions';

export interface State extends EntityState<PatientEntity> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface PatientPartialState {
	readonly [PATIENT_FEATURE_KEY]: State;
}

export const patientAdapter: EntityAdapter<PatientEntity> =
	createEntityAdapter<PatientEntity>({
		selectId: (entity: PatientEntity) => entity.id,
	});

export const initialState: State = patientAdapter.getInitialState({
	loading: false,
	error: null,
	selectedId: null,
});

export const patientReducer = createReducer(
	initialState,
	on(patientActions.addPatientSuccess, (state, { patient }) =>
		patientAdapter.addOne(patient, state)
	),
	on(patientActions.setSelectPatient, (state, { patientId }) => ({
		...state,
		loading: false,
		error: null,
		selectedId: patientId,
	})),
	on(patientActions.updatePatientSuccess, (state, { patient }) =>
		patientAdapter.updateOne(patient, state)
	),
	on(patientActions.deletePatientSuccess, (state, { patientId }) =>
		patientAdapter.removeOne(patientId, state)
	),
	on(patientActions.listPatientsSuccess, (state, { patients }) =>
		patientAdapter.upsertMany(patients, state)
	),
	on(patientActions.loadPatientSuccess, (state, { patient }) =>
		patientAdapter.upsertOne(patient, state)
	),
	on(patientActions.clearPatients, (state) =>
		patientAdapter.removeAll(state)
	),
	on(patientActions.setSelectedPatientId, (state, { patientId }) => ({
		...state,
		selectedId: patientId,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return patientReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	patientAdapter.getSelectors();
