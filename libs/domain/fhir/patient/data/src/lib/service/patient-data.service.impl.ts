import { nanoid } from 'nanoid';
import { from, map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    Bundle, EntityUpdate, FhirClientService, PatientDataService, PatientEntity, PatientEntityAdd,
    PatientEntityUpdate, RequestParams
} from '@dynamic-app-health/api';

@Injectable()
export class PatientDataServiceImpl extends PatientDataService {
    public constructor(private fhirClientService: FhirClientService) {
		super();

		fhirClientService
			.getClient()
			.smartAuthMetadata()
			.then((response) => {
				console.log(response);
			});
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

    public search$(requestParams: RequestParams): Observable<Bundle> {
		return this.fhirClientService
			.search(requestParams)
			.pipe(map((response) => response as Bundle));
	}

    public update$(entity: EntityUpdate): Observable<PatientEntityUpdate> {
		return of(entity);
	}
}
