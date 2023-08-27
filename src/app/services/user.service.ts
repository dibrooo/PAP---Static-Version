import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8085/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserFaltas(): Observable<any> {
    return this.http.get(API_URL + 'current-user/faltas', {
      withCredentials: true,
    });
  }
}
