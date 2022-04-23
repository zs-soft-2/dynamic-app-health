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
			label: formGroup.value['label'],
			layout,
			path: formGroup.value['path'],
		};
	}

	public createFormGroup(
		dynamicPage: DynamicPageEntity | undefined
	): FormGroup {
		const layout: DynamicLayout | undefined = dynamicPage?.layout;

		return this.formBuilder.group({
			id: [dynamicPage?.id],
			path: [dynamicPage?.path || null],
			label: [dynamicPage?.label || null],
			layout: this.formBuilder.group({
				minCols: [layout?.minCols || null],
				maxCols: [layout?.maxCols || null],
				minRows: [layout?.minRows || null],
				maxRows: [layout?.maxRows || null],
			}),
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
			layout: {
				...layout,
				...formGroup.value['layout'],
			},
			path: formGroup.value['path'],
		};
	}
}
