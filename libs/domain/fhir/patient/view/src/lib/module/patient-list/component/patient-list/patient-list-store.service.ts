import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	DynamicProperties,
	Pagination,
	PatientTableColumn,
	PatientView,
} from '@dynamic-app-health/api';
import { ComponentStore } from '@ngrx/component-store';

export interface PatientListState {
	componentId: string;
	indexes: number[];
	link: string | undefined;
	loading: boolean;
	pagination: Pagination;
	patientViews: PatientView[];
	properties: DynamicProperties;
	selectedPatientView: PatientView | undefined;
	tableColumns: PatientTableColumn[];
}

@Injectable()
export class PatientListStoreService extends ComponentStore<PatientListState> {
	public readonly changeLoading = this.updater(
		(state, loading: boolean): PatientListState => ({
			...state,
			loading,
		})
	);
	public readonly changeTotalOfPagination = this.updater(
		(state, total: number): PatientListState => ({
			...state,
			pagination: {
				...state.pagination,
				total
			},
		})
	);
	public readonly changeIndexOfPagination = this.updater(
		(state, index: number): PatientListState => ({
			...state,
			pagination: {
				...state.pagination,
				index
			},
		})
	);
	public readonly changeIndexes = this.updater(
		(state, indexes: number[]): PatientListState => ({
			...state,
			indexes: [...state.indexes, ...indexes] 
		})
	);
	public readonly addPatientViews = this.updater(
		(state, newPatientViews: PatientView[]): PatientListState => ({
			...state,
			patientViews: [...state.patientViews, ...newPatientViews] 
		})
	);
	public readonly componentId$: Observable<string> = this.select(
		(state) => state.componentId
	);
	public readonly indexes$: Observable<number[]> = this.select(
		(state) => state.indexes
	);
	public readonly link$: Observable<string | undefined> = this.select(
		(state) => state.link
	);
	public readonly loading$: Observable<boolean> = this.select(
		(state) => state.loading
	);
	public readonly pagination$: Observable<Pagination> = this.select(
		(state) => state.pagination
	);
	public readonly patientViews$: Observable<PatientView[]> = this.select(
		(state) => state.patientViews
	);
	public readonly properties$: Observable<DynamicProperties> = this.select(
		(state) => state.properties
	);
	public readonly tableColumns$: Observable<PatientTableColumn[]> = this.select(
		(state) => state.tableColumns
	);
	public readonly selectPatientView = this.updater(
		(state, patientView: PatientView): PatientListState => ({
			...state,
			selectedPatientView: patientView,
		})
	);
	public readonly setTableColumns = this.updater(
		(state, tableColumns: PatientTableColumn[]): PatientListState => ({
			...state,
			tableColumns
		})
	);

	public constructor() {
		super();
	}
}
