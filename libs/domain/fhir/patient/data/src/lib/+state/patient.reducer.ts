import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
	PatientBundle,
	PATIENT_BUNDLE_KEY,
} from '@dynamic-app-health/api';

import * as patientActions from './patient.actions';

export interface PatientState extends EntityState<PatientBundle> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface PatientBundlePartialState {
	readonly [PATIENT_BUNDLE_KEY]: PatientState;
}

export const patientBundleAdapter: EntityAdapter<PatientBundle> =
	createEntityAdapter<PatientBundle>({
		selectId: (entity: PatientBundle) => entity.requesterId,
	});

export const initialState: PatientState = patientBundleAdapter.getInitialState({
	loading: false,
	error: null,
	selectedId: null,
});

export const patientReducer = createReducer(
	initialState,
	on(patientActions.addPatientSuccess, (state): PatientState => {
		return {
			...state,
			loading: false,
			error: null,
		};
	}),
	on(patientActions.setSelectedPatientId, (state, { patientId }): PatientState => {
		return {
			...state,
			loading: false,
			error: null,
			selectedId: patientId,
		};
	}),

	on(patientActions.listPatientsSuccess, (state, { patientBundle }): PatientState =>
		patientBundleAdapter.addOne(patientBundle, {
			...state
		})
	),
	on(patientActions.clearPatients, (state) =>
		patientBundleAdapter.removeAll(state)
	),
	on(patientActions.setSelectedPatientId, (state, { patientId }): PatientState => ({
		...state,
		selectedId: patientId,
	}))
);

export function reducer(state: PatientState | undefined, action: Action) {
	return patientReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	patientBundleAdapter.getSelectors();
