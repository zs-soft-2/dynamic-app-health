import { DynamicModule } from 'ng-dynamic-component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureDynamicLayoutViewModule } from '@dynamic-app-health/feature/dynamic-layout/view';

import { DynamicPageEditorComponent } from './component';
import { DynamicPageEditorRoutingModule } from './routing';

@NgModule({
	declarations: [DynamicPageEditorComponent],
	imports: [
		AccordionModule,
		CommonModule,
		ButtonModule,
		DragDropModule,
		DynamicModule,
		DynamicPageEditorRoutingModule,
		FlexLayoutModule,
		FormsModule,
		InputNumberModule,
		InputTextModule,
		PanelModule,
		RadioButtonModule,
		ReactiveFormsModule,
		FeatureDynamicLayoutViewModule,
	],
})
export class FeatureDynamicPageEditorModule {}
