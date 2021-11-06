import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingOrderComponent } from './existing-order.component';

const routes: Routes = [{ path: '', component: ExistingOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingOrderRoutingModule { }
