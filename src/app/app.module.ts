import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultLayoutComponent } from './layout';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ...APP_CONTAINERS,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
