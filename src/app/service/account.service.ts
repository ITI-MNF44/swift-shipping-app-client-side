import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginWithUserNameDTO } from '../Interface/ILoginWithUserNameDTO';
import { environment } from 'src/environments/environment';
import { ILoginDataDTO } from '../Interface/IloginDataDTO';
import { ILoginWithEmailDTO } from '../Interface/ILoginWithEmailDTO';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/account/CheckEmail?email=${email}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('checkEmail')));
  }

  checkUsername(username: string): Observable<any> {
    const url = `${this.apiUrl}/account/CheckUsername?username=${username}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('checkUsername')));
  }

  loginWithUserName(
    loginDTO: ILoginWithUserNameDTO
  ): Observable<ILoginDataDTO> {
    const url = `${this.apiUrl}/account/LoginWithUserName`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('loginWithUserName')));
  }

  loginWithEmail(loginDTO: ILoginWithEmailDTO): Observable<ILoginDataDTO> {
    const url = `${this.apiUrl}/account/LoginWithEmail`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('loginWithEmail')));
  }

  logOut(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/account/LogOut`,null)
      .pipe(catchError(this.handleError<any>('logOut')));
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
