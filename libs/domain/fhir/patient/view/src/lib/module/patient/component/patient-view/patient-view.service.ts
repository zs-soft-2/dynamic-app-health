import { iif, Observable, switchMap, takeUntil } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ComponentBaseService,
	ConfigEntity,
	ContactPoint,
	DynamicConfigEntity,
	HumanName,
	PatientConfig,
	PatientEntity,
	PatientParams,
	PatientStateService,
	PatientView,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientViewService extends ComponentBaseService<
	PatientParams,
	PatientConfig
> {
	private dynamicConfig: DynamicConfigEntity | undefined;

	public constructor(private patientStateService: PatientStateService) {
		super();
	}

	public init$(
		dynamicCconfig?: DynamicConfigEntity
	): Observable<PatientParams> {
		this.dynamicConfig = dynamicCconfig;
		this.patientStateService.dispatchListEntitiesAction();

		const selectedPatientId: string = this.dynamicConfig?.selectedId || '';

		iif(
			() => !!selectedPatientId,
			this.patientStateService.selectEntityById$(selectedPatientId),
			this.patientStateService.selectSelectedEntity$()
		)
			.pipe(
				switchMap((entity) => {
					const patient: PatientEntity | undefined =
						entity as PatientEntity;

					this.params = {
						patient: this.createPatientViewByConfig(
							patient,
							dynamicCconfig
						),
					} as PatientParams;

					this.params$$.next(this.params);

					return this.params$$;
				}),
				takeUntil(this.destroy)
			)
			.subscribe();

		return this.params$$;
	}

	private createPatientViewByConfig(
		patient: PatientEntity | undefined,
		config: DynamicConfigEntity | undefined
	): PatientView | undefined {
		if (!patient) {
			return patient;
		}

		const patientView: PatientView = {
			id: patient.id,
		};

		const name: HumanName | undefined = patient.name?.find(
			(e) => e.use === 'official'
		);
		const phone: ContactPoint | undefined = patient.telecom?.find(
			(e) => e.system === 'phone'
		);

		if (this.dynamicConfig?.config?.properties['givenName']) {
			patientView.givenName = name?.given?.join(' ');
		}

		if (this.dynamicConfig?.config?.properties['familyName']) {
			patientView.familyName = name?.family;
		}

		if (this.dynamicConfig?.config?.properties['phone']) {
			patientView.phone = phone?.value;
		}

		if (this.dynamicConfig?.config?.properties['birthDate']) {
			patientView.birthDate = patient.birthDate;
		}

		if (this.dynamicConfig?.config?.properties['gender']) {
			patientView.gender = patient.gender;
		}

		return patientView;
	}
}
