import {
	combineLatest,
	distinctUntilChanged,
	filter,
	Observable,
	of,
	switchMap,
	tap,
	withLatestFrom,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	CommonUtilService,
	ComponentBaseService,
	DynamicConfigEntity,
	DynamicProperties,
	Pagination,
	PatientBundle,
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
	private curentBundle!: PatientBundle;

	public constructor(
		private readonly router: Router,
		private readonly commonUtilService: CommonUtilService,
		private readonly componentStore: PatientListStoreService,
		private readonly patientStateService: PatientStateService,
		private readonly patientUtilService: PatientUtilService
	) {
		super();
	}

	public handleRowSelect(selectedPatientView: PatientView): void {
		this.componentStore.selectPatientView(selectedPatientView);
	}

	public init$(
		dynamicConfig?: DynamicConfigEntity
	): Observable<PatientListParams> {
		const componentId: string =
			dynamicConfig?.componentId ||
			this.commonUtilService.createComponentId();

		this.setComponentState(dynamicConfig, componentId);

		return combineLatest([
			combineLatest([
				this.patientStateService.selectPatientBundleByRequesterId$(
					componentId
				),
				this.componentStore.properties$.pipe(
					tap((properties) => {
						const tableColumns: PatientTableColumn[] =
							this.createColumnsByConfig(
								properties,
								this.patientUtilService.getPatientTableColumns()
							);

						this.componentStore.setTableColumns(tableColumns);
					})
				),
			]).pipe(
				withLatestFrom(this.componentStore.pagination$),
				switchMap(([[patientBundle, properties], pagination]) =>
					this.componentStore.indexes$.pipe(
						switchMap((indexes) => {
							if (
								patientBundle &&
								!indexes.includes(pagination.index || 0)
							) {
								this.curentBundle = patientBundle;

								const patients: PatientEntity[] | undefined =
									patientBundle?.bundles[
										pagination.index || 0
									].entry?.map(
										(entry) =>
											entry.resource as PatientEntity
									) || [];

								const patientViews: PatientView[] =
									patients.map((patient) =>
										this.createPatientView(
											patient,
											properties
										)
									);

								this.componentStore.addPatientViews(
									patientViews
								);
								this.componentStore.changeIndexes([
									pagination.index || 0,
								]);
								this.componentStore.changeLoading(false);
								this.componentStore.changeTotalOfPagination(
									patientBundle.total
								);
							}

							return of([patientBundle, properties]);
						})
					)
				)
			),
			this.componentStore.loading$,
			this.componentStore.pagination$.pipe(
				distinctUntilChanged(
					(prev, curr) =>
						prev.rows === curr.rows &&
						prev.index === curr.index &&
						curr.total === prev.total
				),
				switchMap((pagination) =>
					this.componentStore.indexes$.pipe(
						switchMap((indexes) => {
							const index = pagination.index || 0;

							if (!indexes.includes(index)) {
								this.componentStore.changeLoading(true);

								if (index === 0) {
									this.patientStateService.dispatchListPatient(
										componentId,
										index,
										pagination.rows
									);
								} else {
									this.patientStateService.dispatchNextPatient(
										componentId,
										index,
										this.curentBundle.bundles[index - 1]
									);
								}
							}

							return of(pagination);
						})
					)
				)
			),
			this.componentStore.patientViews$,
			this.componentStore.tableColumns$.pipe(
				filter((tableColumns) => tableColumns.length > 0)
			),
		]).pipe(
			switchMap(
				([_, loading, pagination, patientViews, tableColumns]) => {
					this.params = this.createParams(
						patientViews,
						tableColumns,
						loading,
						undefined,
						pagination
					);

					return of(this.params);
				}
			)
		);
	}

	public paginate(event: any): void {
		this.componentStore.changeIndexOfPagination(event.page);
	}

	private createColumnsByConfig(
		properties: DynamicProperties,
		columns: PatientTableColumn[]
	): PatientTableColumn[] {
		return columns.filter((column) => !!properties[column.field]);
	}

	private createParams(
		patientViews: PatientView[],
		columns: PatientTableColumn[],
		loading: boolean,
		selectedPatientView: PatientView | undefined,
		pagination: Pagination
	): PatientListParams {
		return {
			patients: patientViews,
			columns,
			loading,
			selectedPatientView,
			pagination,
		};
	}

	private createPatientView(
		patient: PatientEntity,
		properties: DynamicProperties
	): PatientView {
		return this.patientUtilService.createPatientView(patient, properties);
	}

	private setComponentState(
		dynamicConfig: DynamicConfigEntity | undefined,
		componentId: string
	) {
		this.componentStore.setState({
			componentId,
			indexes: [],
			link: dynamicConfig?.config.link,
			loading: true,
			pagination:
				dynamicConfig?.config.pagination ||
				this.patientUtilService.getDefaultPagination(),
			patientViews: [],
			properties:
				dynamicConfig?.config.properties ||
				this.patientUtilService.getDefaultProperties(),
			selectedPatientView: undefined,
			tableColumns: [],
		});
	}
}
