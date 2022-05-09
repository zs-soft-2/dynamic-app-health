import Client, {
	Compartment,
	FhirResource,
	ResourceType,
	SearchParams,
} from 'fhir-kit-client';
import { Observable } from 'rxjs';

export abstract class FhirClientService {
	public abstract getClient(): Client;
	public abstract search(params: {
		resourceType: ResourceType;
		compartment?: Compartment;
		searchParams?: SearchParams;
		headers?: HeadersInit;
		options?: RequestInit;
	}): Observable<FhirResource | (FhirResource & { type: 'searchset' })>;
}
