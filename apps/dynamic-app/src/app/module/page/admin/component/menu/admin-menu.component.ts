import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AdminMenuService } from './admin-menu.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AdminMenuService],
	selector: 'dh-menu',
	styleUrls: ['./admin-menu.component.scss'],
	templateUrl: './admin-menu.component.html',
})
export class AdminMenuComponent {
	public constructor(private componentService: AdminMenuService) {}
}
