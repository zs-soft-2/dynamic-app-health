import { EntityStateService } from '../../common';
import { UserEntity, UserEntityAdd, UserEntityUpdate } from './user.entity';

export abstract class UserStateService extends EntityStateService<
	UserEntity,
	UserEntityAdd,
	UserEntityUpdate
> {}
