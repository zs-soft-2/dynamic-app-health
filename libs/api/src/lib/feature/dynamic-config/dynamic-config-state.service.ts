import { EntityStateService } from '../../common';
import {
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigEntityUpdate,
} from './dynamic-config.entity';

export abstract class DynamicConfigStateService extends EntityStateService<
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigEntityUpdate
> {}
