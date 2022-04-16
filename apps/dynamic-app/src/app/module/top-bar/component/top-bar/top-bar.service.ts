import {
	combineLatest,
	map,
	Observable,
	ReplaySubject,
	Subject,
	switchMap,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import {
	AuthenticationStateService,
	DynamicPageEntity,
	DynamicPageStateService,
} from '@dynamic-app-health/api';

import { MenuItem, TopBarParams } from '../../api';

@Injectable()
export class TopBarService {
	private currentPath!: string;
	private params!: TopBarParams;
	private params$$: Subject<TopBarParams>;

	constructor(
		private authenticationStateService: AuthenticationStateService,
		private dynamicPageStateService: DynamicPageStateService,
		private router: Router
	) {
		this.params$$ = new ReplaySubject();
	}

	public createDynamicPageMenuItems(
		dynamicPages: DynamicPageEntity[]
	): MenuItem[] {
		return dynamicPages.map((dynamicPage) => ({
			routerLink: ['/' + dynamicPage.path],
			label: dynamicPage.label,
		}));
	}

	public handleAddClick(): void {
		this.router.navigateByUrl('/dynamic-page-editor/0');
	}

	public handleEditClick(): void {
		const routerStateSnapshot: RouterStateSnapshot =
			this.router.routerState.snapshot;

		this.router.navigateByUrl(
			'/dynamic-page-editor' + routerStateSnapshot.url
		);
	}

	public init$(): Observable<TopBarParams> {
		return combineLatest([
			this.dynamicPageStateService
				.selectEntities$()
				.pipe(map((entities) => entities as DynamicPageEntity[])),
		]).pipe(
			switchMap(([dynamicPages]) => {
				this.params = {
					addPagePermissions: [],
					editPagePermissions: [],
					menuItems: this.createDynamicPageMenuItems(dynamicPages),
				};

				this.params$$.next(this.params);

				return this.params$$;
			})
		);
	}
}
