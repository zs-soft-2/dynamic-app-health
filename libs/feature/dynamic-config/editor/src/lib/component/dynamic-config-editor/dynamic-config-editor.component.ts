import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	BaseComponent,
	DynamicConfigEditorParams,
} from '@dynamic-app-health/api';

import { DynamicConfigEditorService } from './dynamic-config-editor.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DynamicConfigEditorService],
	selector: 'dh-dynamic-config-editor',
	styleUrls: ['./dynamic-config-editor.component.less'],
	templateUrl: './dynamic-config-editor.component.html',
})
export class DynamicConfigEditorComponent
	extends BaseComponent
	implements OnInit
{
	public params$$: Subject<DynamicConfigEditorParams>;

	public constructor(private componentService: DynamicConfigEditorService) {
		super();

		this.params$$ = new ReplaySubject();
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((params) => {
				this.params$$.next(params);
			});
	}
}
