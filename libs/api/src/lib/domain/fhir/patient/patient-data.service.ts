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
> {}
