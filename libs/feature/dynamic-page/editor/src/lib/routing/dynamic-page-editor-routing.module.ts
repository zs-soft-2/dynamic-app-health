import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicPageEditorComponent } from '../component';

const routes: Routes = [
	{
		path: ':path',
		component: DynamicPageEditorComponent,
		pathMatch: 'full',
	},
	{
		path: ':path/config',
		loadChildren: () =>
			import('@dynamic-app-health/feature/dynamic-config/editor').then(
				(lib) => lib.FeatureDynamicConfigEditorModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DynamicPageEditorRoutingModule {}
