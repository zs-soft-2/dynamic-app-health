import { Type } from '@angular/core';

import { ConfigBaseComponent, ConfigComponentBaseParam } from '../base';

export interface DynamicConfigEditorParams {
	configComponent: Type<ConfigBaseComponent<ConfigComponentBaseParam>>;
}
