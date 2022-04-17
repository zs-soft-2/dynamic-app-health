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
		return of([]).pipe(
			switchMap(() => {
				return of(this.componentMap);
			})
		);
	}
}
