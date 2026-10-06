import { inject, Injectable, Service } from '@angular/core';
import { ProductsResponse } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Product {
private http = inject(HttpClient);
private apiUrl = 'https://dummyjson.com/products';
getProducts(): Observable<ProductsResponse> {
return this.http.get<ProductsResponse>(this.apiUrl);
}
}
