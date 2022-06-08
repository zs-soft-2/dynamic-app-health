import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonUtilService } from '@dynamic-app-health/api';

import { CommonUtilServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: CommonUtilService,
			useClass: CommonUtilServiceImpl,
		},
	],
})
export class CommonUtilModule {}
