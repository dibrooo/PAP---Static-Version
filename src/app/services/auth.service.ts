import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:8085/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private cookieService: CookieService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.apiUrl + 'login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    this.storageService.clean();
    localStorage.removeItem('USER_KEY');
    sessionStorage.clear();
    this.cookieService.delete('SESSION', '/', 'localhost');
    this.cookieService.delete('remember-me', '/', 'localhost');
    return this.http.post(this.apiUrl + 'logout', {}, this.httpOptions);
  }
}
