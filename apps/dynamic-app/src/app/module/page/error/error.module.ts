import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreI18nDataModule } from '@dynamic-app-health/core/i18n/data';

import { ErrorComponent } from './component/';
import { ErrorRoutingModule } from './routing';

@NgModule({
	declarations: [ErrorComponent],
	imports: [CommonModule, ErrorRoutingModule, CoreI18nDataModule],
})
export class ErrorModule {}
