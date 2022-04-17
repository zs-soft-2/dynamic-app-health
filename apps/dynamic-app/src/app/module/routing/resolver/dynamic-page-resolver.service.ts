import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DynamicPageStateService } from '@dynamic-app-health/api';

@Injectable()
export class DynamicPageResolverService implements Resolve<void> {
	public constructor(
		private dynamicPageStateService: DynamicPageStateService
	) {}

	public resolve(): void {
		this.dynamicPageStateService.dispatchListEntitiesAction();
	}
}
