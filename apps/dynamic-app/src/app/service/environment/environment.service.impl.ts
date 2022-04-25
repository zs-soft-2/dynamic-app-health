import { Environment, EnvironmentService } from '@dynamic-app-health/api';

import { environment } from '../../../environments/environment';

export class EnvironmentServiceImpl extends EnvironmentService {
	private environment: Environment = environment;

	public getEnvironment(): Environment {
		return this.environment;
	}
}
