import { Type } from '@angular/core';

import { ConfigBaseComponent, ConfigComponentBaseParam } from '../base';

export type DynamicComponent = {
	component: Type<any>;
	configComponent: Type<ConfigBaseComponent<ConfigComponentBaseParam>>;
	configComponentName: string;
	instancable: boolean;
	name: string;
};
