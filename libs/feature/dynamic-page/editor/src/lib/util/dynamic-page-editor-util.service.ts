import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
	DynamicLayout,
	DynamicPageEntity,
	DynamicPageEntityAdd,
	DynamicPageEntityUpdate,
} from '@dynamic-app-health/api';

@Injectable()
export class DynamicPageEditorUtilService {
	public constructor(private formBuilder: FormBuilder) {}

	public createDynamicPage(formGroup: FormGroup): DynamicPageEntityAdd {
		return {
			label: formGroup.value['label'],
			layout: {
				layoutItems: [],
				name: '',
			},
			path: formGroup.value['path'],
		};
	}

	public createFormGroup(
		dynamicPageEntity: DynamicPageEntity | undefined
	): FormGroup {
		return this.formBuilder.group({
			id: [dynamicPageEntity?.id],
			path: [dynamicPageEntity?.path || null],
			label: [dynamicPageEntity?.label || null],
		});
	}

	public findDynamicPage(
		dynamicPages: DynamicPageEntity[],
		path: string
	): DynamicPageEntity | undefined {
		const dynamicPage: DynamicPageEntity | undefined = dynamicPages.find(
			(dynamicPage) => dynamicPage.path === path
		);

		return dynamicPage;
	}

	public updateDynamicPage(
		formGroup: FormGroup,
		layout: DynamicLayout
	): DynamicPageEntityUpdate {
		return {
			id: formGroup.value['id'],
			label: formGroup.value['label'],
			layout,
			path: formGroup.value['path'],
		};
	}
}
