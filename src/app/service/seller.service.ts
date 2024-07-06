import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginDTO } from '../Interface/ILoginDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  private apiUrl = environment.apiUrl; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  login(loginDTO: ILoginDTO): Observable<any> {
    const url = `${this.apiUrl}/seller/Login`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('login')));
  }

  addSeller(sellerDTO: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/seller/Add`, sellerDTO)
      .pipe(catchError(this.handleError<any>('addSeller')));
  }

  getSellerById(id: number): Observable<any> {
    const url = `${this.apiUrl}/seller/${id}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getSellerById')));
  }

  getAllSellers(): Observable<any[]> {
    const url = `${this.apiUrl}/seller/All`;

    return this.http
      .get<any[]>(url)
      .pipe(catchError(this.handleError<any[]>('getAllSellers', [])));
  }

  getSellerOrders(id: number): Observable<any[]> {
    const url = `${this.apiUrl}/seller/${id}/orders`;

    return this.http
      .get<any[]>(url)
      .pipe(catchError(this.handleError<any[]>('getSellerOrders', [])));
  }

  editSeller(id: number, sellerDTO: any): Observable<any> {
    const url = `${this.apiUrl}/seller/Edit/${id}`;

    return this.http
      .put<any>(url, sellerDTO)
      .pipe(catchError(this.handleError<any>('editSeller')));
  }

  deleteSeller(id: number): Observable<any> {
    const url = `${this.apiUrl}/seller/Delete/${id}`;

    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError<any>('deleteSeller')));
  }

  getOrdersStatusCount(status: string, sellerId: number): Observable<any> {
    const url = `${this.apiUrl}/seller/Count?status=${status}&sellerId=${sellerId}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getOrdersStatusCount')));
  }

  getAllOrdersStatusCount(sellerId: number): Observable<any> {
    const url = `${this.apiUrl}/seller/AllStatusCount/${sellerId}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getAllOrdersStatusCount')));
  }

  // getSellersOrdersByStatus(sellerId: number, status:number): Observable<any> {
  //   const url = `${this.apiUrl}/${sellerId}/orders/${status}`;

  //   return this.http
  //     .get<any>(url)
  //     .pipe(catchError(this.handleError<any>('getAllOrdersStatusCount')));
  // }

  getSellersOrdersByStatus(sellerId: number, status:number): Observable<any> {
    const url = `${this.apiUrl}/Seller/${sellerId}/orders/${status}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getAllOrdersStatusCount')));
  }

  // Generic error handler method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Optionally, you can log the error to remote logging infrastructure
      // and format the error message as needed
      return of(result as T); // Let the app keep running by returning an empty result
    };
  }
}
