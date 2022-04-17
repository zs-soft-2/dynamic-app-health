import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseComponent } from '@dynamic-app-health/api';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'dh-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.less'],
})
export class ErrorComponent extends BaseComponent {}
