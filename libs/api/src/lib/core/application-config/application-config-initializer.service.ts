import { ApplicationConfigEntity } from './application-config.entity';

export abstract class ApplicationConfigInitializerService {
	public static applicationConfig: ApplicationConfigEntity;
}
