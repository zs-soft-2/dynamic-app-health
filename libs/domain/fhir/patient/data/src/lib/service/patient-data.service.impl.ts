import { Compartment, ResourceType, SearchParams } from 'fhir-kit-client';
import { nanoid } from 'nanoid';
import { from, map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	EntityUpdate,
	FhirClientService,
	PatientDataService,
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate,
} from '@dynamic-app-health/api';

export interface RequestParams {
	compartment?: Compartment;
	headers?: HeadersInit;
	options?: RequestInit;
	resourceType: ResourceType;
	searchParams?: SearchParams;
}

@Injectable()
export class PatientDataServiceImpl extends PatientDataService {
	public constructor(private fhirClientService: FhirClientService) {
		super();
	}

	public add$(entity: PatientEntityAdd): Observable<PatientEntity> {
		const addedEntity: PatientEntity = {
			...entity,
			id: nanoid(10),
		};

		return of(addedEntity);
	}

	public delete$(entity: PatientEntity): Observable<PatientEntity> {
		throw new Error('Method not implemented.');
	}

	public list$(): Observable<PatientEntity[]> {
		return from(
			this.fhirClientService
				.getClient()
				.search({ resourceType: 'Patient' })
		).pipe(
			switchMap((response) => {
				return of(
					response['entry'].map((entry: any) => entry.resource)
				);
			})
		);
	}

	public load$(id: string): Observable<PatientEntity> {
		return from(
			this.fhirClientService
				.getClient()
				.read({ resourceType: 'Patient', id })
		).pipe(
			switchMap((response) => {
				return of(response['entry']);
			})
		);
	}

	public search$(requestParams: RequestParams): Observable<PatientEntity[]> {
		return this.fhirClientService.search(requestParams).pipe(
			switchMap((response) => {
				const entries = response['entry'] ? response['entry'] : [];

				return of(
					entries.map((entry: any) => entry.resource as unknown)
				);
			})
		);
	}

	public update$(entity: EntityUpdate): Observable<PatientEntityUpdate> {
		return of(entity);
	}
}
