import { PATIENT_BUNDLE_KEY, PatientBundle } from '@dynamic-app-health/api';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

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
	on(
		patientActions.setSelectedPatientId,
		(state, { patientId }): PatientState => {
			return {
				...state,
				loading: false,
				error: null,
				selectedId: patientId,
			};
		}
	),

	on(
		patientActions.listPatientsSuccess,
		(state, { patientBundle }): PatientState =>
			patientBundleAdapter.upsertMany([patientBundle], {
				...state,
			})
	),
	on(
		patientActions.nextPatientsSuccess,
		(state, { requesterId, index, bundle }): PatientState => {
			let patientBundle: PatientBundle | undefined =
				state.entities[requesterId];

			const bundles: any = {};

			bundles[index] = bundle;

			if (patientBundle) {
				patientBundle = { ...patientBundle, bundles };
			} else {
				patientBundle = {
					requesterId,
					bundles,
					total: bundle.total || 0,
				};
			}

			return patientBundleAdapter.upsertOne(patientBundle, {
				...state,
			});
		}
	),
	on(patientActions.clearPatients, (state) =>
		patientBundleAdapter.removeAll(state)
	),
	on(
		patientActions.setSelectedPatientId,
		(state, { patientId }): PatientState => ({
			...state,
			selectedId: patientId,
		})
	)
);

export function reducer(state: PatientState | undefined, action: Action) {
	return patientReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	patientBundleAdapter.getSelectors();
