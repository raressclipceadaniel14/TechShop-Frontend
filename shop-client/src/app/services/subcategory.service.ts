import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSubcategoriesByCategory(categoryId: number): Observable<CategoryModel[]> {
    const url = `${this.baseURL}/Product/get-subcategories?categoryId=${categoryId}`;
    return this.http.get<CategoryModel[]>(url);
  }
}