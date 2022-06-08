import { Observable } from 'rxjs';

import { EntityDataService } from '../../../common';
import { Bundle } from '../bundle';
import { RequestParams } from '../search';
import {
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate,
} from './patient.entity';

export abstract class PatientDataService extends EntityDataService<
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate
> {
	public abstract nextPage$(bundle: Bundle): Observable<Bundle>;
	public abstract prevPage$(bundle: Bundle): Observable<Bundle>;
	public abstract search$(params: RequestParams): Observable<Bundle>;
}
