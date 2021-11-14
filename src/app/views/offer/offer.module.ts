import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { OfferSummeryComponent } from './offer-summery/offer-summery.component';
import { MaterialCharacteristicsComponent } from './material-characteristics/material-characteristics.component';
import { MillExtraComponent } from './mill-extra/mill-extra.component';
import { ProcessingExtraComponent } from './processing-extra/processing-extra.component';
import { TransportExtraComponent } from './transport-extra/transport-extra.component';
import { CommonUseModule } from 'src/app/common-use/common-use.module';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    OfferComponent,
    OfferSummeryComponent,
    CustomersComponent,
    MaterialCharacteristicsComponent,
    MillExtraComponent,
    ProcessingExtraComponent,
    TransportExtraComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    CommonUseModule,
    MaterialsModule
  ]
})
export class OfferModule { }
