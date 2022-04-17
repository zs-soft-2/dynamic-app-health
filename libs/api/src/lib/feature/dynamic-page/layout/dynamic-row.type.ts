import { DynamicColumn } from './dynamic-column.type';

export type DynamicRow = {
	columns: DynamicColumn[];
	layout: string;
};
