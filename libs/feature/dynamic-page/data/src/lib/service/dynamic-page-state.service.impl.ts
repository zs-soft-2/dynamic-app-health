import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageStateService,
} from '@dynamic-app-health/api';
import { select, Store } from '@ngrx/store';

import * as dynamicPageActions from '../+state/dynamic-page.actions';
import * as fromDynamicPage from '../+state/dynamic-page.reducer';
import * as dynamicPageSelectors from '../+state/dynamic-page.selectors';

@Injectable()
export class DynamicPageStateServiceImpl extends DynamicPageStateService {
	public constructor(
		private store: Store<fromDynamicPage.DynamicPagePartialState>
	) {
		super();
	}

	public dispatchAddEntityAction(entity: DynamicPageEntityAdd): void {
		this.store.dispatch(
			dynamicPageActions.addDynamicPage({ dynamicPage: entity })
		);
	}

	public dispatchDeleteEntityAction(entity: DynamicPageEntity): void {
		this.store.dispatch(
			dynamicPageActions.deleteDynamicPage({ dynamicPage: entity })
		);
	}

	public dispatchInitAction(entity: any): void {
		throw new Error('Method not implemented.');
	}

	public dispatchListEntitiesAction(): void {
		this.store.dispatch(dynamicPageActions.listDynamicPages());
	}

	public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
		throw new Error('Method not implemented.');
	}

	public dispatchLoadEntityAction(id: string): void {
		this.store.dispatch(dynamicPageActions.loadDynamicPage({ id }));
	}

	public dispatchSetSelectDynamicPageAction(id: string): void {
		this.store.dispatch(
			dynamicPageActions.setSelectDynamicPage({ dynamicPageId: id })
		);
	}

	public dispatchSetSelectedEntityIdAction(entityId: string): void {
		this.store.dispatch(
			dynamicPageActions.setSelectedDynamicPageId({
				dynamicPageId: entityId,
			})
		);
	}

	public dispatchUpdateEntityAction(entity: DynamicPageEntity): void {
		this.store.dispatch(
			dynamicPageActions.updateDynamicPage({ dynamicPage: entity })
		);
	}

	public isLoading$(): Observable<boolean> {
		throw new Error('Method not implemented.');
	}

	public selectEntities$(): Observable<DynamicPageEntity[]> {
		return this.store.pipe(
			select(dynamicPageSelectors.selectAllDynamicPage)
		);
	}

	public selectEntity$(): Observable<DynamicPageEntity | undefined> {
		return this.store.pipe(
			select(dynamicPageSelectors.selectSelectedDynamicPage)
		);
	}

	public selectEntityById$(id: string): Observable<DynamicPageEntity> {
		return this.store.pipe(
			select(dynamicPageSelectors.selectDynamicPageById(id))
		);
	}

	public selectSelectedEntity$(): Observable<DynamicPageEntity | undefined> {
		return this.store.pipe(
			select(dynamicPageSelectors.selectSelectedDynamicPage)
		);
	}

	public selectSelectedEntityID$(): Observable<string> {
		return this.store.pipe(select(dynamicPageSelectors.getSelectedId));
	}

	public selectSelectedEntityId$(): Observable<string> {
		throw new Error('Method not implemented.');
	}
}
