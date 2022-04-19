import { GridsterItem } from 'angular-gridster2';

import { DynamicContent } from '../dynamic-page';

export type DynamicLayoutItem = {
	item: GridsterItem;
	content?: DynamicContent | undefined;
};
