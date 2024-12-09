import { Component, input, Input } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { SessionService } from '../../services/session.service';
import { ProductService } from '../../services/product.service';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteModel } from '../../models/FavoriteModel';
import { PreOrderService } from '../../services/preorder.service';
import { PreOrderSaveModel } from '../../models/PreOrderSaveModel';
import { RemoveFromCartModel } from '../../models/RemoveFromCartModel';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: ProductModel;
  @Input() isCartCard: boolean = false;
  @Input() isWishlistCard: boolean = false;

  constructor(
    public sessionService: SessionService,
    public productService: ProductService,
    public favoriteService: FavoriteService,
    public preOrderService: PreOrderService,
  ) {}

  ngOnInit() {
 }

  isAdmin() {
    return this.sessionService.isAdmin();
  }

  isUser() {
    return this.sessionService.isUser();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe();
    location.reload();
  }

  addFavorite() {
    var favorite: FavoriteModel = {
      productId: this.product.id,
      userId: this.sessionService.userId
    }
    this.favoriteService.addFavorite(favorite).subscribe();
  }

  addToCart() {
    var preorderModel: PreOrderSaveModel = {
      productId: this.product.id,
      userId: this.sessionService.userId
    }
    this.preOrderService.savePreOrder(preorderModel).subscribe();
  }

  removeFromCart() {
    var removeFromCartModel: RemoveFromCartModel = {
      productId: this.product.id,
      userId: this.sessionService.userId
    }
    this.preOrderService.removeFromCart(removeFromCartModel).subscribe(() => {
      window.location.reload();
    });
  }
}
