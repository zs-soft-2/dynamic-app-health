import { ErrorTypeEnum } from './error-type.enum';
import { ErrorType } from './error.type';

export class Error {
	public local: string;
	public original: any;
	public type: ErrorType;

	public constructor(type: ErrorTypeEnum, local: string, original: any) {
		this.type = type;
		this.local = local;
		this.original = original;
	}
}
