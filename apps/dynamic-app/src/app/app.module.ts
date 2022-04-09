import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreApplicationConfigDataModule } from '@dynamic-app-health/core/application-config/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
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
		CoreApplicationConfigDataModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
