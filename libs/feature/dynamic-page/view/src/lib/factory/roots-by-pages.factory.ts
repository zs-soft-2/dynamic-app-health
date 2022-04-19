import { Routes } from '@angular/router';
import { DynamicPageRouteService } from '@dynamic-app-health/api';

export function RoutesByPagesFactory(): Routes {
	return DynamicPageRouteService.dynamicRoutes;
}
