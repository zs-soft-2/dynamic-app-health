import { catchError, Observable, of } from 'rxjs';

import { ErrorType, ErrorTypeEnum } from '@dynamic-app-health/api';

import { ErrorDecoratorService } from '../service';

export function createError(type: ErrorType): any {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (target: Function, methodName: string, descriptor: any) {
		const method = descriptor.value;

		descriptor.value = function (...args: any[]) {
			try {
				const result = method.apply(this, args);

				if (result && result instanceof Observable) {
					result.pipe(
						catchError((error: any) => {
							let redirect = undefined;

							if (type === ErrorTypeEnum.SimpleError) {
								redirect = 'error';
							}

							return of(
								ErrorDecoratorService.getUtilService().createError(
									this.constructor.name,
									methodName,
									type,
									error,
									redirect
								)
							);
						})
					);
				}

				return result;
			} catch (error: any) {
				let redirect = undefined;

				if (type === ErrorTypeEnum.SimpleError) {
					redirect = 'error';
				}

				throw ErrorDecoratorService.getUtilService().createError(
					this.constructor.name,
					methodName,
					type,
					error,
					redirect
				);
			}
		};

		return descriptor;
	};
}
