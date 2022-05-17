import { Bundle } from "../bundle";

export interface PatientBundle {
	requesterId: string;
	bundles: { [key: string]: Bundle };
	total: number;
}