import { DynamicModule } from 'ng-dynamic-component';
import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES } from '@angular/router';
import { FeatureDynamicLayoutViewModule } from '@dynamic-app-health/feature/dynamic-layout/view';

import { DynamicPageViewComponent } from './component';
import { RoutesByPagesFactory } from './factory';

@NgModule({
	imports: [
		CommonModule,
		DynamicModule,
		RouterModule,
		CardModule,
		FeatureDynamicLayoutViewModule,
	],
	declarations: [DynamicPageViewComponent],
	exports: [DynamicPageViewComponent, RouterModule],
	providers: [
		{
			provide: ROUTES,
			useFactory: RoutesByPagesFactory,
			multi: true,
		},
	],
})
export class FeatureDynamicPageViewModule {}
