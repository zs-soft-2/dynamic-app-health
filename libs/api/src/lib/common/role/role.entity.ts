import { Identifiable } from '../identifiable';

export type RoleEntity = {
	name: string;
	permissions: string[];
} & Identifiable;

export type RoleEntityAdd = Omit<RoleEntity, 'id'>;

export type RoleEntityUpdate = Partial<RoleEntity> & Identifiable;
