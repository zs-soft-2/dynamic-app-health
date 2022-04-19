import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicLayoutViewComponent } from './component';

@NgModule({
	imports: [
		CommonModule,
		ButtonModule,
		DynamicModule,
		GridsterModule,
		PanelModule,
	],
	declarations: [DynamicLayoutViewComponent],
	exports: [DynamicLayoutViewComponent],
})
export class FeatureDynamicLayoutViewModule {}
