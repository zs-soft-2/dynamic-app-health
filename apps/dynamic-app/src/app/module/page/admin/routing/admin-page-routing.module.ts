import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '../component';

export const routes: Routes = [
	{
		path: '',
		component: AdminPageComponent,
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminPageRoutingModule {}
