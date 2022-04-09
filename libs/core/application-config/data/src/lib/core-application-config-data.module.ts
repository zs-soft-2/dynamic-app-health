import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	ApplicationConfigDataService,
	ApplicationConfigStateService,
	APPLICATION_CONFIG_FEATURE_KEY,
} from '@dynamic-app-health/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ApplicationConfigEffects } from './+state/application-config.effects';
import * as fromApplicationConfig from './+state/application-config.reducer';
import {
	ApplicationConfigDataServiceImpl,
	ApplicationConfigStateServiceImpl,
} from './service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			APPLICATION_CONFIG_FEATURE_KEY,
			fromApplicationConfig.reducer
		),
		EffectsModule.forFeature([ApplicationConfigEffects]),
	],
	providers: [
		{
			provide: ApplicationConfigDataService,
			useClass: ApplicationConfigDataServiceImpl,
		},
		{
			provide: ApplicationConfigStateService,
			useClass: ApplicationConfigStateServiceImpl,
		},
	],
})
export class CoreApplicationConfigDataModule {}
