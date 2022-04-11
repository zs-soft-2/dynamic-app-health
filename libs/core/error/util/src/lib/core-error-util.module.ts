import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorUtilService } from '@dynamic-app-health/api';

import { ErrorUtilServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: ErrorUtilService,
			useClass: ErrorUtilServiceImpl,
		},
	],
})
export class CoreErrorUtilModule {}
