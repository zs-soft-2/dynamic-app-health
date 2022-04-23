import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dynamic-page',
		pathMatch: 'full',
	},
	{
		path: 'dynamic-page',
		loadChildren: () =>
			import('@dynamic-app-health/feature/dynamic-page/view').then(
				(lib) => lib.FeatureDynamicPageViewModule
			),
	},
	{
		path: 'dynamic-page-editor',
		loadChildren: () =>
			import('@dynamic-app-health/feature/dynamic-page/editor').then(
				(lib) => lib.FeatureDynamicPageEditorModule
			),
	},
	{
		path: 'error',
		loadChildren: () =>
			import('../../module/page/error').then((lib) => lib.ErrorModule),
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
