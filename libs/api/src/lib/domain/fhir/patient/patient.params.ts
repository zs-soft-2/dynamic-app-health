import { ComponentBaseParam } from '../../../common';
import { PatientView } from './patient.view';

export interface PatientParams extends ComponentBaseParam {
	patient: PatientView;
}
