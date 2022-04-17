import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { DynamicConfigDataService } from '@dynamic-app-health/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as dynamicConfigActions from './dynamic-config.actions';

@Injectable()
export class DynamicConfigEffects {
	public addDynamicConfig = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicConfigActions.addDynamicConfig),
			switchMap((action) =>
				this.dynamicConfigDataService.add$(action.dynamicConfig).pipe(
					map((dynamicConfig) => {
						return dynamicConfigActions.addDynamicConfigSuccess({
							dynamicConfig,
						});
					})
				)
			)
		)
	);
	public listDynamicConfigs = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicConfigActions.listDynamicConfigs),
			switchMap(() =>
				this.dynamicConfigDataService.list$().pipe(
					map((dynamicConfigs) =>
						dynamicConfigActions.listDynamicConfigsSuccess({
							dynamicConfigs,
						})
					)
				)
			)
		)
	);
	public loadDynamicConfig = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicConfigActions.loadDynamicConfig),
			switchMap((action) =>
				this.dynamicConfigDataService.load$(action.id).pipe(
					map((dynamicConfig) => {
						return dynamicConfigActions.loadDynamicConfigSuccess({
							dynamicConfig,
						});
					})
				)
			)
		)
	);
	public updateDynamicConfig = createEffect(() =>
		this.actions$.pipe(
			ofType(dynamicConfigActions.updateDynamicConfig),
			switchMap((action) =>
				this.dynamicConfigDataService
					.update$(action.dynamicConfig)
					.pipe(
						map((dynamicConfig) => {
							return dynamicConfigActions.updateDynamicConfigSuccess(
								{
									dynamicConfig: {
										id: dynamicConfig.id || '',
										changes: dynamicConfig,
									},
								}
							);
						})
					)
			)
		)
	);

	public constructor(
		private actions$: Actions,
		private dynamicConfigDataService: DynamicConfigDataService
	) {}
}
