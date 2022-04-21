import { ConfigEntity, Identifiable } from '../../common';

export interface DynamicProperties {
	[key: string]: boolean;
}

export type DynamicConfigEntity = {
	selectedId?: string;
	link?: string;
} & Identifiable &
	ConfigEntity<any>;

export type DynamicConfigEntityAdd = Omit<DynamicConfigEntity, 'id'>;

export type DynamicConfigEntityUpdate = Partial<DynamicConfigEntity> &
	Identifiable;
