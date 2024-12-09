import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { OrderSaveModel } from '../models/OrderModel';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  placedSuccessfully: boolean = false;

  editProductForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
  });

  constructor(
    public sessionService: SessionService,
    public orderService: OrderService
  ) {
  }

  submit() {
    var orderModel: OrderSaveModel = {
      userId: this.sessionService.userId,
      address: this.editProductForm.get('address').value
    }

    this.orderService.placeOrder(orderModel).subscribe(() => {
      this.placedSuccessfully = true;
    });
  }
}
