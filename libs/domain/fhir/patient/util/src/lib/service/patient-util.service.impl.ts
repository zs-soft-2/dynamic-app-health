import { Injectable } from '@angular/core';
import {
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
		const { label, id, config } = formGroupValue;

		return {
			id: id || configId,
			label,
			config
		};
	}

	public getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { label, id, config } = formGroupValue;

		return {
			id,
			label,
			config
		};
	}

	public getPatientListDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const { label, id, config } = formGroupValue;

		return {
			id: id || configId,
			label,
			config
		};
	}

	public getPatientListDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const { label, id, config } = formGroupValue;

		return {
			id,
			label,

			config
		};
	}

	public getPatientTableColumns(): PatientTableColumn[] {
		return this.columns;
	}
}
