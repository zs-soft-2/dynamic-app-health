import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Error, ErrorTypeEnum } from '@dynamic-app-health/api';

@Injectable()
export class ErrorHandlerServiceImpl implements ErrorHandler {
	public constructor(private router: Router) {}

	handleError(error: any): void {
		if (error['type'] && error['type'] === ErrorTypeEnum.SimpleError) {
			console.error(error);

			this.router.navigateByUrl((error as Error).redirect || '');
		}
	}
}
