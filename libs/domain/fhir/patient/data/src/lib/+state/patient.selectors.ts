import { PatientBundle, PATIENT_BUNDLE_KEY } from '@dynamic-app-health/api';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { patientBundleAdapter, PatientBundlePartialState, PatientState } from './patient.reducer';

const { selectAll, selectEntities } = patientBundleAdapter.getSelectors();

export const selectPatientBundleState = createFeatureSelector<
PatientState
>(PATIENT_BUNDLE_KEY);

export const selectPatientError = createSelector(
	selectPatientBundleState,
	(state: PatientState) => state.error
);

export const selectPatientBundleLoading = createSelector(
	selectPatientBundleState,
	(state: PatientState) => state.loading
);

export const selectSelectedPatientId = createSelector(
	selectPatientBundleState,
	(state: PatientState) => state.selectedId || ''
);

export const selectPatientBundles = createSelector(
	selectPatientBundleState,
	selectEntities
);

export const selectAllPatientBundles = createSelector(selectPatientBundleState, selectAll);


export const selectPatientBundleByRequesterId = (requesterId: string) => createSelector(
	selectPatientBundles,
	(patientBundles: Dictionary<PatientBundle>) => {
		return patientBundles[requesterId];
	}
);
