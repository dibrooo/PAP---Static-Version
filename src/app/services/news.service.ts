import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { Injectable } from '@angular/core';
import { News } from '../shared/classes/new';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/news';
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.url + '/all').pipe(
      catchError((error: any) => {
        console.error('An error occurred while getting all news:', error);
        throw error;
      })
    );
  }

  getNewsById(id: Number): Observable<News> {
    return this.http.get<News>(this.url + `/${id}`).pipe(
      catchError((error: any) => {
        console.error('An error occurred while getting a new by id:', error);
        throw error;
      })
    );
  }
}
