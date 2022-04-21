import { PATIENT_FEATURE_KEY, PatientEntity } from '@dynamic-app-health/api';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { patientAdapter, PatientPartialState, State } from './patient.reducer';

const { selectAll, selectEntities } = patientAdapter.getSelectors();

export const getPatientState = createFeatureSelector<
	PatientPartialState,
	State
>(PATIENT_FEATURE_KEY);

export const getPatientError = createSelector(
	getPatientState,
	(state: State) => state.error
);

export const getPatientLoading = createSelector(
	getPatientState,
	(state: State) => state.loading
);

export const getSelectedId = createSelector(
	getPatientState,
	(state: State) => state.selectedId || ''
);

export const selectPatientEntities = createSelector(
	getPatientState,
	selectEntities
);

export const selectAllPatient = createSelector(getPatientState, selectAll);

export const selectSelectedPatient = createSelector(
	selectPatientEntities,
	getSelectedId,
	(patientEntities, patientID) => patientEntities[patientID]
);

export const selectPatientById = (id: string) =>
	createSelector(
		selectPatientEntities,
		(patients: Dictionary<PatientEntity>) => {
			const patient: PatientEntity | undefined = patients[id];

			if (!patient) {
				throw new Error('No Patient');
			}

			return patient;
		}
	);
