import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DynamicPageResolverService } from './resolver';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('@dynamic-app-health/feature/dynamic-page/view').then(
				(lib) => lib.FeatureDynamicPageViewModule
			),
		resolve: { data: DynamicPageResolverService },
		pathMatch: 'full',
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
	providers: [DynamicPageResolverService],
})
export class AppRoutingModule {}
