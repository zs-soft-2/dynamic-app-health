import { Observable } from 'rxjs';

import { EntityDataService } from '../entity';
import { RoleEntity, RoleEntityAdd, RoleEntityUpdate } from './role.entity';

export abstract class RoleDataService extends EntityDataService<
	RoleEntity,
	RoleEntityAdd,
	RoleEntityUpdate
> {
	public abstract listByIds$(ids: string[]): Observable<RoleEntity[]>;
}
