import { DynamicColumnView } from './dynamic-column-view.type';

export type DynamicRowView = {
	columns: DynamicColumnView[];
	layout: string;
};
