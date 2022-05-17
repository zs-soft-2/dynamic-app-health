import Client, {
	Compartment,
	FhirResource,
	SearchParams,
} from 'fhir-kit-client';
import { from, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { FhirClientService } from '@dynamic-app-health/api';

@Injectable()
export class FhirClientServiceImpl extends FhirClientService {
	private fhirClient: Client;

	public constructor() {
		super();

		this.fhirClient = new Client({
			baseUrl:
				'https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSIsImoiOiIxIn0/fhir',
		});
	}

	public getClient(): Client {
		return this.fhirClient;
	}

	public search(params: {
		resourceType: string;
		compartment?: Compartment | undefined;
		searchParams?: SearchParams | undefined;
		headers?: HeadersInit | undefined;
		options?: RequestInit | undefined;
	}): Observable<FhirResource | (FhirResource & { type: 'searchset' })> {
		const searchParams: SearchParams | undefined = params.searchParams;
		const extendedSearchParams: SearchParams = searchParams
			? {
					...searchParams,
					_total: 'accurate'
			  }
			: {
				_total: 'accurate'
			};

		return from(
			this.fhirClient.search({
				resourceType: params.resourceType,
				searchParams: extendedSearchParams,
			})
		);
	}
}
