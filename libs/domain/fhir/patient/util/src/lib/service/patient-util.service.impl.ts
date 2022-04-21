import { Injectable } from '@angular/core';
import {
	ContactPoint,
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

	public getPatientTableColumns(): PatientTableColumn[] {
		return this.columns;
	}
}
