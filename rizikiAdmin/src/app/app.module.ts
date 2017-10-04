import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CollapseComponent } from './products/common/collapse';
import { NewProductComponent } from './new_product/new_product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FileSelectDirective,
    NewProductComponent,
    CollapseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
