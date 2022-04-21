import { combineLatest, Observable, switchMap, takeUntil, tap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	ConfigComponentBaseService,
	DynamicConfigEntity,
	DynamicConfigEntityUpdate,
	DynamicConfigStateService,
	PatientConfig,
	PatientConfigParams,
	PatientEntity,
	PatientStateService,
	PatientUtilService,
} from '@dynamic-app-health/api';

@Injectable()
export class PatientConfigService extends ConfigComponentBaseService<
	PatientConfigParams,
	PatientConfig
> {
	private configId!: string;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicConfigStateService: DynamicConfigStateService,
		private formBuilder: FormBuilder,
		private location: Location,
		private patientStateService: PatientStateService,
		private patientUtilService: PatientUtilService
	) {
		super();
	}

	public cancel(): void {
		this.back();
	}

	public init$(): Observable<PatientConfigParams> {
		this.patientStateService.dispatchListEntitiesAction();

		combineLatest([
			this.activatedRoute.params,
			this.patientStateService.selectEntities$(),
		])
			.pipe(
				tap(([params, _]) => {
					this.configId = params['configId'] as string;
				}),
				switchMap(([_, entities]) =>
					this.dynamicConfigStateService
						.selectEntityById$(this.configId)
						.pipe(
							tap((dynamicConfig) => {
								this.config =
									dynamicConfig as DynamicConfigEntity;
								this.formGroup = this.createFormGroup(
									dynamicConfig as DynamicConfigEntity
								);

								this.params = {
									formGroup: this.formGroup,
									patientViews: (
										entities as PatientEntity[]
									).map((patient) =>
										this.patientUtilService.createPatientView(
											patient
										)
									),
								};

								this.params$$.next(this.params);
							})
						)
				),
				takeUntil(this.destroy)
			)
			.subscribe();

		return this.params$$;
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
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
			selectedId,
		} = this.formGroup.value;

		const dynamicConfig: DynamicConfigEntity = {
			id: id || this.configId,
			label,
			selectedId,
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
			birthDate: [dynamicConfig?.config.properties['birthDate']],
			gender: [dynamicConfig?.config.properties['gender']],
			givenName: [dynamicConfig?.config.properties['givenName']],
			familyName: [dynamicConfig?.config.properties['familyName']],
			phone: [dynamicConfig?.config.properties['phone']],
			selectedId: [dynamicConfig?.selectedId],
		});
	}

	private updateDynamicConfig(): void {
		const {
			label,
			id,
			familyName,
			phone,
			givenName,
			gender,
			birthDate,
			selectedId,
		} = this.formGroup.value;

		const dynamicConfig: DynamicConfigEntityUpdate = {
			id,
			label,
			selectedId,
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
