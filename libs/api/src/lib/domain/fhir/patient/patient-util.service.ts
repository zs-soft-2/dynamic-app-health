import { PatientTableColumn } from './patient-list.params';
import { PatientEntity } from './patient.entity';
import { PatientView } from './patient.view';

export abstract class PatientUtilService {
	public abstract createPatientView(patient: PatientEntity): PatientView;
	public abstract getPatientTableColumns(): PatientTableColumn[];
}
