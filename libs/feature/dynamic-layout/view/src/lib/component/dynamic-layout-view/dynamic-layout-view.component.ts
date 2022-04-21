import { GridsterConfig } from 'angular-gridster2';

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import {
	DynamicLayoutItem,
	DynamicLayoutModeEnum,
} from '@dynamic-app-health/api';

import { DynamicLayoutViewService } from './dynamic-layout-view.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DynamicLayoutViewService],
	selector: 'dh-dynamic-layout-view',
	templateUrl: './dynamic-layout-view.component.html',
	styleUrls: ['./dynamic-layout-view.component.scss'],
})
export class DynamicLayoutViewComponent implements OnInit {
	@Output()
	public editItem: EventEmitter<DynamicLayoutItem>;
	@Input()
	public layoutItems: DynamicLayoutItem[] = [];
	@Input()
	public options: GridsterConfig;
	@Output()
	public removeItem: EventEmitter<DynamicLayoutItem>;
	@Input()
	public mode: DynamicLayoutModeEnum = DynamicLayoutModeEnum.view;

	public constructor(private componentService: DynamicLayoutViewService) {
		this.editItem = new EventEmitter();
		this.removeItem = new EventEmitter();
		this.options = {
			draggable: {
				enabled: true,
			},
			resizable: {
				enabled: true,
			},
		};
	}

	public edit(layoutItem: DynamicLayoutItem): void {
		this.editItem.emit(layoutItem);
	}

	public ngOnInit(): void {
		console.log();
	}

	public remove(layoutItem: DynamicLayoutItem): void {
		this.removeItem.emit(layoutItem);
	}
}
