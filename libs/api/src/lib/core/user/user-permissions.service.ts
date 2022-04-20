import { ActionEnum } from '../../common/action';
import { UserResourceEnum } from './user-resource.enum';

export class UserPermissionsService {
	static readonly createUserEntity =
		ActionEnum.CREATE.toString() + UserResourceEnum.USER_ENTITY.toString();
	static readonly deleteUserEntity =
		ActionEnum.DELETE.toString() + UserResourceEnum.USER_ENTITY.toString();
	static readonly updateUserEntity =
		ActionEnum.UPDATE.toString() + UserResourceEnum.USER_ENTITY.toString();
	static readonly viewUserEntity =
		ActionEnum.VIEW.toString() + UserResourceEnum.USER_ENTITY.toString();
}
