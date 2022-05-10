import { Observable, switchMap, tap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	ConfigComponentBaseService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	DynamicProperties,
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
	private defaultProperties!: DynamicProperties;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicConfigStateService: DynamicConfigStateService,
		private formBuilder: FormBuilder,
		private location: Location,
		private patientUtilService: PatientUtilService
	) {
		super();

		this.defaultPagination = this.patientUtilService.getDefaultPagination();
		this.defaultProperties = this.patientUtilService.getDefaultProperties();
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
		const pagination: Pagination =
			dynamicConfig?.config.pagination || this.defaultPagination;
		const properties: DynamicProperties =
			dynamicConfig?.config.properties || this.defaultProperties;

		return this.formBuilder.group({
			id: [dynamicConfig?.id],
			label: [dynamicConfig?.label],
			config: this.formBuilder.group({
				link: [dynamicConfig?.config.link],
				properties: this.formBuilder.group({
					birthDate: [properties['birthDate']],
					gender: [properties['gender']],
					givenName: [properties['givenName']],
					familyName: [properties['familyName']],
					phone: [properties['phone']],
				}),
				pagination: this.formBuilder.group({
					isPagination: [pagination['isPagination']],
					rows: [pagination['rows']],
				}),
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
