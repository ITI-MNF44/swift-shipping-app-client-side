import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginWithUserNameDTO } from '../Interface/ILoginWithUserNameDTO';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://your-api-base-url'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  login(loginDTO: ILoginWithUserNameDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, loginDTO).pipe(
      catchError(this.handleError<any>('loginWithUserName')) 
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // You can log the error to remote logging infrastructure if needed
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}