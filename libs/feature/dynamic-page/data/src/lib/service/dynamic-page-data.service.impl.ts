import { nanoid } from 'nanoid';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	DynamicLayout,
	DynamicPageDataService,
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from '@dynamic-app-health/api';

import { dynamicLayoutsForPages } from '../layout';

export const dynamicPages: DynamicPageEntity[] = [
	{
		id: nanoid(10),
		layout: dynamicLayoutsForPages[0],
		path: 'home',
		label: 'Home',
	},
];

@Injectable()
export class DynamicPageDataServiceImpl extends DynamicPageDataService {
	public add$(
		dynamicPage: DynamicPageEntityAdd
	): Observable<DynamicPageEntity> {
		const dynamicPageEntity: DynamicPageEntity = {
			...dynamicPage,
			id: nanoid(10),
		};

		return of(dynamicPageEntity);
	}

	public delete$(entity: any): Observable<any> {
		throw new Error('Method not implemented.');
	}

	public getDynamicLayouts$(): Observable<DynamicLayout[]> {
		return of(dynamicLayoutsForPages);
	}

	public getDynamicPages(): DynamicPageEntity[] {
		return dynamicPages;
	}

	public list$(): Observable<DynamicPageEntity[]> {
		return of(dynamicPages);
	}

	public load$(dynamicPageId: string): Observable<DynamicPageEntity> {
		const dynamicPage: DynamicPageEntity | undefined = dynamicPages.find(
			(dynamicPage) => dynamicPage.id === dynamicPageId
		);

		if (!dynamicPage) {
			throw new Error();
		}

		return of(dynamicPage);
	}

	public update$(
		dynamicPage: DynamicPageEntityUpdate
	): Observable<DynamicPageEntityUpdate> {
		return of(dynamicPage);
	}
}
