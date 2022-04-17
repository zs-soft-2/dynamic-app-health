import { DynamicContent } from '../content';

export type DynamicColumnView = {
	class: string;
	percent: number;
	contents: DynamicContent[];
};
