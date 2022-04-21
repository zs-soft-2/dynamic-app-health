import { ReplaySubject, takeUntil } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	ConfigBaseComponent,
	PatientListConfigParams,
} from '@dynamic-app-health/api';

import { PatientListConfigService } from './patient-list-config.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PatientListConfigService],
	selector: 'dh-patient-list-config',
	styleUrls: ['./patient-list-config.component.less'],
	templateUrl: './patient-list-config.component.html',
})
export class PatientListConfigComponent
	extends ConfigBaseComponent<PatientListConfigParams>
	implements OnInit
{
	public constructor(private componentService: PatientListConfigService) {
		super();

		this.params$$ = new ReplaySubject();
	}

	public cancel(): void {
		this.componentService.cancel();
	}

	public ngOnInit(): void {
		this.componentService
			.init$()
			.pipe(takeUntil(this.destroy))
			.subscribe((params) => {
				this.params$$.next(params);
			});
	}

	public submit(): void {
		this.componentService.submit();
	}
}
