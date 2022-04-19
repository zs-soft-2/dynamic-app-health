import { Observable } from 'rxjs';

import { EntityDataService } from '../../../common';
import { DynamicLayout } from '../../dynamic-layout';
import {
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from './dynamic-page.entity';

export abstract class DynamicPageDataService extends EntityDataService<
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate
> {
	public abstract getDynamicLayouts$(): Observable<DynamicLayout[]>;
	public abstract getDynamicPages(): DynamicPageEntity[];
}
