import { EntityDataService } from '../../common';
import { UserEntity, UserEntityAdd, UserEntityUpdate } from './user.entity';

export abstract class UserDataService extends EntityDataService<
	UserEntity,
	UserEntityAdd,
	UserEntityUpdate
> {}
