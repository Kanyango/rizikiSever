import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new_product/new_product.component';

const routes: Routes = [

  { path: 'products',  component: ProductsComponent },
  { path: 'new_product',  component: NewProductComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
