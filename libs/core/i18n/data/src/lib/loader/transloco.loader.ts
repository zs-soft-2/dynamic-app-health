import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment, EnvironmentService } from '@dynamic-app-health/api';
import {
	Translation,
	TRANSLOCO_LOADER,
	TranslocoLoader,
} from '@ngneat/transloco';

@Injectable()
export class HttpLoader implements TranslocoLoader {
	public constructor(
		private environmentService: EnvironmentService,
		private http: HttpClient
	) {}

	public getTranslation(langPath: string) {
		const environment: Environment =
			this.environmentService.getEnvironment();

		return this.http.get<Translation>(
			`${environment.i18nPath}/${langPath}.json`
		);
	}
}

export const translocoLoader = {
	provide: TRANSLOCO_LOADER,
	useClass: HttpLoader,
};
