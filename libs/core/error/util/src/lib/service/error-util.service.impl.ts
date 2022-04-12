import { Injectable } from '@angular/core';
import {
	Error,
	ErrorType,
	ErrorTypeEnum,
	ErrorUtilService,
} from '@dynamic-app-health/api';

@Injectable()
export class ErrorUtilServiceImpl extends ErrorUtilService {
	public createError(
		original: any,
		methodParent: string,
		methodName: string
	): Error {
		const type: ErrorType | null = ErrorTypeEnum.NotInitializedError;

		return new Error(type, `${methodParent}/${methodName}`, original);
	}
}
