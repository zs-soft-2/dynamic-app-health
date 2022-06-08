import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	CommonUtilService,
	DynamicConfigDataService,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
} from '@dynamic-app-health/api';

const dynamicConfigs: DynamicConfigEntity[] = [];

@Injectable()
export class DynamicConfigDataServiceImpl extends DynamicConfigDataService {
	public constructor(private commonUtilService: CommonUtilService) {
		super();
	}

	public add$(
		dynamicConfig: DynamicConfigEntity
	): Observable<DynamicConfigEntity> {
		const dynamicConfigEntity: DynamicConfigEntity = {
			...dynamicConfig,
			id: dynamicConfig.id || this.commonUtilService.createEntityId(),
		};

		return of(dynamicConfigEntity);
	}

	public delete$(
		entity: DynamicConfigEntity
	): Observable<DynamicConfigEntity> {
		throw new Error('Method not implemented.');
	}

	public list$(): Observable<DynamicConfigEntity[]> {
		return of(dynamicConfigs);
	}

	public load$(dynamicConfigId: string): Observable<DynamicConfigEntity> {
		const dynamicConfig: DynamicConfigEntity | undefined =
			dynamicConfigs.find(
				(dynamicConfig) => dynamicConfig.id === dynamicConfigId
			);

		if (!dynamicConfig) {
			throw new Error();
		}

		return of(dynamicConfig);
	}

	public update$(
		dynamicConfig: DynamicConfigEntityUpdate
	): Observable<DynamicConfigEntityUpdate> {
		return of(dynamicConfig);
	}
}
