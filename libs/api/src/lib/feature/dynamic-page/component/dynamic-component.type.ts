import { Type } from '@angular/core';

import { ConfigBaseComponent } from '../../../common';
import { ConfigComponentBaseParam } from '../../../common/base/param';

export type DynamicComponent = {
	component: Type<any>;
	configComponent: Type<ConfigBaseComponent<ConfigComponentBaseParam>>;
	configComponentName: string;
	instancable: boolean;
	name: string;
};
