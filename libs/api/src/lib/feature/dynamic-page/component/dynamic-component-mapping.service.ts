import { Observable } from 'rxjs';

import { Type } from '@angular/core';

import { DynamicComponent } from './dynamic-component.type';

export abstract class DynamicComponentMappingService {
	public abstract addComponentByKey(key: string, component: Type<any>): void;
	public abstract getComponentByKey(
		key: string
	): DynamicComponent | undefined;
	public abstract getComponentMapping$(): Observable<
		Map<string, DynamicComponent>
	>;
}
