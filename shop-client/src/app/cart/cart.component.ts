import { Component } from '@angular/core';
import { PreOrderService } from '../services/preorder.service';
import { SessionService } from '../services/session.service';
import { ProductModel } from '../models/ProductModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  preOrder: ProductModel[] = []; 

  constructor(
    public sessionService: SessionService,
    public preOrderService: PreOrderService
  ) {
  }

  ngOnInit() {
    this.getPreOrder(this.sessionService.userId);
  }

  getPreOrder(userId: number) {
    this.preOrderService.getPreorderByUser(userId).subscribe((products: ProductModel[]) => {
      this.preOrder = products;
    });
  }
}
