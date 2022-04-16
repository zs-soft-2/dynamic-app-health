import { DynamicLayout } from '../dynamic-layout';
import { Identifiable } from '../identifiable';

export type DynamicPageEntity = {
	layout: DynamicLayout;
	path: string;
	label: string;
} & Identifiable;

export type DynamicPageEntityAdd = Omit<DynamicPageEntity, 'id'>;

export type DynamicPageEntityUpdate = Partial<DynamicPageEntity> & Identifiable;
