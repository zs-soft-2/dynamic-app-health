import { Observable } from 'rxjs';
import { DataService } from '../data';

export abstract class EntityDataService<R, S, T> extends DataService {
	public abstract add$(entityAdd: S): Observable<R>;
	public abstract delete$(entity: R): Observable<R>;
	public abstract list$(): Observable<R[]>;
	public abstract load$(id: string): Observable<R>;
	public abstract update$(entityUpdate: T): Observable<T>;
}
