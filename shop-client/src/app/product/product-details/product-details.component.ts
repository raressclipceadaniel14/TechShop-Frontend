import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/ProductModel';
import { FavoriteModel } from '../../models/FavoriteModel';
import { PreOrderSaveModel } from '../../models/PreOrderSaveModel';
import { SessionService } from '../../services/session.service';
import { FavoriteService } from '../../services/favorite.service';
import { PreOrderService } from '../../services/preorder.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute, public notificationService: NotificationService, private productService: ProductService, private sessionService: SessionService, private favoriteService: FavoriteService, private preOrderService: PreOrderService) {}
  productDetalis: ProductModel;

  ngOnInit() {
    const productId = this.route.snapshot.params['productId'];
    this.getProductDetails(productId);
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((productDetails) => {
      this.productDetalis = productDetails;
    })
  }

  addFavorite() {
    const favorite = {
      productId: this.productDetalis.id,
      userId: this.sessionService.userId,
    };

    this.favoriteService.addFavorite(favorite).subscribe(() => {
      this.notificationService.showNotification('Added to favorites successfully!');
    });
  }

  addToCart() {
    const preorderModel = {
      productId: this.productDetalis.id,
      userId: this.sessionService.userId,
    };

    this.preOrderService.savePreOrder(preorderModel).subscribe(() => {
      this.notificationService.showNotification('Added to cart successfully!');
    });
  }
}