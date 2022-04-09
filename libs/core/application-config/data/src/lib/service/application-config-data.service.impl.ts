import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ApplicationConfigDataService,
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate,
} from '@dynamic-app-health/api';

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

	public load$(id: string): Observable<ApplicationConfigEntity | undefined> {
		throw new Error('Method not implemented.');
	}

	public update$(
		entity: ApplicationConfigEntityUpdate
	): Observable<ApplicationConfigEntityUpdate> {
		return of(entity);
	}
}
