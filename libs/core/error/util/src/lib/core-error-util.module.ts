import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ErrorUtilService } from '@dynamic-app-health/api';

import { ErrorUtilServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
})
export class CoreErrorUtilModule {
	public static forRoot(): ModuleWithProviders<CoreErrorUtilModule> {
		return {
			ngModule: CoreErrorUtilModule,
			providers: [
				{
					provide: ErrorUtilService,
					useClass: ErrorUtilServiceImpl,
				},
			],
		};
	}
}
