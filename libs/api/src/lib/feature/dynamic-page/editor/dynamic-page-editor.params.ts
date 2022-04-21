import { FormGroup } from '@angular/forms';

import { DynamicLayoutModeEnum } from '../../dynamic-layout/dynamic-layout-mode.enum';
import { DynamicComponent } from '../component';
import { DynamicPageView } from '../page';

export type DynamicPageEditorParams = {
	components: DynamicComponent[];
	formGroup: FormGroup;
	dynamicPageView: DynamicPageView;
	dynamicLayoutMode: DynamicLayoutModeEnum;
};
