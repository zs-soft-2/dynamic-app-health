import { ErrorTypeEnum } from './error-type.enum';

export type ErrorType =
	| ErrorTypeEnum.AuthenticationError
	| ErrorTypeEnum.DataAccessError
	| ErrorTypeEnum.NotInitializedError
	| ErrorTypeEnum.SimpleError;
