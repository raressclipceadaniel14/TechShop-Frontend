import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/ProductModel';
import { PreOrderSaveModel } from '../models/PreOrderSaveModel';
import { RemoveFromCartModel } from '../models/RemoveFromCartModel';

@Injectable({
  providedIn: 'root',
})
export class PreOrderService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPreorderByUser(userId: number): Observable<ProductModel[]> {
    const url = `${this.baseURL}/PreOrder/get-preorder-by-user?userId=${userId}`;
    return this.http.get<ProductModel[]>(url);
  }

  savePreOrder(preOrder: PreOrderSaveModel) {
    const url = `${this.baseURL}/PreOrder/save-preorder`;
    return this.http.post(url, preOrder);
  }

  removeFromCart(removeFromCartModel: RemoveFromCartModel) {
    const url = `${this.baseURL}/PreOrder/remove-from-cart`;
    return this.http.post(url, removeFromCartModel);
  }
}