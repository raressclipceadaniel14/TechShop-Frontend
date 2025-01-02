import { Component, Input } from '@angular/core';
import { GetOrdersModel } from '../models/GetOrdersModel';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order: GetOrdersModel;

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
    console.log(this.order?.orderStatus)
  }

  updateStatus() {
    this.orderService.updateStatus(this.order.id).subscribe(() => {
      window.location.reload();
    });
  }
}
`2`