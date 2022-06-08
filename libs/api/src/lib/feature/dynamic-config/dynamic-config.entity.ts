import { ConfigEntity, Identifiable } from '../../common';

export interface DynamicProperties {
	[key: string]: boolean;
}

export type DynamicConfigEntity = {
	componentId: string;
	label: string;
} & Identifiable &
	ConfigEntity<any>;

export type DynamicConfigEntityAdd = Omit<DynamicConfigEntity, 'id'>;

export type DynamicConfigEntityUpdate = Partial<DynamicConfigEntity> &
	Identifiable;
