import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderStatus } from '../Enum/OrderStatus';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  private baseUrl = 'http://localhost:5000/api/orderstatus'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getOrderStatusCount(status: OrderStatus): Observable<number> {
    const url = `${this.baseUrl}/getCount?status=${status}`;
    return this.http
      .get<number>(url)
      .pipe(catchError(this.handleError<number>('getOrderStatusCount')));
  }

  getAllStatusCount(): Observable<any> {
    const url = `${this.baseUrl}/GetAllStatusCount`;
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
