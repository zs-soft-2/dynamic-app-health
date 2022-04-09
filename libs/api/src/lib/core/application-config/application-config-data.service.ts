import { EntityDataService } from '../../common';
import {
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate,
} from './application-config.entity';

export abstract class ApplicationConfigDataService extends EntityDataService<
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate
> {}
