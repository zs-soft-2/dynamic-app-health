import { ActionEnum } from '../../../common';
import { PatientResourceEnum } from './patient-resource.enum';

export class PatientPermissionsService {
	static readonly createPatientEntity =
		ActionEnum.CREATE.toString() +
		PatientResourceEnum.PATIENT_ENTITY.toString();
	static readonly deletePatientEntity =
		ActionEnum.DELETE.toString() +
		PatientResourceEnum.PATIENT_ENTITY.toString();
	static readonly updatePatientEntity =
		ActionEnum.UPDATE.toString() +
		PatientResourceEnum.PATIENT_ENTITY.toString();
	static readonly viewPatientEntity =
		ActionEnum.VIEW.toString() +
		PatientResourceEnum.PATIENT_ENTITY.toString();
}
