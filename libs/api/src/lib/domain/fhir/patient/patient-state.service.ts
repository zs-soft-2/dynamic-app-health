import { Observable } from 'rxjs';

import { EntityStateService } from '../../../common';
import { PatientBundle } from './patient.bundle';
import {
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate,
} from './patient.entity';

export abstract class PatientStateService extends EntityStateService<
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate
> {
	public abstract dispatchListPatient(
		requesterId: string,
		index: number,
		count: number
	): void;
	public abstract selectPatientBundleByRequesterId$(
		requesterId: string
	): Observable<PatientBundle | undefined>;
}
