import Client, { FhirResource } from 'fhir-kit-client';
import { Observable } from 'rxjs';

import { RequestParams } from '../../domain';

export abstract class FhirClientService {
	public abstract getClient(): Client;
	public abstract search(
		params: RequestParams
	): Observable<FhirResource | (FhirResource & { type: 'searchset' })>;
}
