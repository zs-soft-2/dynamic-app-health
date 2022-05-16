import { UserEntity } from './user.entity';

export abstract class UserHookService {
	public abstract loadEntity(user: UserEntity): void;
}
