import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { PatientEntity, PatientEntityAdd } from '@dynamic-app-health/api';

export const addPatient = createAction(
	'[Patient] Add Patient',
	props<{ patient: PatientEntityAdd }>()
);

export const addPatientFail = createAction(
	'[Patient] Add Patient Fail',
	props<{ error: Error }>()
);

export const addPatientSuccess = createAction(
	'[Patient] Add Patient Success',
	props<{ patient: PatientEntity }>()
);

export const clearPatients = createAction('[Patient] Clear Patients');

export const deletePatient = createAction(
	'[Patient] Delete Patient',
	props<{ patientId: string }>()
);

export const deletePatientFail = createAction(
	'[Patient] Delete Patient Fail',
	props<{ error: Error }>()
);

export const deletePatientSuccess = createAction(
	'[Patient] Delete Patient Success',
	props<{ patientId: string }>()
);

export const listPatients = createAction('[Patient] List Patients');

export const listPatientsFail = createAction(
	'[Patient] List Patients FAIL',
	props<{ error: Error }>()
);

export const listPatientsSuccess = createAction(
	'[Patient] List Patients Success',
	props<{ patients: PatientEntity[] }>()
);

export const loadPatient = createAction(
	'[Patient] Load Patient',
	props<{ id: string }>()
);

export const loadPatientFail = createAction(
	'[Patient] Load Patient FAIL',
	props<{ error: Error }>()
);

export const loadPatientSuccess = createAction(
	'[Patient] Load Patient Success',
	props<{ patient: PatientEntity }>()
);

export const setSelectPatient = createAction(
	'[Patient] Set Selected Patient',
	props<{ patientId: string }>()
);

export const setSelectedPatientId = createAction(
	'[Patient] Set Selected Patient Id',
	props<{ patientId: string }>()
);

export const updatePatient = createAction(
	'[Patient] Update Patient',
	props<{ patient: PatientEntity }>()
);

export const updatePatientFail = createAction(
	'[Patient] Update Patient Fail',
	props<{ error: Error }>()
);

export const updatePatientSuccess = createAction(
	'[Patient] Update Patient Success',
	props<{ patient: Update<PatientEntity> }>()
);
