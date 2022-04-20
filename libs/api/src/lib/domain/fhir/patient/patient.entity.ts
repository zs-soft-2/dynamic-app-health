import { R4 } from '@ahryman40k/ts-fhir-types';

import { Identifiable } from '../../../common';

export type PatientEntity = R4.IPatient & Required<Identifiable>;

export type PatientEntityAdd = Omit<PatientEntity, 'id'>;

export type PatientEntityUpdate = Partial<PatientEntity>;
