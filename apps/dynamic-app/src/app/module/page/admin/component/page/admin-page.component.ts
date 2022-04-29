import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AdminPageService } from './admin-page.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AdminPageService],
	selector: 'dh-admin-page',
	styleUrls: ['./admin-page.component.scss'],
	templateUrl: './admin-page.component.html',
})
export class AdminPageComponent {
	public constructor(private componentService: AdminPageService) {}
}
