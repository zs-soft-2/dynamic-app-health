import { BaseService } from '../../common';
import { Error } from './error.model';
import { ErrorType } from './error.type';

export abstract class ErrorUtilService extends BaseService {
	public abstract createError(
		methodParent: string,
		methodName: string,
		type: ErrorType,
		redirect?: string,
		original?: any
	): Error;
}
