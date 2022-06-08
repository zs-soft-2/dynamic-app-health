import { Observable, ReplaySubject, Subject } from 'rxjs';

import { ConfigEntity } from '../config';
import { BaseService } from './base.service';

export abstract class ComponentBaseService<S, T> extends BaseService {
	protected params!: S;
	protected params$$!: Subject<S>;

	public constructor() {
		super();

		this.params$$ = new ReplaySubject();
	}

	public abstract init$(
		configEntity?: ConfigEntity<T>
	): Observable<S>;
}
