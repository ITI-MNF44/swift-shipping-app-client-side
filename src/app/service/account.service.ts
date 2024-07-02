import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'https://your-api-url';

  constructor(private http: HttpClient) {}



  checkEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/CheckEmail?email=${email}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('checkEmail')));
  }

  checkUsername(username: string): Observable<any> {
    const url = `${this.apiUrl}/CheckUsername?username=${username}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('checkUsername')));
  }

  loginWithUserName(loginDTO: any): Observable<any> {
    const url = `${this.apiUrl}/LoginWithUserName`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('loginWithUserName')));
  }

  loginWithEmail(loginDTO: any): Observable<any> {
    const url = `${this.apiUrl}/LoginWithEmail`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('loginWithEmail')));
  }



  // Error handler method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // You can log the error to remote logging infrastructure if needed
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
