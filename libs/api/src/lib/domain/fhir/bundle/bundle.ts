import { R4 } from '@ahryman40k/ts-fhir-types';

export type Bundle = R4.IBundle & { type: string; };
