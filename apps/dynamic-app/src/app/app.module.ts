import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
	APPLICATION_ID_TOKEN,
	ApplicationConfigStateService,
	DEFAULT_APPLICATION_CONFIG_TOKEN,
	DynamicComponentMappingService,
	DynamicPageStateService,
	EnvironmentService,
} from '@dynamic-app-health/api';
import { ErrorDecoratorService } from '@dynamic-app-health/core/error/util';
import { DomainFhirPatientDataModule } from '@dynamic-app-health/domain/fhir/patient/data';
import { DomainFhirPatientUtilModule } from '@dynamic-app-health/domain/fhir/patient/util';
import { FeatureDynamicConfigDataModule } from '@dynamic-app-health/feature/dynamic-config/data';
import { FeatureDynamicConfigEditorModule } from '@dynamic-app-health/feature/dynamic-config/editor';
import { FeatureDynamicPageDataModule } from '@dynamic-app-health/feature/dynamic-page/data';
import { FeatureDynamicPageViewModule } from '@dynamic-app-health/feature/dynamic-page/view';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { applicationConfig } from '../config/application.config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { initializeApp } from './initializer';
import { AppRoutingModule, CoreModule, TopBarModule } from './module';
import {
	DynamicComponentMappingServiceImpl,
	EnvironmentServiceImpl,
} from './service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
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
		CoreModule,
		AppRoutingModule,
		TopBarModule,
		FeatureDynamicConfigDataModule,
		FeatureDynamicConfigEditorModule,
		FeatureDynamicPageDataModule,
		FeatureDynamicPageViewModule,
		DomainFhirPatientDataModule,
		DomainFhirPatientUtilModule,
	],
	providers: [
		ErrorDecoratorService,
		{
			provide: EnvironmentService,
			useClass: EnvironmentServiceImpl,
		},
		{
			provide: DynamicComponentMappingService,
			useClass: DynamicComponentMappingServiceImpl,
		},
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
				DynamicPageStateService,
				Router,
			],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private decoratorService: ErrorDecoratorService) {}
}
