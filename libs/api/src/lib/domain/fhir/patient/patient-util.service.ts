import {
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
} from '../../../feature';
import { PatientTableColumn } from './patient-list.params';
import { PatientEntity } from './patient.entity';
import { PatientView } from './patient.view';

export abstract class PatientUtilService {
	public abstract createPatientView(patient: PatientEntity): PatientView;
	public abstract getPatientDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity;
	public abstract getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate;
	public abstract getPatientTableColumns(): PatientTableColumn[];
}
