import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	BaseComponent,
	DynamicComponent,
	DynamicPageEditorParams,
} from '@dynamic-app-health/api';

import { DynamicPageEditorUtilService } from '../../util';
import { DynamicPageEditorService } from './dynamic-page-editor.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DynamicPageEditorService, DynamicPageEditorUtilService],
	selector: 'dh-dynamic-page-editor',
	styleUrls: ['./dynamic-page-editor.component.less'],
	templateUrl: './dynamic-page-editor.component.html',
})
export class DynamicPageEditorComponent
	extends BaseComponent
	implements OnInit
{
	public dynamicPageEditorParams$$: Subject<DynamicPageEditorParams>;

	public constructor(private componentService: DynamicPageEditorService) {
		super();

		this.dynamicPageEditorParams$$ = new ReplaySubject();
	}

	public dragEnd(): void {
		this.componentService.dragEnd();
	}

	public dragStart(event: Event, component: DynamicComponent): void {
		this.componentService.dragStart(component);
	}

	public drop(rowIndex: number, columnIndex: number): void {
		this.componentService.drop(rowIndex, columnIndex);
	}

	public edit(
		contentId: string,
		componentName: string,
		rowIndex: number,
		columnIndex: number,
		componentIndex: number
	): void {
		this.componentService.edit(
			contentId,
			componentName,
			rowIndex,
			columnIndex,
			componentIndex
		);
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((dynamicPageEditorParams) => {
				this.dynamicPageEditorParams$$.next(dynamicPageEditorParams);
			});
	}

	public remove(
		rowIndex: number,
		columnIndex: number,
		componentIndex: number
	): void {
		this.componentService.remove(rowIndex, columnIndex, componentIndex);
	}

	public submit(): void {
		this.componentService.submit();
	}

	public cancel(): void {
		this.componentService.cancel();
	}
}
