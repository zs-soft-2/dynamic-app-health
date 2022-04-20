import { EntityStateService } from '../../../common';
import { PatientEntity, PatientEntityAdd, PatientEntityUpdate } from './patient.entity';

export abstract class PatientStateService extends EntityStateService<
	PatientEntity,
	PatientEntityAdd,
	PatientEntityUpdate
> {}
