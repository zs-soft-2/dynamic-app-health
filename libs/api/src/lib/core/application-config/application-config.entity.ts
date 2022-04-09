import { Identifiable } from '../../common';

export type ApplicationConfigEntity = {
	languages: string[];
	defaultLanguage: string;
	timezones: string[];
	defaultTimezone: string;
} & Identifiable;

export type ApplicationConfigEntityAdd = Omit<ApplicationConfigEntity, 'id'>;

export type ApplicationConfigEntityUpdate = Partial<ApplicationConfigEntity> &
	Identifiable;
