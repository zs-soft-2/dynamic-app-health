import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ComponentBaseService,
	DynamicConfigEntity,
	DynamicProperties,
	PatientEntity,
	PatientListConfig,
	PatientListParams,
	PatientStateService,
	PatientTableColumn,
	PatientUtilService,
	PatientView,
} from '@dynamic-app-health/api';
import { Router } from '@angular/router';

@Injectable()
export class PatientListService extends ComponentBaseService<
	PatientListParams,
	PatientListConfig
> {
	private dynamicConfig: DynamicConfigEntity | undefined;
	private patientViews!: PatientView[];
	private selectedPatientId!: string;

	public constructor(
		private router: Router,
		private patientStateService: PatientStateService,
		private patientUtilService: PatientUtilService
	) {
		super();
	}

	public handleRowSelect(selectedPatientView: PatientView): void {
		this.patientStateService.dispatchSetSelectedEntityIdAction(
			selectedPatientView.id || ''
		);

		if (this.dynamicConfig?.link) {
			this.router.navigateByUrl('/dynamic-page' + this.dynamicConfig.link);
		}
	}

	public init$(
		dynamicConfig?: DynamicConfigEntity
	): Observable<PatientListParams> {
		this.patientStateService.dispatchListEntitiesAction();
		this.dynamicConfig = dynamicConfig;

		return combineLatest([
			this.patientStateService
				.selectEntities$()
				.pipe(map((entities) => entities as PatientEntity[])),
			this.patientStateService
				.selectSelectedEntityId$()
				.pipe(
					tap(
						(selectedPatientId) =>
							(this.selectedPatientId = selectedPatientId)
					)
				),
		]).pipe(
			switchMap(([patients, selectedPatientId]) => {
				this.patientViews = patients.map((patient) =>
					this.createPatientView(patient)
				);

				const columns: PatientTableColumn[] =
					this.createColumnsByConfig(
						this.dynamicConfig?.config.properties,
						this.patientUtilService.getPatientTableColumns()
					);

				const selectedPatientView: PatientView | undefined =
					this.patientViews.find(
						(patientView) => patientView.id === selectedPatientId
					);

				this.params = this.createParams(
					this.patientViews,
					columns,
					selectedPatientView
				);

				return of(this.params);
			})
		);
	}

	private createColumnsByConfig(
		properties: DynamicProperties | undefined,
		columns: PatientTableColumn[]
	): PatientTableColumn[] {
		return properties
			? columns.filter((column) => !!properties[column.field])
			: columns;
	}

	private createParams(
		patientViews: PatientView[],
		columns: PatientTableColumn[],
		selectedPatientView: PatientView | undefined
	): PatientListParams {
		return {
			patients: patientViews,
			columns,
			selectedPatientView,
		};
	}

	private createPatientView(patient: PatientEntity): PatientView {
		return this.patientUtilService.createPatientView(patient);
	}
}
