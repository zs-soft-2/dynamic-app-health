import { Observable, switchMap, tap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	ConfigComponentBaseService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	Pagination,
	PatientListConfig,
	PatientListConfigParams,
	PatientUtilService,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientListConfigService extends ConfigComponentBaseService<
	PatientListConfigParams,
	PatientListConfig
> {
	private configId!: string | undefined;
	private defaultPagination!: Pagination;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicConfigStateService: DynamicConfigStateService,
		private formBuilder: FormBuilder,
		private location: Location,
		private patientUtilService: PatientUtilService
	) {
		super();

		this.defaultPagination = this.patientUtilService.getDefaultPagination();
	}

	public cancel(): void {
		this.back();
	}

	public init$(): Observable<PatientListConfigParams> {
		return this.activatedRoute.params.pipe(
			tap((params) => {
				this.configId = params['configId'];
			}),
			switchMap(() =>
				this.dynamicConfigStateService
					.selectEntityById$(this.configId || '')
					.pipe(
						switchMap((dynamicConfig) => {
							this.config = dynamicConfig as DynamicConfigEntity;

							this.formGroup = this.createFormGroup(
								dynamicConfig as DynamicConfigEntity
							);

							this.params = {
								formGroup: this.formGroup,
							};

							this.params$$.next(
								this.params as PatientListConfigParams
							);

							return this.params$$;
						})
					)
			)
		);
	}

	public submit(): void {
		if (!this.config) {
			this.creataDynamicConfig();
		} else {
			this.updateDynamicConfig();
		}

		this.back();
	}

	private back(): void {
		this.location.back();
	}

	private creataDynamicConfig(): void {
		this.dynamicConfigStateService.dispatchAddEntityAction(
			this.patientUtilService.getPatientListDynamicConfigAdd(
				this.formGroup.value,
				this.configId
			)
		);
	}

	private createFormGroup(
		dynamicConfig: DynamicConfigEntity | undefined
	): FormGroup {
		return this.formBuilder.group({
			id: [dynamicConfig?.id],
			label: [dynamicConfig?.label],
			link: [dynamicConfig?.link],
			properties: this.formBuilder.group({
				birthDate: [
					dynamicConfig
						? dynamicConfig?.config.properties['birthDate']
						: true,
				],
				gender: [dynamicConfig?.config.properties['gender']],
				givenName: [dynamicConfig?.config.properties['givenName']],
				familyName: [dynamicConfig?.config.properties['familyName']],
				phone: [dynamicConfig?.config.properties['phone']],
			}),
			pagination: this.formBuilder.group({
				isPagination: [
					dynamicConfig
						? dynamicConfig?.config.pagination['isPagination']
						: this.defaultPagination.isPagination,
				],
				rows: [
					dynamicConfig
						? dynamicConfig?.config.pagination['rows']
						: this.defaultPagination.rows,
				],
			}),
		});
	}

	private updateDynamicConfig(): void {
		this.dynamicConfigStateService.dispatchUpdateEntityAction(
			this.patientUtilService.getPatientListDynamicConfigUpdate(
				this.formGroup.value
			)
		);
	}
}
