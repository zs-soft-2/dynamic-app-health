import { Identifiable } from '../../../common';
import { DynamicLayout } from '../../dynamic-layout';

export type DynamicPageEntity = {
	layout: DynamicLayout;
	path: string;
	label: string;
} & Identifiable;

export type DynamicPageEntityAdd = Omit<DynamicPageEntity, 'id'>;

export type DynamicPageEntityUpdate = Partial<DynamicPageEntity> & Identifiable;
