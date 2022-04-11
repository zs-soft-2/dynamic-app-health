import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';

import { ErrorHandlerServiceImpl } from './service';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: ErrorHandler,
			useClass: ErrorHandlerServiceImpl,
		},
	],
})
export class CoreErrorDataModule {}
