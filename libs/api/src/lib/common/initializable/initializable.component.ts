import { Subject } from 'rxjs';

import { BaseComponent, ComponentBaseParam } from '../base';
import { Initializable } from './initializable';

export abstract class InitializableComponent
	extends BaseComponent
	implements Initializable
{
	public params!: ComponentBaseParam;
	public params$$!: Subject<ComponentBaseParam>;
}
