import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TopBarComponent } from './component';

@NgModule({
	exports: [TopBarComponent],
	declarations: [TopBarComponent],
	imports: [
		CommonModule,
		ButtonModule,
		FormsModule,
		MenubarModule,
		ToolbarModule,
	],
})
export class TopBarModule {}
