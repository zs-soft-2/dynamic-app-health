import { RequestParams } from 'libs/domain/fhir/patient/data/src/lib/service';
import { Observable } from 'rxjs';

import { EntityDataService } from '../../../common';
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
