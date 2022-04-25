import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	AuthenticationStateService,
	ErrorTypeEnum,
	I18nService,
} from '@dynamic-app-health/api';
import { createError } from '@dynamic-app-health/core/error/util';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'dh-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title = 'dynamic-app';

	public constructor(
		private authenticationstateService: AuthenticationStateService,
		private i18nService: I18nService
	) {}

	@createError(ErrorTypeEnum.SimpleError)
	public doAnithing(): void {
		throw new Error('Hiba');
	}

	public ngOnInit(): void {
		console.log(this.i18nService.getActiveLangAsString());
		this.doAnithing();
	}
}
