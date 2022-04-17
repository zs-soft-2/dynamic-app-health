import { DynamicModule } from 'ng-dynamic-component';
import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, ROUTES } from '@angular/router';
import { DynamicPageDataService } from '@dynamic-app-health/api';

import { DynamicPageViewComponent } from './component';
import { RoutesByPagesFactory } from './factory';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		DynamicModule,
		RouterModule,
		CardModule,
	],
	declarations: [DynamicPageViewComponent],
	exports: [DynamicPageViewComponent, RouterModule],
	providers: [
		{
			provide: ROUTES,
			useFactory: RoutesByPagesFactory,
			deps: [DynamicPageDataService],
			multi: true,
		},
	],
})
export class FeatureDynamicPageViewModule {}
