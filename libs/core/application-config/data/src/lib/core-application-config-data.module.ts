import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApplicationConfig from './+state/application-config.reducer';
import { ApplicationConfigEffects } from './+state/application-config.effects';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			fromApplicationConfig.APPLICATION_CONFIG_FEATURE_KEY,
			fromApplicationConfig.reducer
		),
		EffectsModule.forFeature([ApplicationConfigEffects]),
	],
})
export class CoreApplicationConfigDataModule {}
