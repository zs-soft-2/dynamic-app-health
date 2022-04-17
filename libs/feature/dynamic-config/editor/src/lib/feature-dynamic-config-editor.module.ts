import { DynamicModule } from 'ng-dynamic-component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DynamicConfigEditorComponent } from './component';
import { DynamicConfigEditorRoutingModule } from './routing';

@NgModule({
	declarations: [DynamicConfigEditorComponent],
	exports: [DynamicConfigEditorComponent],
	imports: [
		CommonModule,
		DynamicModule,
		DynamicConfigEditorRoutingModule,
		FormsModule,
	],
})
export class FeatureDynamicConfigEditorModule {}
