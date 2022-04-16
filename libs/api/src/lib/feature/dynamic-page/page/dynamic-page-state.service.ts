import { EntityStateService } from '../base';
import { DynamicPageEntityAdd } from './dynamic-page.entity';

export abstract class DynamicPageStateService extends EntityStateService {
	public abstract override dispatchAddEntityAction(
		entity: DynamicPageEntityAdd
	): void;
}
