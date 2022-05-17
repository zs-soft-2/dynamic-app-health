import { Identifiable } from '../../common';

export type ApplicationConfigEntity = {
	languages: string[];
	defaultLanguage: string;
	timezones: string[];
	defaultTimezone: string;
	fhir?: {
		isServerSidePaging?: boolean;
		patient?: {
			paging?: {
				isPaging?: boolean;
			};
			searchParams?: {
				name?: string;
			}
		};
	};
} & Identifiable;

export type ApplicationConfigEntityAdd = Omit<ApplicationConfigEntity, 'id'>;

export type ApplicationConfigEntityUpdate = Partial<ApplicationConfigEntity> &
	Identifiable;
