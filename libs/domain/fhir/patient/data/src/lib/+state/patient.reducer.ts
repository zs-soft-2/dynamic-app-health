import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
	Bundle,
	PATIENT_BUNDLE_KEY,
} from '@dynamic-app-health/api';

import * as patientActions from './patient.actions';

export interface PatientBundle {
	requesterId: string;
	bundles: { [key: string]: Bundle };
	count: number;
}

export interface State extends EntityState<PatientBundle> {
	selectedId: string | null;
	loading: boolean;
	error?: string | null;
}

export interface PatientBundlePartialState {
	readonly [PATIENT_BUNDLE_KEY]: State;
}

export const patientBundleAdapter: EntityAdapter<PatientBundle> =
	createEntityAdapter<PatientBundle>({
		selectId: (entity: PatientBundle) => entity.requesterId,
	});

export const initialState: State = patientBundleAdapter.getInitialState({
	loading: false,
	error: null,
	selectedId: null,
});

export const patientReducer = createReducer(
	initialState,
	on(patientActions.addPatientSuccess, (state): State => {
		return {
			...state,
			loading: false,
			error: null,
		};
	}),
	on(patientActions.setSelectedPatientId, (state, { patientId }): State => {
		return {
			...state,
			loading: false,
			error: null,
			selectedId: patientId,
		};
	}),

	on(patientActions.listPatientsSuccess, (state, { patientBundle }): State =>
		patientBundleAdapter.upsertOne(patientBundle, state)
	),
	on(patientActions.clearPatients, (state) =>
		patientBundleAdapter.removeAll(state)
	),
	on(patientActions.setSelectedPatientId, (state, { patientId }): State => ({
		...state,
		selectedId: patientId,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return patientReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	patientBundleAdapter.getSelectors();
