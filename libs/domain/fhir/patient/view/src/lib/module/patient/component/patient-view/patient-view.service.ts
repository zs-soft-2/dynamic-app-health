import { iif, Observable, switchMap, takeUntil } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	CommonUtilService,
	ComponentBaseService,
	DynamicConfigEntity,
	DynamicProperties,
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
	private defaultProperties: DynamicProperties;

	public constructor(
		private readonly commonUtilService: CommonUtilService,
		private readonly patientStateService: PatientStateService,
		private readonly patientUtilService: PatientUtilService
	) {
		super();

		this.defaultProperties = this.patientUtilService.getDefaultProperties();
	}

	public init$(
		dynamicConfig?: DynamicConfigEntity
	): Observable<PatientParams> {
		this.dynamicConfig = dynamicConfig;
		this.patientStateService.dispatchListEntitiesAction();
		
		const componentId = this.dynamicConfig?.componentId || this.commonUtilService.createComponentId();
		const selectedPatientId: string = this.dynamicConfig?.config.selectedId || '';

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
							this.dynamicConfig?.config.properties || this.defaultProperties
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
		properties: DynamicProperties
	): PatientView | undefined {
		return this.patientUtilService.createPatientViewByConfig(
			patient,
			properties
		);
	}
}
