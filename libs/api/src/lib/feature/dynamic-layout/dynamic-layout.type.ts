import { DynamicLayoutItem } from './dynamic-layout.item';

export type DynamicLayout = {
	name: string;
	layoutItems: DynamicLayoutItem[];
	minCols: number;
	maxCols: number;
	minRows: number;
	maxRows: number;
};
