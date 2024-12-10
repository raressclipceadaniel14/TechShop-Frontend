import { Component, Input } from '@angular/core';
import { GetOrdersModel } from '../models/GetOrdersModel';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order: GetOrdersModel;

}
