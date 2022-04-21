import { Observable, switchMap, tap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	ConfigComponentBaseService,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
	DynamicConfigStateService,
	PatientListConfig,
	PatientListConfigParams,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientListConfigService extends ConfigComponentBaseService<
	PatientListConfigParams,
	PatientListConfig
> {
	private configId!: string;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicConfigStateService: DynamicConfigStateService,
		private formBuilder: FormBuilder,
		private location: Location
	) {
		super();
	}

	public cancel(): void {
		this.back();
	}

	public init$(): Observable<PatientListConfigParams> {
		return this.activatedRoute.params.pipe(
			tap((params) => {
				this.configId = params['configId'] as string;
			}),
			switchMap(() =>
				this.dynamicConfigStateService
					.selectEntityById$(this.configId)
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
		const {
			label,
			id,
			link,
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
		} = this.formGroup.value;

		const dynamicConfig: DynamicConfigEntity = {
			id: id || this.configId,
			label,
			link,
			config: {
				properties: {
					birthDate,
					familyName,
					givenName,
					gender,
					phone,
				},
			},
		};

		this.dynamicConfigStateService.dispatchAddEntityAction(dynamicConfig);
	}

	private createFormGroup(
		dynamicConfig: DynamicConfigEntity | undefined
	): FormGroup {
		return this.formBuilder.group({
			id: [dynamicConfig?.id],
			label: [dynamicConfig?.label],
			link: [dynamicConfig?.link],
			birthDate: [dynamicConfig?.config.properties['birthDate']],
			gender: [dynamicConfig?.config.properties['gender']],
			givenName: [dynamicConfig?.config.properties['givenName']],
			familyName: [dynamicConfig?.config.properties['familyName']],
			phone: [dynamicConfig?.config.properties['phone']],
		});
	}

	private updateDynamicConfig(): void {
		const {
			label,
			id,
			link,
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
		} = this.formGroup.value;

		const dynamicConfig: DynamicConfigEntityUpdate = {
			id,
			label,
			link,
			config: {
				properties: {
					id,
					birthDate,
					familyName,
					gender,
					givenName,
					phone,
				},
			},
		};

		this.dynamicConfigStateService.dispatchUpdateEntityAction(
			dynamicConfig
		);
	}
}
