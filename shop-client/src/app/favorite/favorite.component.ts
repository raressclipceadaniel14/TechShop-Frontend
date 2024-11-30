import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { FavoriteService } from '../services/favorite.service';
import { ProductModel } from '../models/ProductModel';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  wishlist: ProductModel[] = [];

  constructor(
    public sessionService: SessionService,
    public favoriteService: FavoriteService
  ) {
  }

  ngOnInit() {
    this.getFavorite(this.sessionService.userId);
  }

  getFavorite(userId: number) {
    this.favoriteService.getFavoriteByUser(userId).subscribe((products: ProductModel[]) => {
      this.wishlist = products;
    });
  }
}
