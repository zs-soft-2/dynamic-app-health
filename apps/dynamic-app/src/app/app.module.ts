import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
	APPLICATION_ID_TOKEN,
	ApplicationConfigStateService,
	DEFAULT_APPLICATION_CONFIG_TOKEN,
} from '@dynamic-app-health/api';
import { CoreApplicationConfigDataModule } from '@dynamic-app-health/core/application-config/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { applicationConfig } from '../config/application.config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { initializeApp } from './initializer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CoreApplicationConfigDataModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [
		{
			provide: APPLICATION_ID_TOKEN,
			useValue: environment.applicationId,
		},
		{
			provide: DEFAULT_APPLICATION_CONFIG_TOKEN,
			useValue: applicationConfig,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			deps: [
				ApplicationConfigStateService,
				APPLICATION_ID_TOKEN,
				DEFAULT_APPLICATION_CONFIG_TOKEN,
			],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
