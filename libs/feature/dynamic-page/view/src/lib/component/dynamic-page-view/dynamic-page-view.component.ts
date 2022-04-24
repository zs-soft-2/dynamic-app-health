import { takeUntil } from 'rxjs';

import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {
	DynamicPageParams,
	ParamsBaseComponent,
} from '@dynamic-app-health/api';

import { DynamicPageViewService } from './dynamic-page-view.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DynamicPageViewService],
	selector: 'dh-dynamic-page-view',
	templateUrl: './dynamic-page-view.component.html',
	styleUrls: ['./dynamic-page-view.component.less'],
})
export class DynamicPageViewComponent
	extends ParamsBaseComponent<DynamicPageParams>
	implements OnDestroy, OnInit
{
	public constructor(private componentService: DynamicPageViewService) {
		super();
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
