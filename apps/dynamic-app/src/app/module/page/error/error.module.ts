import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './component/';
import { ErrorRoutingModule } from './routing';

@NgModule({
	declarations: [ErrorComponent],
	imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
