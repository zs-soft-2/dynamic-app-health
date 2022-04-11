import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	AUTHENTICATION_FEATURE_KEY,
	AuthenticationStateService,
} from '@dynamic-app-health/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthenticationEffects } from './+state/authentication.effects';
import * as fromAuthentication from './+state/authentication.reducer';
import { AuthenticationStateServiceImpl } from './service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			AUTHENTICATION_FEATURE_KEY,
			fromAuthentication.authenticationReducer
		),
		EffectsModule.forFeature([AuthenticationEffects]),
	],
	providers: [
		{
			provide: AuthenticationStateService,
			useClass: AuthenticationStateServiceImpl,
		},
	],
})
export class CoreAuthenticationDataModule {}
