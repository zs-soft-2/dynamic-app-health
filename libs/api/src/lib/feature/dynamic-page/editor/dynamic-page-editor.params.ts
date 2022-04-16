import { FormGroup } from '@angular/forms';

import { DynamicComponent } from '../component';
import { DynamicLayout } from '../layout';
import { DynamicPageView } from '../page';

export type DynamicPageEditorParams = {
	components: DynamicComponent[];
	formGroup: FormGroup;
	layouts: DynamicLayout[];
	dynamicPageView: DynamicPageView;
};
