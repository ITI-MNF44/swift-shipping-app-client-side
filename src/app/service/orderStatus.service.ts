import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderStatus } from '../Enum/OrderStatus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderStatuses(): Observable<{ [key: string]: string }> {
    const url = `${this.baseUrl}/OrderStatus/All`;

    return this.http
      .get<{ [key: string]: string }>(`${url}`)
      .pipe(
        catchError(
          this.handleError<{ [key: string]: string }>('getOrderStatuses')
        )
      );
  }

  getOrderStatusCount(status: OrderStatus): Observable<number> {
    const url = `${this.baseUrl}/OrderStatus/getCount?status=${status}`;

    return this.http
      .get<number>(url)
      .pipe(catchError(this.handleError<number>('getOrderStatusCount')));
  }

  getAllStatusCount(): Observable<any> {
    const url = `${this.baseUrl}/OrderStatus/GetAllStatusCount`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getAllStatusCount')));
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
