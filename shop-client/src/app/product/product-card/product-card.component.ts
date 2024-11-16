import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: ProductModel;

  constructor(
    public sessionService: SessionService,
  ) {}

  isAdmin() {
    return this.sessionService.isAdmin();
  }
}
