import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  getProducts(limit: number = 10, skip: number = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }
}