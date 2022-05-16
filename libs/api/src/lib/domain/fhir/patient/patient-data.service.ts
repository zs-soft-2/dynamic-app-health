import { Observable } from 'rxjs';

import { EntityDataService } from '../../../common';
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
	public abstract search$(params: RequestParams): Observable<PatientEntity[]>;
}
