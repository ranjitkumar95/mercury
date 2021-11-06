import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'offer/customers',
    pathMatch:'full'
  },
  { path: 'offer', loadChildren: () => import('./views/offer/offer.module').then(m => m.OfferModule) },
  { path: 'existing-order', loadChildren: () => import('./views/existing-order/existing-order.module').then(m => m.ExistingOrderModule) },
  { path: 'existing-offer', loadChildren: () => import('./views/existing-offer/existing-offer.module').then(m => m.ExistingOfferModule) },
  {
    path: "**",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
