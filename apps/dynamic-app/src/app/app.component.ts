import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationStateService } from '@dynamic-app-health/api';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'dynamic-app-health-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public title = 'dynamic-app';

	public constructor(
		private authenticationstateService: AuthenticationStateService
	) {}
}
