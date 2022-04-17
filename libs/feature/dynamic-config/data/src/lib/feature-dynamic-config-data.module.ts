import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	DynamicConfigDataService,
	DynamicConfigStateService,
} from '@dynamic-app-health/api';

import {
	DynamicConfigDataServiceImpl,
	DynamicConfigStateServiceImpl,
} from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: DynamicConfigDataService,
			useClass: DynamicConfigDataServiceImpl,
		},
		{
			provide: DynamicConfigStateService,
			useClass: DynamicConfigStateServiceImpl,
		},
	],
})
export class FeatureDynamicConfigDataModule {}
