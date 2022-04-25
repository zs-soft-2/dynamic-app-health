import { Environment } from './environment.model';

export abstract class EnvironmentService {
	public abstract getEnvironment(): Environment;
}
