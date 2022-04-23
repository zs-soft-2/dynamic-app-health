import { Routes } from '@angular/router';
import {
	DynamicPageEntity,
	DynamicPageRouteService,
} from '@dynamic-app-health/api';
import { DynamicPageViewComponent } from '../component';

export function RoutesByPagesFactory(): Routes {
	const entities: DynamicPageEntity[] = DynamicPageRouteService.dynamicPages;

	const routes: Routes = [];
	const firstPage: DynamicPageEntity | undefined = entities.find(
		(entity) => !!entity
	);

	if (firstPage) {
		const children: Routes = [];

		children.push({
			path: '',
			redirectTo: firstPage.path,
			pathMatch: 'full',
		});

		entities.forEach((entity) => {
			children.push({
				data: {
					param: entity.path,
					pageId: entity.id,
				},
				path: entity.path,
				component: DynamicPageViewComponent,
			});
		});

		const route = {
			path: '',
			children,
		};

		routes.push(route);
	}

	return routes;
}
