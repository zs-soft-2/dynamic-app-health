import { Observable } from 'rxjs';

import {
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigEntityUpdate,
} from './dynamic-config.type';

export abstract class DynamicConfigDataService {
	public abstract add$(
		dynamicConfig: DynamicConfigEntityAdd
	): Observable<DynamicConfigEntity>;
	public abstract list$(): Observable<DynamicConfigEntity[]>;
	public abstract load$(
		dynamicConfigId: string
	): Observable<DynamicConfigEntity>;
	public abstract update$(
		dynamicConfig: DynamicConfigEntityUpdate
	): Observable<DynamicConfigEntityUpdate>;
}
