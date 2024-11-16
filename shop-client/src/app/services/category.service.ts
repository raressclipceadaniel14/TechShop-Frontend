import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryModel[]> {
    const url = `${this.baseURL}/Product/get-categories`;
    return this.http.get<CategoryModel[]>(url);
  }
}