import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProviderModel } from '../models/ProviderModel';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProviders(): Observable<ProviderModel[]> {
    const url = `${this.baseURL}/Provider/get-providers`;
    return this.http.get<ProviderModel[]>(url);
  }

  getProviderById(providerId: number): Observable<ProviderModel> {
    const url = `${this.baseURL}/Provider/get-provider-by-id?proproviderId=${providerId}`;
    return this.http.get<ProviderModel>(url);
  }
}