import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	Translation,
	TRANSLOCO_LOADER,
	TranslocoLoader,
} from '@ngneat/transloco';

@Injectable()
export class HttpLoader implements TranslocoLoader {
	public constructor(private http: HttpClient) {}

	public getTranslation(langPath: string) {
		return this.http.get<Translation>(`${langPath}.json`);
	}
}

export const translocoLoader = {
	provide: TRANSLOCO_LOADER,
	useClass: HttpLoader,
};
