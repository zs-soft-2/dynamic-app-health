import { KeyValue } from '@angular/common';

export type DynamicColumn = {
	class: string;
	percent: number;
	contents?: KeyValue<string, string | null>[];
};
