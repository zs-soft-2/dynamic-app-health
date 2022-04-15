import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	HashMapModel,
	I18nService,
	LanguagesEnum,
} from '@dynamic-app-health/api';
import {
	HashMap,
	Translation,
	TranslocoLoader,
	TranslocoService,
} from '@ngneat/transloco';
import { TranslocoLoaderData } from '@ngneat/transloco/lib/transloco.loader';

@Injectable()
export class I18nServiceImpl extends I18nService implements TranslocoLoader {
	public constructor(
		httpClient: HttpClient,
		private translocoService: TranslocoService
	) {
		super(httpClient);

		this.defaultPath = '/assets/i18n/';
	}

	public activeLanguageChanges$(): Observable<string> {
		return this.translocoService.langChanges$;
	}

	public getActiveLang(): LanguagesEnum {
		switch (this.translocoService.getActiveLang()) {
			case LanguagesEnum.hu:
				return LanguagesEnum.hu;
			case LanguagesEnum.en:
				return LanguagesEnum.en;
			case LanguagesEnum.de:
				return LanguagesEnum.de;
			default:
				return LanguagesEnum.hu;
		}
	}

	public getActiveLangAsString(): string {
		return this.getActiveLang().toString();
	}

	public getAvailableLanguages(): string[] {
		return this.translocoService.getAvailableLangs() as string[];
	}

	public getTranslation(
		langPath: string,
		data?: TranslocoLoaderData
	): Observable<HashMap<any>> | Promise<HashMap<any>> {
		return this.httpClient.get<Translation>(
			`${this.defaultPath}${langPath}.json`
		);
	}

	public getValue(
		localizedObject: any,
		locale: string = this.getActiveLangAsString()
	): string {
		return localizedObject[locale];
	}

	public init(language: string): void {
		this.translocoService.setActiveLang(language);
		this.translocoService.load(language);
	}

	public nameComponentShorter(firstName: string, lastName: string): string[] {
		let nameElements: string[];

		switch (this.getActiveLangAsString()) {
			case 'hu': {
				nameElements = [lastName, firstName];

				break;
			}

			case 'en': {
				nameElements = [firstName, lastName];

				break;
			}
			default:
				throw new Error();
		}

		return nameElements;
	}

	public translate<T>(
		key: string | string[],
		params?: HashMapModel<any>,
		lang?: string
	): string {
		return this.translocoService.translate(key, params, lang);
	}
}
