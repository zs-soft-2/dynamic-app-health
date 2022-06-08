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
	PatientListParams,
} from '@dynamic-app-health/api';

import { PatientListService } from './patient-list.service';
import { PatientListStoreService } from './patient-list-store.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PatientListService, PatientListStoreService],
	selector: 'dh-patient-list',
	styleUrls: ['./patient-list.component.less'],
	templateUrl: './patient-list.component.html',
})
export class PatientListComponent
	extends ParamsBaseComponent<PatientListParams>
	implements OnDestroy, OnInit
{
	@Input()
	public config!: DynamicConfigEntity;

	public constructor(private componentService: PatientListService) {
		super();
	}

	public ngOnInit(): void {
		this.componentService
			.init$(this.config)
			.pipe(takeUntil(this.destroy))
			.subscribe((params) => {
				this.params = params;

				this.params$$.next(this.params);
			});
	}

	public handleRowSelect(event: any): void {
		this.componentService.handleRowSelect(event.data);
	}

	public paginate(event: any): void {
		this.componentService.paginate(event);
	}
}
