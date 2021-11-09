import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/layout/default-layout/default-layout.component';
import { CustomersComponent } from './customers/customers.component';
import { MaterialCharacteristicsComponent } from './material-characteristics/material-characteristics.component';
import { MillExtraComponent } from './mill-extra/mill-extra.component';
import { OfferSummeryComponent } from './offer-summery/offer-summery.component';
import { ProcessingExtraComponent } from './processing-extra/processing-extra.component';
import { TransportExtraComponent } from './transport-extra/transport-extra.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'offer-summary',
        component: OfferSummeryComponent
      },
      {
        path: 'material-characteristics',
        component: MaterialCharacteristicsComponent
      },
      {
        path: 'Mill-extras',
        component: MillExtraComponent
      },
      {
        path: 'processing-extras',
        component: ProcessingExtraComponent
      },
      {
        path: 'transport-extras',
        component: TransportExtraComponent
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
