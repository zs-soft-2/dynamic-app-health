import { Injectable } from '@angular/core';
import { Error, ErrorType, ErrorUtilService } from '@dynamic-app-health/api';

@Injectable()
export class ErrorUtilServiceImpl extends ErrorUtilService {
	public createError(
		methodParent: string,
		methodName: string,
		type: ErrorType,
		original?: any,
		redirect?: string
	): Error {
		return {
			type,
			local: `${methodParent}/${methodName}`,
			original,
			redirect,
		};
	}
}
