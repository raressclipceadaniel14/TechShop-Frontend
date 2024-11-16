import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/LoginRequest';
import { UserSession } from '../models/UserSession';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private ApiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<UserSession> {
    return this.http.post<UserSession>(
      `${this.ApiUrl}/Auth/login`,
      loginRequest
    );
  }
}