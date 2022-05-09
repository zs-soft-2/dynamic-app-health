import { Pagination } from '../../../common';
import {
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
} from '../../../feature';
import { PatientTableColumn } from './patient-list.params';
import { PatientEntity } from './patient.entity';
import { PatientView } from './patient.view';

export abstract class PatientUtilService {
	public abstract createPatientView(
		patient: PatientEntity,
		dynamicConfig: DynamicConfigEntity | undefined
	): PatientView;
	public abstract createPatientViewByConfig(
		patient: PatientEntity | undefined,
		dynamicConfig: DynamicConfigEntity | undefined
	): PatientView | undefined;
	public abstract getDefaultPagination(): Pagination;
	public abstract getPatientDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity;
	public abstract getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate;
	public abstract getPatientListDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity;
	public abstract getPatientListDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate;
	public abstract getPatientTableColumns(): PatientTableColumn[];
}
