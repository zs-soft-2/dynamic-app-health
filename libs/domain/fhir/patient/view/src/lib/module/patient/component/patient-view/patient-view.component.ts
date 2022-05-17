import { takeUntil } from 'rxjs';

import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {
	DynamicConfigEntity,
	ParamsBaseComponent,
	PatientParams,
} from '@dynamic-app-health/api';

import { PatientViewService } from './patient-view.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PatientViewService],
	selector: 'dh-patient-view',
	styleUrls: ['./patient-view.component.less'],
	templateUrl: './patient-view.component.html',
})
export class PatientViewComponent
	extends ParamsBaseComponent<PatientParams>
	implements OnDestroy, OnInit
{
	@Input()
	public config!: DynamicConfigEntity;

	public constructor(private componentService: PatientViewService) {
		super();
	}

	public ngOnInit(): void {
		this.componentService
			.init$(this.COMPONENT_ID,  this.config)
			.pipe(takeUntil(this.destroy))
			.subscribe((params) => {
				this.params$$.next(params);
			});
	}

	public override ngOnDestroy(): void {
		this.componentService.onDestroy();

		super.ngOnDestroy();
	}
}
