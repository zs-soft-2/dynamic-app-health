import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';

@Component({
	template: '',
})
export abstract class BaseComponent implements OnDestroy {
	protected readonly COMPONENT_ID = nanoid(6);

	protected destroy: Subject<boolean>;

	public constructor() {
		this.destroy = new Subject();
	}

	public ngOnDestroy(): void {
		this.destroy.next(true);
		this.destroy.complete();
	}
}
