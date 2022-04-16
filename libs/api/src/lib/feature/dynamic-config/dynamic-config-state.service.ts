import { EntityStateService } from '../base';
import { DynamicConfigEntityAdd } from './dynamic-config.type';

export abstract class DynamicConfigStateService extends EntityStateService {
	public abstract override dispatchAddEntityAction(
		entity: DynamicConfigEntityAdd
	): void;
}
