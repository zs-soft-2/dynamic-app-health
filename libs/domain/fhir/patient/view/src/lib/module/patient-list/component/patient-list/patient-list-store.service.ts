import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	DynamicConfigEntity,
	Pagination,
	PatientListConfig,
	PatientView,
} from '@dynamic-app-health/api';
import { ComponentStore } from '@ngrx/component-store';

export interface PatientListState {
	dynamicConfig: DynamicConfigEntity | undefined;
	pagination: Pagination | undefined;
}

export const defaultPatientListState: PatientListState = {
	dynamicConfig: undefined,
	pagination: undefined,
};

@Injectable()
export class PatientListStoreService extends ComponentStore<PatientListState> {
	public readonly dynamicConfig$: Observable<
		DynamicConfigEntity | undefined
	> = this.select((state) => state.dynamicConfig);
	public readonly pagination$: Observable<Pagination | undefined> =
		this.select((state) => state.pagination);

	public constructor() {
		super(defaultPatientListState);
	}
}
