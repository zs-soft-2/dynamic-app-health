import { iif, Observable, switchMap, takeUntil } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ComponentBaseService,
	ContactPoint,
	DynamicConfigEntity,
	HumanName,
	PatientConfig,
	PatientEntity,
	PatientParams,
	PatientStateService,
	PatientUtilService,
	PatientView,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientViewService extends ComponentBaseService<
	PatientParams,
	PatientConfig
> {
	private dynamicConfig: DynamicConfigEntity | undefined;

	public constructor(
		private patientStateService: PatientStateService,
		private patientUtilService: PatientUtilService
	) {
		super();
	}

	public init$(
		dynamicConfig?: DynamicConfigEntity
	): Observable<PatientParams> {
		this.dynamicConfig = dynamicConfig;
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
							dynamicConfig
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
		dynamicConfig: DynamicConfigEntity | undefined
	): PatientView | undefined {
		return this.patientUtilService.createPatientViewByConfig(
			patient,
			dynamicConfig
		);
	}
}
