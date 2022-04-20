import { ComponentBaseParam } from '../../../common';
import { PatientView } from './patient.view';

export interface PatientTableColumn {
	field: string;
	header: string;
}

export interface PatientListParams extends ComponentBaseParam {
	columns: PatientTableColumn[];
	patients: PatientView[];
	selectedPatientView?: PatientView;
}
