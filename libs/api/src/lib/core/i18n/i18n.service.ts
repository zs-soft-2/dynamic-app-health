import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { BaseService } from '../../common';
import { HashMapModel } from './hash-map.model';
import { LanguagesEnum } from './languages.enum';

export abstract class I18nService extends BaseService {
	protected defaultPath!: string;

	public constructor(protected httpClient: HttpClient) {
		super();
	}

	public abstract activeLanguageChanges$(): Observable<string>;
	public abstract getActiveLang(): LanguagesEnum;
	public abstract getActiveLangAsString(): string;
	public abstract getAvailableLanguages(): string[];
	public abstract getValue(property: any, locale?: string): string;
	public abstract init(language: string): void;
	public abstract nameComponentShorter(
		firstName: string,
		lastName: string
	): string[];
	public abstract translate<T>(
		key: string | string[],
		params?: HashMapModel<unknown>,
		lang?: string
	): string;
}
