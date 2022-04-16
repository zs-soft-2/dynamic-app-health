import { FormGroup } from '@angular/forms';

import { ConfigEntity } from '../config';
import { ComponentBaseService } from './component-base.service';

export abstract class ConfigComponentBaseService<
	S,
	T
> extends ComponentBaseService<S, T> {
	protected config!: ConfigEntity<T>;
	protected formGroup!: FormGroup;
}
