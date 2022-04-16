import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@dynamic-app-health/api';

import { TopBarParams } from '../../api';
import { TopBarService } from './top-bar.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TopBarService],
	selector: 'dh-top-bar',
	styleUrls: ['./top-bar.component.less'],
	templateUrl: './top-bar.component.html',
})
export class TopBarComponent extends BaseComponent implements OnInit {
	public params$$: Subject<TopBarParams>;

	public constructor(private componentService: TopBarService) {
		super();

		this.params$$ = new ReplaySubject();
	}

	public handleAddClick(): void {
		this.componentService.handleAddClick();
	}

	public handleEditClick(): void {
		this.componentService.handleEditClick();
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((topBarParams) => this.params$$.next(topBarParams));
	}
}
