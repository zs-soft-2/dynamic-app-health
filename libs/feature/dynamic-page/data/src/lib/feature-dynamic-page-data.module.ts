import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	DYNAMIC_PAGE_FEATURE_KEY,
	DynamicPageDataService,
	DynamicPageStateService,
} from '@dynamic-app-health/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DynamicPageEffects } from './+state/dynamic-page.effects';
import * as fromDynamicPage from './+state/dynamic-page.reducer';
import { DynamicPageDataServiceImpl } from './service';
import { DynamicPageStateServiceImpl } from './service/dynamic-page-state.service.impl';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(
			DYNAMIC_PAGE_FEATURE_KEY,
			fromDynamicPage.reducer
		),
		EffectsModule.forFeature([DynamicPageEffects]),
	],
	providers: [
		{
			provide: DynamicPageDataService,
			useClass: DynamicPageDataServiceImpl,
		},
		{
			provide: DynamicPageStateService,
			useClass: DynamicPageStateServiceImpl,
		},
	],
})
export class FeatureDynamicPageDataModule {}
