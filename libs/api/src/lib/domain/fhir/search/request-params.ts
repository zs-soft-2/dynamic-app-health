import { Compartment, ResourceType, SearchParams } from 'fhir-kit-client';

export interface RequestParams {
	compartment?: Compartment;
	headers?: HeadersInit;
	options?: RequestInit;
	resourceType: ResourceType;
	searchParams?: SearchParams;
}
