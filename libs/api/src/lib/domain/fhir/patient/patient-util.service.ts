import { Pagination } from '../../../common';
import {
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
	DynamicProperties,
} from '../../../feature';
import { PatientTableColumn } from './patient-list.params';
import { PatientEntity } from './patient.entity';
import { PatientView } from './patient.view';

export abstract class PatientUtilService {
	public abstract createPatientView(
		patient: PatientEntity,
		properties: DynamicProperties
	): PatientView;
	public abstract createPatientViewByConfig(
		patient: PatientEntity | undefined,
		properties: DynamicProperties
	): PatientView | undefined;
	public abstract getDefaultPagination(): Pagination;
	public abstract getDefaultProperties(): DynamicProperties;
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
