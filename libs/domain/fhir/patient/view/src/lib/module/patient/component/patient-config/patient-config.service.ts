import { combineLatest, Observable, switchMap, takeUntil, tap } from 'rxjs';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	ConfigComponentBaseService,
	DynamicConfigEntity,
	DynamicConfigStateService,
	DynamicProperties,
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
	private defaultProperties: DynamicProperties;

	public constructor(
		private activatedRoute: ActivatedRoute,
		private dynamicConfigStateService: DynamicConfigStateService,
		private formBuilder: FormBuilder,
		private location: Location,
		private patientStateService: PatientStateService,
		private patientUtilService: PatientUtilService
	) {
		super();

		this.defaultProperties = this.patientUtilService.getDefaultProperties();
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
											patient,
											this.config?.config.properties ||
												this.defaultProperties
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
		this.dynamicConfigStateService.dispatchAddEntityAction(
			this.patientUtilService.getPatientDynamicConfigAdd(
				this.formGroup.value,
				this.configId
			)
		);
	}

	private createFormGroup(
		dynamicConfig: DynamicConfigEntity | undefined
	): FormGroup {
		const properties: DynamicProperties =
			dynamicConfig?.config.properties || this.defaultProperties;

		return this.formBuilder.group({
			componentId: [dynamicConfig?.componentId],
			config: this.formBuilder.group({
				label: [dynamicConfig?.config.label],
				selectedId: [dynamicConfig?.config.selectedId],
				properties: this.formBuilder.group({
					birthDate: [properties['birthDate']],
					gender: [properties['gender']],
					givenName: [properties['givenName']],
					familyName: [properties['familyName']],
					phone: [properties['phone']],
				}),
			}),
			id: [dynamicConfig?.id],
		});
	}

	private updateDynamicConfig(): void {
		this.dynamicConfigStateService.dispatchUpdateEntityAction(
			this.patientUtilService.getPatientDynamicConfigUpdate(
				this.formGroup.value
			)
		);
	}
}
