import { Subject } from 'rxjs';

import { ComponentBaseParam } from '../base';

export interface Initializable {
	params: ComponentBaseParam;
	params$$: Subject<ComponentBaseParam>;
}
