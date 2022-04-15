import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	I18nConfig,
	I18nService,
	LanguagesEnum,
} from '@dynamic-app-health/api';
import {
	TRANSLOCO_CONFIG,
	TRANSLOCO_SCOPE,
	TranslocoModule,
} from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';

import { translocoLoader } from './loader';
import { I18nServiceImpl } from './service';

export const childLoader = [LanguagesEnum.en, LanguagesEnum.hu].reduce(
	(acc: any, lang) => {
		acc[lang] = () => import(`./locale/${lang}.json`);

		return acc;
	},
	{}
);

@NgModule({
	exports: [TranslocoModule, TranslocoLocaleModule],
	imports: [
		CommonModule,
		TranslocoLocaleModule.forRoot({
			langToLocaleMapping: {
				en: 'en-GB',
				hu: 'hu-HU',
			},
		}),
	],
	providers: [
		{
			provide: I18nService,
			useClass: I18nServiceImpl,
		},
	],
})
export class CoreI18nDataModule {
	public static forChild(
		scope: string
	): ModuleWithProviders<CoreI18nDataModule> {
		return {
			ngModule: CoreI18nDataModule,
			providers: [
				{
					provide: TRANSLOCO_SCOPE,
					useValue: {
						scope,
						childLoader,
					},
				},
			],
		};
	}

	public static forRoot(
		config: I18nConfig
	): ModuleWithProviders<CoreI18nDataModule> {
		return {
			ngModule: CoreI18nDataModule,
			providers: [
				{
					provide: TRANSLOCO_CONFIG,
					useValue: {
						...config,
					},
				},
				translocoLoader,
			],
		};
	}
}
