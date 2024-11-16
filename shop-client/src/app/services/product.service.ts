import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';
import { ProductSaveModel } from '../models/ProductSaveModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductById(productId: number)
  {
    const url = `${this.baseURL}/Product/get-product-by-id?productId=${productId}`;
    return this.http.get<ProductModel>(url);
  }

  getProductsBySubcategory(subcategoryId: number): Observable<ProductModel[]> {
    const url = `${this.baseURL}/Product/get-products?subcategoryId=${subcategoryId}`;
    return this.http.get<ProductModel[]>(url);
  }

  addProduct(product: ProductSaveModel) {
    const url = `${this.baseURL}/Product/save-product`;
    return this.http.post(url, product);
  }

  updateProduct(product: ProductModel) {
    const url = `${this.baseURL}/Product/update-product`;
    return this.http.post(url, product);
  }

  deleteProduct(productId: number){
    const url = `${this.baseURL}/Product/delete-product?productId=${productId}`;
    return this.http.post(url, null);
  }
}