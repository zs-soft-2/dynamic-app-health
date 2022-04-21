/* eslint-disable @typescript-eslint/no-explicit-any */
import { forkJoin, from, Observable, of, switchMap, tap } from 'rxjs';

import { Injectable, Type } from '@angular/core';
import {
	DynamicComponent,
	DynamicComponentMappingService,
} from '@dynamic-app-health/api';

@Injectable()
export class DynamicComponentMappingServiceImpl
	implements DynamicComponentMappingService
{
	private componentMap: Map<string, DynamicComponent>;

	public constructor() {
		this.componentMap = new Map();
	}

	public addComponentByKey(key: string, component: Type<any>): void {
		throw new Error('Method not implemented.');
	}

	public getComponentByKey(key: string): DynamicComponent | undefined {
		return this.componentMap.get(key);
	}

	public getComponentMapping$(): Observable<Map<string, DynamicComponent>> {
		return forkJoin([
			this.getPatientComponents$().pipe(
				tap((module) => {
					this.componentMap.set('PatientViewComponent', {
						name: 'PatientViewComponent',
						component: module.PatientViewComponent,
						configComponentName: 'PatientConfigComponent',
						configComponent: module.PatientConfigComponent,
						instancable: true,
					});
				})
			),
			this.getPatientListComponents$().pipe(
				tap((module) => {
					this.componentMap.set('PatientListComponent', {
						name: 'PatientListComponent',
						component: module.PatientListComponent,
						configComponentName: 'PatientListConfigComponent',
						configComponent: module.PatientListConfigComponent,
						instancable: true,
					});
				})
			),
		]).pipe(
			switchMap(() => {
				return of(this.componentMap);
			})
		);
	}

	private getPatientComponents$(): Observable<any> {
		return from(import('@dynamic-app-health/patient-view'));
	}

	private getPatientListComponents$(): Observable<any> {
		return from(import('@dynamic-app-health/patient-list-view'));
	}
}
