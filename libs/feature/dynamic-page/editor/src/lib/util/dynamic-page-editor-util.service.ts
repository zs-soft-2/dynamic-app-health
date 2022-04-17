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

	public createDynamicPage(
		formGroup: FormGroup,
		layout: DynamicLayout
	): DynamicPageEntityAdd {
		return {
			layout,
			label: formGroup.value['label'],
			path: formGroup.value['path'],
		};
	}

	public createFormGroup(
		dynamicPageEntity: DynamicPageEntity | undefined,
		layoutName: string
	): FormGroup {
		return this.formBuilder.group({
			id: [dynamicPageEntity?.id],
			layout: [dynamicPageEntity?.layout.name || layoutName],
			path: [dynamicPageEntity?.path || null],
			label: [dynamicPageEntity?.label || null],
		});
	}

	public findDynamicPage(
		dynamicPages: DynamicPageEntity[],
		path: string
	): DynamicPageEntity | undefined {
		return dynamicPages.find((dynamicPage) => dynamicPage.path === path);
	}

	public updateDynamicPage(
		formGroup: FormGroup,
		layout: DynamicLayout
	): DynamicPageEntityUpdate {
		return {
			id: formGroup.value['id'],
			layout,
			label: formGroup.value['label'],
			path: formGroup.value['path'],
		};
	}
}
