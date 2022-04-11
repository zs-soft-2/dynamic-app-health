import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerServiceImpl implements ErrorHandler {
	handleError(error: any): void {
		console.error(error);
	}
}
