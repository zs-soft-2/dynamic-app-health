import { EntityDataService } from '../../common';
import {
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigEntityUpdate,
} from './dynamic-config.entity';

export abstract class DynamicConfigDataService extends EntityDataService<
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigEntityUpdate
> {}
