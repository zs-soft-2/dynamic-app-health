import { takeUntil } from 'rxjs';

import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {
	ConfigBaseComponent,
	PatientConfigParams,
} from '@dynamic-app-health/api';

import { PatientConfigService } from './patient-config.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PatientConfigService],
	selector: 'dh-patient-config',
	styleUrls: ['./patient-config.component.less'],
	templateUrl: './patient-config.component.html',
})
export class PatientConfigComponent
	extends ConfigBaseComponent<PatientConfigParams>
	implements OnDestroy, OnInit
{
	public constructor(private componentService: PatientConfigService) {
		super();
	}

	public cancel(): void {
		this.componentService.cancel();
	}

	public override ngOnDestroy(): void {
		this.componentService.onDestroy();

		super.ngOnDestroy();
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
