import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingOrderRoutingModule } from './existing-order-routing.module';
import { ExistingOrderComponent } from './existing-order.component';


@NgModule({
  declarations: [
    ExistingOrderComponent
  ],
  imports: [
    CommonModule,
    ExistingOrderRoutingModule
  ]
})
export class ExistingOrderModule { }
