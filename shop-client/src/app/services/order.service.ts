import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderSaveModel } from '../models/OrderModel';
import { GetOrdersModel } from '../models/GetOrdersModel';

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

  getOrders(): Observable<GetOrdersModel[]>{
    const url = `${this.baseURL}/Order/get-orders`;
    return this.http.get<GetOrdersModel[]>(url);
  }

  getOrdersByUserId(): Observable<GetOrdersModel[]>{
    const url = `${this.baseURL}/Order/get-orders-by-user-id`;
    return this.http.get<GetOrdersModel[]>(url);
  }

  updateStatus(orderId: number) {
    const url = `${this.baseURL}/Order/update-status`;
    return this.http.post(url, orderId);
  }
}