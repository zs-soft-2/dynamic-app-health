import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	BaseComponent,
	DynamicLayoutItem,
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

	public cancel(): void {
		this.componentService.cancel();
	}

	public editItemHandler(layoutItem: DynamicLayoutItem): void {
		this.componentService.edit(layoutItem);
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((dynamicPageEditorParams) => {
				this.dynamicPageEditorParams$$.next(dynamicPageEditorParams);
			});
	}

	public removeItemHandler(layoutItem: DynamicLayoutItem): void {
		this.componentService.remove(layoutItem);
	}

	public submit(): void {
		this.componentService.submit();
	}

	public addClickHandler(componentName: string): void {
		this.componentService.addClickHandler(componentName);
	}
}
