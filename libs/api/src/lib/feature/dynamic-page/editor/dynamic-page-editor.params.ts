import { FormGroup } from '@angular/forms';

import { DynamicComponent } from '../dynamic-component';
import { DynamicLayout } from '../dynamic-layout';
import { DynamicPageView } from '../dynamic-page';

export type DynamicPageEditorParams = {
	components: DynamicComponent[];
	formGroup: FormGroup;
	layouts: DynamicLayout[];
	dynamicPageView: DynamicPageView;
};
