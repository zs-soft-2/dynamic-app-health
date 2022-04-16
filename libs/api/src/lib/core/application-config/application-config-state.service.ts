import { EntityStateService } from '../../common';
import {
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate,
} from './application-config.entity';

export abstract class ApplicationConfigStateService extends EntityStateService<
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate
> {
	public abstract dispatchInitAction(entity: ApplicationConfigEntity): void;
}
