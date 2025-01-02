import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/RegisterModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(registerModel: RegisterModel) {
    const url = `${this.baseURL}/Auth/register`; 
    return this.http.post(url, registerModel);
  }
}