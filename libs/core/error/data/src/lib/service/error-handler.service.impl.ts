import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Error, ErrorTypeEnum } from '@dynamic-app-health/api';

@Injectable()
export class ErrorHandlerServiceImpl implements ErrorHandler {
	public constructor(private router: Router, private zone: NgZone) {}

	handleError(error: any): void {
		if (error['type'] && error['type'] === ErrorTypeEnum.SimpleError) {
			console.error(error);

			this.zone.run(() => {
				this.router.navigateByUrl((error as Error).redirect || '');
			});
		}
	}
}
