import { EntityStateService } from '../entity';
import { RoleEntity, RoleEntityAdd, RoleEntityUpdate } from './role.entity';

export abstract class RoleStateService extends EntityStateService<
	RoleEntity,
	RoleEntityAdd,
	RoleEntityUpdate
> {}
