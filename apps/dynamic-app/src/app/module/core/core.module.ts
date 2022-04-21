import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguagesEnum } from '@dynamic-app-health/api';
import { CoreApplicationConfigDataModule } from '@dynamic-app-health/core/application-config/data';
import { CoreAuthenticationDataModule } from '@dynamic-app-health/core/authentication/data';
import { CoreErrorDataModule } from '@dynamic-app-health/core/error/data';
import { CoreErrorUtilModule } from '@dynamic-app-health/core/error/util';
import { CoreFhirClientDataModule } from '@dynamic-app-health/core/fhir-client/data';
import { CoreI18nDataModule } from '@dynamic-app-health/core/i18n/data';

import { applicationConfig } from '../../../config/application.config';
import { environment } from '../../../environments/environment';

@NgModule({
	imports: [
		CommonModule,
		CoreApplicationConfigDataModule,
		CoreAuthenticationDataModule,
		CoreErrorDataModule,
		CoreErrorUtilModule.forRoot(),
		CoreI18nDataModule.forRoot({
			prodMode: environment.production,
			availableLangs: applicationConfig.languages as LanguagesEnum[],
			defaultLang: applicationConfig.defaultLanguage as LanguagesEnum,
			reRenderOnLangChange: true,
		}),
		CoreFhirClientDataModule,
	],
})
export class CoreModule {}
