import { FormGroup } from '@angular/forms';

import { DynamicLayoutViewParams } from '../../dynamic-layout';
import { DynamicComponent } from '../component';
import { DynamicPageView } from '../page';

export type DynamicPageEditorParams = {
	components: DynamicComponent[];
	formGroup: FormGroup;
	dynamicPageView: DynamicPageView;
	dynamicLayoutViewParams: DynamicLayoutViewParams;
};
