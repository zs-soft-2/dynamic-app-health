import { Injectable } from '@angular/core';
import {
	CommonUtilService,
	ContactPoint,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
	DynamicProperties,
	HumanName,
	Pagination,
	PatientEntity,
	PatientTableColumn,
	PatientUtilService,
	PatientView,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientUtilServiceImpl extends PatientUtilService {
	private columns: PatientTableColumn[] = [
		{ field: 'familyName', header: 'Family name' },
		{ field: 'givenName', header: 'Given name' },
		{ field: 'phone', header: 'Phone' },
		{ field: 'birthDate', header: 'Birthdate' },
		{ field: 'gender', header: 'Gender' },
	];
	private defaultPagination: Pagination = {
		rows: 10,
		isPagination: false,
		showPageLinks: false,
		showJumpToPageDropdown: false,
	};
	private defaultProperties: DynamicProperties = {
		familyName: true,
		givenName: true,
		phone: true,
		birthDate: true,
		gender: true,
	};

	public constructor(private commonUtilService: CommonUtilService) {
		super();
	}

	public createPatientView(
		patient: PatientEntity,
		properties: DynamicProperties
	): PatientView {
		const patientView: PatientView = {
			id: patient.id,
		};

		const name: HumanName | undefined = patient.name?.find(
			(e) => e.use === 'official'
		);
		const phone: ContactPoint | undefined = patient.telecom?.find(
			(e) => e.system === 'phone'
		);

		if (properties['givenName']) {
			patientView.givenName = name?.given?.join(' ');
		}

		if (properties['familyName']) {
			patientView.familyName = name?.family;
		}

		if (properties['phone']) {
			patientView.phone = phone?.value;
		}

		if (properties['birthDate']) {
			patientView.birthDate = patient.birthDate;
		}

		if (properties['gender']) {
			patientView.gender = patient.gender;
		}

		return patientView;
	}

	public createPatientViewByConfig(
		patient: PatientEntity | undefined,
		properties: DynamicProperties
	): PatientView | undefined {
		if (!patient) {
			return patient;
		}

		return this.createPatientView(patient, properties);
	}

	public getDefaultPagination(): Pagination {
		return this.defaultPagination;
	}

	public getDefaultProperties(): DynamicProperties {
		return this.defaultProperties;
	}

	public getPatientDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const { componentId, label, id, config } = formGroupValue;

		return {
			id: id || configId,
			componentId: componentId || this.commonUtilService.createComponentId(),
			label,
			config
		};
	}

	public getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { componentId, config, id, label  } = formGroupValue;

		return {
			componentId,
			id,
			label,
			config
		};
	}

	public getPatientListDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const { componentId, label, id, config } = formGroupValue;

		return {
			componentId: componentId || this.commonUtilService.createComponentId(),
			id: id || configId,
			label,
			config
		};
	}

	public getPatientListDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { componentId, label, id, config } = formGroupValue;

		return {
			componentId,
			config,
			id,
			label,
		};
	}

	public getPatientTableColumns(): PatientTableColumn[] {
		return this.columns;
	}
}
