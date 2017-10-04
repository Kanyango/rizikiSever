import { Component, OnInit} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'products-list',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit{

  products: Array<any> = [];
  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'http://127.0.0.1:8300/product';

  constructor(public http: Http){}

  ngOnInit(): Promise<any>
  {
     return this.http
          .get(this.productsUrl)
          .toPromise()
          .then(res => {  this.products = res.json(); console.log(res.json())})
          .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }

}
