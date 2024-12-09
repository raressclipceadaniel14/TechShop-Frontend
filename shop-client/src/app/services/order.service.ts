import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/ProductModel';
import { PreOrderSaveModel } from '../models/PreOrderSaveModel';
import { RemoveFromCartModel } from '../models/RemoveFromCartModel';
import { OrderSaveModel } from '../models/OrderModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  placeOrder(orderModel: OrderSaveModel) {
    const url = `${this.baseURL}/Order/place-order`;
    return this.http.post(url, orderModel);
  }
}