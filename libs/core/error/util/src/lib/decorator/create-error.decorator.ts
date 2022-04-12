import { catchError, Observable, of } from 'rxjs';

import { ErrorDecoratorService } from '../service';

export function createError(): any {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (target: Function, methodName: string, descriptor: any) {
		const method = descriptor.value;

		descriptor.value = function (...args: any[]) {
			try {
				const result = method.apply(this, args);

				if (result && result instanceof Observable) {
					result.pipe(
						catchError((error: any) => {
							return of(
								ErrorDecoratorService.getUtilService().createError(
									error,
									this.constructor.name,
									methodName
								)
							);
						})
					);
				}

				return result;
			} catch (error: any) {
				throw ErrorDecoratorService.getUtilService().createError(
					error,
					this.constructor.name,
					methodName
				);
			}
		};
		return descriptor;
	};
}
