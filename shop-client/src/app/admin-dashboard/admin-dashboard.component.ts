import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GetOrdersModel } from '../models/GetOrdersModel';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  public orders: GetOrdersModel[];
  
  ngOnInit() {
    this.getOrders();
  }

  constructor(public orderService: OrderService) {    
  }

  getOrders() {
    this.orderService.getOrders().subscribe((orders: GetOrdersModel[]) => {
      this.orders = orders;
      console.log(orders);
    });
  }
}
