import { Pagination } from '../../../common';
import { DynamicProperties } from '../../../feature';

export interface PatientListConfig {
	link?: string;
	pagination: Pagination;
	properties: DynamicProperties;
}
