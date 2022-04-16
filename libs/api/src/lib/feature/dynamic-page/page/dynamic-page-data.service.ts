import { Observable } from 'rxjs';

import { DynamicLayout } from '../dynamic-layout';
import {
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from './dynamic-page.entity';

export abstract class DynamicPageDataService {
	public abstract add$(
		dynamicPage: DynamicPageEntityAdd
	): Observable<DynamicPageEntity>;
	public abstract getDynamicLayouts$(): Observable<DynamicLayout[]>;
	public abstract getDynamicPages(): DynamicPageEntity[];
	public abstract list$(): Observable<DynamicPageEntity[]>;
	public abstract load$(dynamicPageId: string): Observable<DynamicPageEntity>;
	public abstract update$(
		dynamicPage: DynamicPageEntityUpdate
	): Observable<DynamicPageEntityUpdate>;
}
