import { Routes } from '@angular/router';
import {
	DynamicPageDataService,
	DynamicPageEntity,
} from '@dynamic-app-health/api';

import { DynamicPageViewComponent } from '../component';

export function RoutesByPagesFactory(
	dynamicPageDataService: DynamicPageDataService
): Routes {
	const routes: Routes = [];
	const dynamicPages: DynamicPageEntity[] =
		dynamicPageDataService.getDynamicPages();
	const firstPage: DynamicPageEntity | undefined = dynamicPages.find(
		(dynamicPage) => !!dynamicPage
	);

	if (firstPage) {
		routes.push({
			path: '',
			redirectTo: firstPage.path,
			pathMatch: 'full',
		});

		dynamicPages.forEach((dynamicPage) => {
			routes.push({
				data: {
					param: dynamicPage.path,
					pageId: dynamicPage.id,
				},
				path: dynamicPage.path,
				component: DynamicPageViewComponent,
			});
		});
	}

	return routes;
}
