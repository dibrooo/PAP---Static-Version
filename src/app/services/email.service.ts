import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email/send`;

  constructor(private http: HttpClient) {}

  sendEmail(name: string, subject: string, body: string): Observable<any> {
    const emailRequest = {
      name: name,
      subject: subject,
      body: body,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as const, // Parse response as text
    };

    return this.http.post(this.apiUrl, emailRequest, httpOptions).pipe(
      catchError((error) => {
        console.error('An error occurred while sending the email:', error);
        throw error;
      })
    );
  }
}
