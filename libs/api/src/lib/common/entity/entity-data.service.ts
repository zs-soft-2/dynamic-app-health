import { Observable } from 'rxjs';
import { DataService } from '../data';

export abstract class EntityDataService<R, S, T> extends DataService {
	public abstract add$(entity: S): Observable<R>;
	public abstract list$(): Observable<R[]>;
	public abstract load$(id: string): Observable<R | undefined>;
	public abstract update$(dynamicPage: T): Observable<T>;
}
