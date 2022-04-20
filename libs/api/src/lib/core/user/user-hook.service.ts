import { UserEntity } from './user.entity';

export abstract class UserHookService {
	public loadEntity(user: UserEntity): void {}
}
