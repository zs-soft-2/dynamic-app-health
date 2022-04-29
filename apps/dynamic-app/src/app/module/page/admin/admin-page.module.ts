import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeatureDynamicLayoutViewModule } from '@dynamic-app-health/feature/dynamic-layout/view';

import { AdminMenuComponent, AdminPageComponent } from './component';
import { AdminPageRoutingModule } from './routing';

@NgModule({
	declarations: [AdminMenuComponent, AdminPageComponent],
	imports: [
		CommonModule,
		AdminPageRoutingModule,
		FeatureDynamicLayoutViewModule,
	],
})
export class AdminPageModule {}
