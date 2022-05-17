import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	DynamicConfigEntity,
	DynamicConfigEntityAdd,
	DynamicConfigStateService,
} from '@dynamic-app-health/api';
import { Store } from '@ngrx/store';

import * as dynamicConfigActions from '../+state/dynamic-config.actions';
import * as dynamicConfigSelectors from '../+state/dynamic-config.selectors';

@Injectable()
export class DynamicConfigStateServiceImpl extends DynamicConfigStateService {
	public constructor(
		private store: Store
	) {
		super();
	}

	public dispatchAddEntityAction(entity: DynamicConfigEntityAdd): void {
		this.store.dispatch(
			dynamicConfigActions.addDynamicConfig({ dynamicConfig: entity })
		);
	}

	public dispatchDeleteEntityAction(entity: DynamicConfigEntity): void {
		this.store.dispatch(
			dynamicConfigActions.deleteDynamicConfig({ dynamicConfig: entity })
		);
	}

	public dispatchListEntitiesAction(): void {
		this.store.dispatch(dynamicConfigActions.listDynamicConfigs());
	}

	public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
		throw new Error('Method not implemented.');
	}

	public dispatchLoadEntityAction(id: string): void {
		this.store.dispatch(dynamicConfigActions.loadDynamicConfig({ id }));
	}

	public dispatchSetSelectDynamicConfigAction(id: string): void {
		this.store.dispatch(
			dynamicConfigActions.setSelectDynamicConfig({
				dynamicConfigId: id,
			})
		);
	}

	public dispatchSetSelectedEntityIdAction(entityId: string): void {
		this.store.dispatch(
			dynamicConfigActions.setSelectedDynamicConfigId({
				dynamicConfigId: entityId,
			})
		);
	}

	public dispatchUpdateEntityAction(entity: DynamicConfigEntity): void {
		this.store.dispatch(
			dynamicConfigActions.updateDynamicConfig({
				dynamicConfig: entity,
			})
		);
	}

	public isLoading$(): Observable<boolean> {
		throw new Error('Method not implemented.');
	}

	public selectEntities$(): Observable<DynamicConfigEntity[]> {
		return this.store.
			select(dynamicConfigSelectors.selectAllDynamicConfig);
	}

	public selectEntity$(): Observable<DynamicConfigEntity | undefined> {
		return this.store.
			select(dynamicConfigSelectors.selectSelectedDynamicConfig);
	}

	public selectEntityById$(
		id: string
	): Observable<DynamicConfigEntity | undefined> {
		return this.store.
			select(dynamicConfigSelectors.selectDynamicConfigById(id));
	}

	public selectSelectedEntity$(): Observable<
		DynamicConfigEntity | undefined
	> {
		return this.store.
			select(dynamicConfigSelectors.selectSelectedDynamicConfig);
	}

	public selectSelectedEntityID$(): Observable<string> {
		return this.store.select(dynamicConfigSelectors.getSelectedId);
	}

	public selectSelectedEntityId$(): Observable<string> {
		throw new Error('Method not implemented.');
	}
}
