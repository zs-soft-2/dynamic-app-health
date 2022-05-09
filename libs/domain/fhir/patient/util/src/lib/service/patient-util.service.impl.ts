import { Injectable } from '@angular/core';
import {
	ContactPoint,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
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

	public createPatientView(
		patient: PatientEntity,
		dynamicConfig: DynamicConfigEntity | undefined
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

		if (dynamicConfig?.config.properties['givenName']) {
			patientView.givenName = name?.given?.join(' ');
		}

		if (dynamicConfig?.config.properties['familyName']) {
			patientView.familyName = name?.family;
		}

		if (dynamicConfig?.config.properties['phone']) {
			patientView.phone = phone?.value;
		}

		if (dynamicConfig?.config.properties['birthDate']) {
			patientView.birthDate = patient.birthDate;
		}

		if (dynamicConfig?.config.properties['gender']) {
			patientView.gender = patient.gender;
		}

		return patientView;
	}

	public createPatientViewByConfig(
		patient: PatientEntity | undefined,
		dynamicConfig: DynamicConfigEntity | undefined
	): PatientView | undefined {
		if (!patient) {
			return patient;
		}

		return this.createPatientView(patient, dynamicConfig);
	}

	public getDefaultPagination(): Pagination {
		return this.defaultPagination;
	}

	public getPatientDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const { label, id, link, properties } = formGroupValue;

		return {
			id: id || configId,
			label,
			link,
			config: {
				properties,
			},
		};
	}

	public getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { label, id, link, properties } = formGroupValue;

		return {
			id,
			label,
			link,
			config: {
				properties,
			},
		};
	}

	public getPatientListDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const { label, id, link, properties, pagination } = formGroupValue;

		return {
			id: id || configId,
			label,
			link,
			config: {
				properties,
				pagination,
			},
		};
	}

	public getPatientListDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { label, id, link, properties, pagination } = formGroupValue;

		return {
			id,
			label,
			link,
			config: {
				properties,
				pagination,
			},
		};
	}

	public getPatientTableColumns(): PatientTableColumn[] {
		return this.columns;
	}
}
