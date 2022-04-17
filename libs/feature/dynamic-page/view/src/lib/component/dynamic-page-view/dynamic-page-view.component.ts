import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent, DynamicPageParams } from '@dynamic-app-health/api';

import { DynamicPageViewService } from './dynamic-page-view.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DynamicPageViewService],
	selector: 'dh-dynamic-page-view',
	templateUrl: './dynamic-page-view.component.html',
	styleUrls: ['./dynamic-page-view.component.less'],
})
export class DynamicPageViewComponent extends BaseComponent implements OnInit {
	public dynamicPageParams$$: Subject<DynamicPageParams>;

	public constructor(private componentService: DynamicPageViewService) {
		super();

		this.dynamicPageParams$$ = new ReplaySubject();
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((params) => {
				this.dynamicPageParams$$.next(params);
			});
	}
}
