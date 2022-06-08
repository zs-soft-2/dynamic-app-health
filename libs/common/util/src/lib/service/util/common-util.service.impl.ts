import { nanoid } from 'nanoid';

import { Injectable } from '@angular/core';
import { CommonUtilService } from '@dynamic-app-health/api';

@Injectable()
export class CommonUtilServiceImpl extends CommonUtilService {
	private readonly COMPONENT_ID_LENGTH = 6;
	private readonly ENTRY_ID_LENGTH = 8;
	private readonly ITEM_ID_LENGTH = 3;

	public createComponentId(): string {
		return this.createId(this.COMPONENT_ID_LENGTH);
	}

	public createEntityId(): string {
		return this.createId(this.ENTRY_ID_LENGTH);
	}

	public createId(length: number): string {
		return nanoid(length);
	}

	public createItemId(): string {
		return this.createId(this.ITEM_ID_LENGTH);
	}
}
