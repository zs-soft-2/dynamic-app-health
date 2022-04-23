import { GridsterConfig } from 'angular-gridster2';

import { DynamicLayoutModeEnum } from './dynamic-layout-mode.enum';

export interface DynamicLayoutViewParams {
	mode: DynamicLayoutModeEnum;
	options: GridsterConfig;
}
