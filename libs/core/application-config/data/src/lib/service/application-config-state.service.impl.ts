import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ApplicationConfigEntity,
	ApplicationConfigEntityAdd,
	ApplicationConfigEntityUpdate,
	ApplicationConfigStateService,
} from '@dynamic-app-health/api';
import { Store } from '@ngrx/store';

import * as applicationConfigActions from '../+state/application-config.actions';
import * as fromApplicationConfig from '../+state/application-config.reducer';

@Injectable()
export class ApplicationConfigStateServiceImpl extends ApplicationConfigStateService {
	public constructor(
		private store: Store<fromApplicationConfig.ApplicationConfigPartialState>
	) {
		super();
	}

	public dispatchAddEntityAction(entity: ApplicationConfigEntityAdd): void {
		throw new Error('Method not implemented.');
	}

	public dispatchDeleteEntityAction(entity: ApplicationConfigEntity): void {
		throw new Error('Method not implemented.');
	}

	public dispatchInitAction(entity: ApplicationConfigEntity): void {
		this.store.dispatch(
			applicationConfigActions.init({ applicationConfig: entity })
		);
	}

	public dispatchListEntitiesAction(): void {
		throw new Error('Method not implemented.');
	}

	public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
		throw new Error('Method not implemented.');
	}

	public dispatchLoadEntityAction(id: string): void {
		throw new Error('Method not implemented.');
	}

	public dispatchSetSelectedEntityIdAction(entityId: string): void {
		this.store.dispatch(
			applicationConfigActions.setSelectedApplicationConfigId({
				applicationConfigId: entityId,
			})
		);
	}

	public dispatchUpdateEntityAction(
		entity: ApplicationConfigEntityUpdate
	): void {
		throw new Error('Method not implemented.');
	}

	public isLoading$(): Observable<boolean> {
		throw new Error('Method not implemented.');
	}

	public selectEntities$(): Observable<ApplicationConfigEntity[]> {
		throw new Error('Method not implemented.');
	}

	public selectEntityById$(
		entityId: string
	): Observable<ApplicationConfigEntity | undefined> {
		throw new Error('Method not implemented.');
	}

	public selectSelectedEntity$(): Observable<
		ApplicationConfigEntity | undefined
	> {
		throw new Error('Method not implemented.');
	}

	public selectSelectedEntityId$(): Observable<string> {
		throw new Error('Method not implemented.');
	}
}
