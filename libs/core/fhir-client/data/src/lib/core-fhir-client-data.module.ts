import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FhirClientService } from '@dynamic-app-health/api';

import { FhirClientServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: FhirClientService,
			useClass: FhirClientServiceImpl,
		},
	],
})
export class CoreFhirClientDataModule {}
