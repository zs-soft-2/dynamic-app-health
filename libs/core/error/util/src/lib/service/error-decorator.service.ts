import { Injectable } from '@angular/core';
import { ErrorUtilService } from '@dynamic-app-health/api';

@Injectable()
export class ErrorDecoratorService {
	private static errorUtilService: ErrorUtilService;

	public constructor(errorUtilService: ErrorUtilService) {
		ErrorDecoratorService.errorUtilService = errorUtilService;
	}

	public static getUtilService(): ErrorUtilService {
		if (!ErrorDecoratorService.errorUtilService) {
			throw new Error('DecoratorService not initialized');
		}

		return ErrorDecoratorService.errorUtilService;
	}
}
