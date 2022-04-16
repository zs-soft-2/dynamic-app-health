import { Type } from '@angular/core';

import { ConfigBaseComponent } from '../../common';
import { ConfigComponentBaseParam } from '../../common/base/param';

export interface DynamicConfigEditorParams {
	configComponent: Type<ConfigBaseComponent<ConfigComponentBaseParam>>;
}
