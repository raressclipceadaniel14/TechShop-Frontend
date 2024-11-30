import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/ProductModel';
import { FavoriteModel } from '../models/FavoriteModel';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFavoriteByUser(userId: number): Observable<ProductModel[]> {
    const url = `${this.baseURL}/Favorite/get-favorite-by-user?userId=${userId}`;
    return this.http.get<ProductModel[]>(url);
  }

  addFavorite(favorite: FavoriteModel) {
    const url = `${this.baseURL}/Favorite/save-favorite`;
    return this.http.post(url, favorite);
  }
}