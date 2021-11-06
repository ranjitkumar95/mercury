import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingOfferRoutingModule } from './existing-offer-routing.module';
import { ExistingOfferComponent } from './existing-offer.component';


@NgModule({
  declarations: [
    ExistingOfferComponent
  ],
  imports: [
    CommonModule,
    ExistingOfferRoutingModule
  ]
})
export class ExistingOfferModule { }
