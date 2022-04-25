import { ErrorType } from './error.type';

export type Error = {
	local: string;
	original?: any;
	redirect?: string;
	type: ErrorType;
};
