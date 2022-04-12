import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	AuthenticationStateService,
	ErrorTypeEnum,
} from '@dynamic-app-health/api';
import { createError } from '@dynamic-app-health/core/error/util';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'dynamic-app-health-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title = 'dynamic-app';

	public constructor(
		private authenticationstateService: AuthenticationStateService
	) {}

	@createError()
	public doAnithing(): void {
		throw new Error('Hiba');
	}

	public ngOnInit(): void {
		this.doAnithing();
	}
}
