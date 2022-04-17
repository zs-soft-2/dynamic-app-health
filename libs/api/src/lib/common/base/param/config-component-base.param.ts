import { FormGroup } from '@angular/forms';

import { ComponentBaseParam } from './component-base.param';

export interface ConfigComponentBaseParam extends ComponentBaseParam {
	formGroup: FormGroup;
}
