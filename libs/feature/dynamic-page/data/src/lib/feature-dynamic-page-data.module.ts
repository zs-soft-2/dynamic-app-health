import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	DynamicPageDataService,
	DynamicPageStateService,
} from '@dynamic-app-health/api';

import { DynamicPageDataServiceImpl } from './service';
import { DynamicPageStateServiceImpl } from './service/dynamic-page-state.service.impl';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: DynamicPageDataService,
			useClass: DynamicPageDataServiceImpl,
		},
		{
			provide: DynamicPageStateService,
			useClass: DynamicPageStateServiceImpl,
		},
	],
})
export class FeatureDynamicPageDataModule {}
