import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicConfigEditorComponent } from '../component';

const routes: Routes = [
	{
		path: ':configId',
		component: DynamicConfigEditorComponent,
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DynamicConfigEditorRoutingModule {}
