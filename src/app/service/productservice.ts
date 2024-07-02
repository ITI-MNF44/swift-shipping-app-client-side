import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../domain/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsMini() {
    return this.http.get<any>('assets/products-mini.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }
}
