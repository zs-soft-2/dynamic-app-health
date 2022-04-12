import { BaseService } from '../../common';
import { Error } from './error.model';

export abstract class ErrorUtilService extends BaseService {
	public abstract createError(
		original: any,
		methodParent: string,
		methodName: string
	): Error;
}
