import { RoleEntity } from '../../common/role';

export type UserEntity = {
	id: string;
	displayName?: string | null;
	email?: string | null;
	firstName?: string;
	language?: string;
	lastName?: string;
	phone?: string;
	photoURL?: string | null;
	roles?: RoleEntity[];
};

export type UserEntityAdd = Omit<UserEntity, 'id'>;

export type UserEntityUpdate = Partial<UserEntity>;
