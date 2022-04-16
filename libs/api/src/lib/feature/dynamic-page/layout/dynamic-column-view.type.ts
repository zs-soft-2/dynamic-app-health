import { DynamicContent } from '../dynamic-content';

export type DynamicColumnView = {
	class: string;
	percent: number;
	contents: DynamicContent[];
};
