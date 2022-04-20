import { BaseService } from '../../common';
import { RoleEntity } from '../../common/role';

export abstract class AuthorizationService extends BaseService {
	public abstract addPermission(permission: string): void;
	public abstract addPermissionsByRoles(roles: RoleEntity[]): void;
	public abstract addRole(role: RoleEntity): void;
	public abstract addRoles(roles: RoleEntity[]): void;
	public abstract generatePermissionName(
		action: string,
		resource: string
	): string;
	public abstract hasPermission(permissionName: string): boolean;
	public abstract hasRole(roleName: string): boolean;
	public abstract removeAll(): void;
}
