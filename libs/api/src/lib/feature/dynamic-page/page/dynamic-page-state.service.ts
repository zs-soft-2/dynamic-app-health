import { EntityStateService } from '../../../common';
import {
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from './dynamic-page.entity';

export abstract class DynamicPageStateService extends EntityStateService<
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate
> {}
