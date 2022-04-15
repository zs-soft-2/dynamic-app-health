import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ApplicationConfigDataService,
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate,
} from '@dynamic-app-health/api';

export const mockApplicationConfig: ApplicationConfigEntity = {
	defaultLanguage: 'en',
	defaultTimezone: 'Europe/London',
	id: '',
	languages: ['en'],
	timezones: ['Europe/London', 'Europe/Budapest'],
};

@Injectable()
export class ApplicationConfigDataServiceImpl extends ApplicationConfigDataService {
	public add$(
		entity: ApplicationConfigEntityAdd
	): Observable<ApplicationConfigEntity> {
		throw new Error('Method not implemented.');
	}

	public delete$(
		entity: ApplicationConfigEntity
	): Observable<ApplicationConfigEntity> {
		throw new Error('Method not implemented.');
	}

	public list$(): Observable<ApplicationConfigEntity[]> {
		throw new Error('Method not implemented.');
	}

	public load$(id: string): Observable<ApplicationConfigEntity> {
		if (!mockApplicationConfig) {
			throw new Error(
				'No exist ApplicationConfig instance for the given id!'
			);
		}

		return of({
			...mockApplicationConfig,
			id,
		});
	}

	public update$(
		entity: ApplicationConfigEntityUpdate
	): Observable<ApplicationConfigEntityUpdate> {
		return of(entity);
	}
}
