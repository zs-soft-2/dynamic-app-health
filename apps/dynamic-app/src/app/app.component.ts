import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	AuthenticationStateService,
	Error,
	ErrorTypeEnum,
} from '@dynamic-app-health/api';

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
	ngOnInit(): void {
		throw new Error(ErrorTypeEnum.DataAccessError, 'AppComponent', null);
	}
}
