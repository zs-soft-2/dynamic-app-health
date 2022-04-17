import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	DYNAMIC_CONFIG_FEATURE_KEY,
	DynamicConfigDataService,
	DynamicConfigStateService,
} from '@dynamic-app-health/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DynamicConfigEffects } from './+state/dynamic-config.effects';
import * as fromDynamicConfig from './+state/dynamic-config.reducer';
import {
	DynamicConfigDataServiceImpl,
	DynamicConfigStateServiceImpl,
} from './service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			DYNAMIC_CONFIG_FEATURE_KEY,
			fromDynamicConfig.reducer
		),
		EffectsModule.forFeature([DynamicConfigEffects]),
	],
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
