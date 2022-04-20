import { ConfigComponentBaseParam } from '../../../common';
import { PatientView } from './patient.view';

export interface PatientConfigParams extends ConfigComponentBaseParam {
	patientViews: PatientView[];
}
