import { Injectable } from '@angular/core';
import {
	ContactPoint,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
	HumanName,
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

	public createPatientView(patient: PatientEntity): PatientView {
		const name: HumanName | undefined = patient.name?.find(
			(e) => e.use === 'official'
		);
		const phone: ContactPoint | undefined = patient.telecom?.find(
			(e) => e.system === 'phone'
		);

		return {
			id: patient.id,
			givenName: name?.given?.join(' '),
			familyName: name?.family,
			birthDate: patient.birthDate,
			gender: patient.gender,
			phone: phone?.value,
		};
	}

	public getPatientDynamicConfigAdd(
		formGroupValue: any,
		configId: string | undefined
	): DynamicConfigEntity {
		const {
			label,
			id,
			link,
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
		} = formGroupValue;

		return {
			id: id || configId,
			label,
			link,
			config: {
				properties: {
					birthDate,
					familyName,
					givenName,
					gender,
					phone,
				},
			},
		};
	}

	public getPatientDynamicConfigUpdate(
		formGroupValue: any
	): DynamicConfigEntityUpdate {
		const {
			label,
			id,
			link,
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
		} = formGroupValue;

		return {
			id,
			label,
			link,
			config: {
				properties: {
					id,
					birthDate,
					familyName,
					gender,
					givenName,
					phone,
				},
			},
		};
	}

	public getPatientTableColumns(): PatientTableColumn[] {
		return this.columns;
	}
}
