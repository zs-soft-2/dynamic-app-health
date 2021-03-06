import { ComponentBaseParam, Pagination } from '../../../common';
import { PatientView } from './patient.view';

export interface PatientTableColumn {
	field: string;
	header: string;
}

export interface PatientListParams extends ComponentBaseParam {
	columns: PatientTableColumn[];
	loading: boolean;
	patients: PatientView[];
	selectedPatientView?: PatientView;
	pagination: Pagination;
}
