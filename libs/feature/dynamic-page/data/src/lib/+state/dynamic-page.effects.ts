import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	DynamicComponentMappingService,
	DynamicPageDataService,
} from '@dynamic-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DynamicPageViewComponent } from '../../view/component';
import * as dynamicPageActions from './dynamic-page.actions';

@Injectable()
export class DynamicPageEffects {
	public addDynamicPage = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicPageActions.addDynamicPage),
			switchMap((action) =>
				this.dynamicPageDataService.add$(action.dynamicPage).pipe(
					map((dynamicPage) => {
						this.router.config.push({
							data: {
								param: dynamicPage.path,
							},
							path: dynamicPage.path,
							component: DynamicPageViewComponent,
						});

						return dynamicPageActions.addDynamicPageSuccess({
							dynamicPage: dynamicPage,
						});
					})
				)
			)
		)
	);
	public listDynamicPages = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicPageActions.listDynamicPages),
			switchMap(() =>
				this.dynamicPageDataService.list$().pipe(
					switchMap((dynamicPages) => {
						return of(
							dynamicPageActions.listDynamicPagesSuccess({
								dynamicPages,
							})
						);
					})
				)
			)
		)
	);
	public loadDynamicPage = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicPageActions.loadDynamicPage),
			switchMap((action) =>
				this.dynamicPageDataService.load$(action.id).pipe(
					map((dynamicPage) => {
						return dynamicPageActions.loadDynamicPageSuccess({
							dynamicPage,
						});
					})
				)
			)
		)
	);
	public updateDynamicPage = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicPageActions.updateDynamicPage),
			switchMap((action) =>
				this.dynamicPageDataService.update$(action.dynamicPage).pipe(
					map((dynamicPage) => {
						const index: number = this.router.config.findIndex(
							(route) =>
								route.data &&
								route.data['pageId'] === dynamicPage.id
						);

						if (index > -1) {
							this.router.config[index] = {
								data: {
									param: dynamicPage.path,
									pageId: dynamicPage.id,
								},
								path: dynamicPage.path,
								component: DynamicPageViewComponent,
							};
						}

						return dynamicPageActions.updateDynamicPageSuccess({
							dynamicPage: {
								id: dynamicPage.id || '',
								changes: dynamicPage,
							},
						});
					})
				)
			)
		)
	);

	public constructor(
		private actions$: Actions,
		private dynamicPageDataService: DynamicPageDataService,
		private dynamicComponentMappingService: DynamicComponentMappingService,
		private router: Router
	) {}
}
