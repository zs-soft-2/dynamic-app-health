import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	CommonUtilService,
	DynamicLayout,
	DynamicPageDataService,
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from '@dynamic-app-health/api';

import { dynamicLayoutsForPages } from '../layout';

@Injectable()
export class DynamicPageDataServiceImpl extends DynamicPageDataService {
	private readonly dynamicPages: DynamicPageEntity[] = [
		{
			id: 'lk658F',
			layout: dynamicLayoutsForPages[0],
			path: 'home',
			label: 'Home',
		},
	];

	public constructor(private commonUtilService: CommonUtilService) {
		super();
	}

	public add$(
		dynamicPage: DynamicPageEntityAdd
	): Observable<DynamicPageEntity> {
		const dynamicPageEntity: DynamicPageEntity = {
			...dynamicPage,
			id: this.commonUtilService.createEntityId(),
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
		return this.dynamicPages;
	}

	public list$(): Observable<DynamicPageEntity[]> {
		return of(this.dynamicPages);
	}

	public load$(dynamicPageId: string): Observable<DynamicPageEntity> {
		const dynamicPage: DynamicPageEntity | undefined = this.dynamicPages.find(
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
