import { KeyValue } from '@angular/common';
import { Type } from '@angular/core';

import { DynamicConfigEntity } from '../../dynamic-config';

export type DynamicContent = {
	component: Type<any> | undefined;
	config: DynamicConfigEntity | undefined;
	keyValue: KeyValue<string, string | null>;
};
