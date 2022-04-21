import Client from 'fhir-kit-client';

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
}
