import { DynamicModule } from 'ng-dynamic-component';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicPageEditorComponent } from './component';
import { DynamicPageEditorRoutingModule } from './routing';

@NgModule({
	declarations: [DynamicPageEditorComponent],
	imports: [
		CommonModule,
		ButtonModule,
		DragDropModule,
		DynamicModule,
		DynamicPageEditorRoutingModule,
		FlexLayoutModule,
		FormsModule,
		InputTextModule,
		PanelModule,
		RadioButtonModule,
		ReactiveFormsModule,
	],
})
export class FeatureDynamicPageEditorModule {}
