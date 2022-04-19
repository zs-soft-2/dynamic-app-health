import { Type } from '@angular/core';

import { DynamicConfigEntity } from '../../dynamic-config';

export type DynamicContent = {
	component?: Type<any>;
	config?: DynamicConfigEntity;
	componentName: string;
	configId?: string;
};
