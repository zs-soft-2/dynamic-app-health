import { combineLatest, map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	ComponentBaseService,
	DynamicConfigEntity,
	DynamicProperties,
	Pagination,
	PatientEntity,
	PatientListConfig,
	PatientListParams,
	PatientStateService,
	PatientTableColumn,
	PatientUtilService,
	PatientView,
} from '@dynamic-app-health/api';

import { PatientListStoreService } from './patient-list-store.service';

@Injectable()
export class PatientListService extends ComponentBaseService<
	PatientListParams,
	PatientListConfig
> {
	private dynamicConfig: DynamicConfigEntity | undefined;
	private defaultPagination: Pagination;
	private defaultProperties: DynamicProperties;

	public constructor(
		private readonly router: Router,
		private readonly componentStore: PatientListStoreService,
		private readonly patientStateService: PatientStateService,
		private readonly patientUtilService: PatientUtilService
	) {
		super();

		this.defaultPagination = this.patientUtilService.getDefaultPagination();
		this.defaultProperties = this.patientUtilService.getDefaultProperties();
	}

	public handleRowSelect(selectedPatientView: PatientView): void {
		this.patientStateService.dispatchSetSelectedEntityIdAction(
			selectedPatientView.id || ''
		);

		if (this.dynamicConfig?.config.link) {
			this.router.navigateByUrl(
				'/dynamic-page' + this.dynamicConfig.config.link
			);
		}
	}

	public init$(
		dynamicConfig?: DynamicConfigEntity
	): Observable<PatientListParams> {
		this.dynamicConfig = dynamicConfig;

		const patientListConfig: PatientListConfig =
			dynamicConfig?.config as PatientListConfig;

		this.patientStateService.dispatchListEntitiesAction();
		this.componentStore.setState((state) => {
			const pagination: Pagination | undefined =
				patientListConfig?.pagination;

			return {
				...state,
				dynamicConfig,
				pagination: {
					rows: pagination?.rows || 0,
					isPagination: !!pagination?.isPagination,
					showPageLinks: pagination.showPageLinks,
					showJumpToPageDropdown: false,
				},
			};
		});

		return combineLatest([
			this.patientStateService
				.selectEntities$()
				.pipe(map((entities) => entities as PatientEntity[])),
			this.patientStateService.selectSelectedEntityId$(),
		]).pipe(
			switchMap(([patients, selectedPatientId]) => {
				const patientViews: PatientView[] = patients.map((patient) =>
					this.createPatientView(patient, this.dynamicConfig?.config.properties || this.defaultProperties)
				);

				const tableColumns: PatientTableColumn[] =
					this.createColumnsByConfig(
						this.dynamicConfig?.config.properties,
						this.patientUtilService.getPatientTableColumns()
					);

				const selectedPatientView: PatientView | undefined =
					patientViews.find(
						(patientView) => patientView.id === selectedPatientId
					);

				this.params = this.createParams(
					patientViews,
					tableColumns,
					selectedPatientView,
					this.dynamicConfig?.config.pagination ||
						this.defaultPagination
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
		selectedPatientView: PatientView | undefined,
		pagination: Pagination
	): PatientListParams {
		return {
			patients: patientViews,
			columns,
			selectedPatientView,
			pagination,
		};
	}

	private createPatientView(
		patient: PatientEntity,
		properties: DynamicProperties
	): PatientView {
		return this.patientUtilService.createPatientView(
			patient,
			properties
		);
	}
}
