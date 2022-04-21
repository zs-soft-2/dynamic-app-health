import Client from 'fhir-kit-client';

export abstract class FhirClientService {
	public abstract getClient(): Client;
}
