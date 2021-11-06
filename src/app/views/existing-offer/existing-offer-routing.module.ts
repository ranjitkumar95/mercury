import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingOfferComponent } from './existing-offer.component';

const routes: Routes = [{ path: '', component: ExistingOfferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingOfferRoutingModule { }
