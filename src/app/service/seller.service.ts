import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginDTO } from '../Interface/ILoginDTO';
import { environment } from 'src/environments/environment';
import { ISellerGetDTO } from '../Interface/ISellerGetDTO';
import { ISellerDTO } from '../Interface/ISellerDTO';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  login(loginDTO: ILoginDTO): Observable<any> {
    const url = `${this.apiUrl}/seller/Login`;

    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('login')));
  }

  addSeller(sellerDTO: ISellerDTO): Observable<ISellerDTO> {
    return this.http
      .post<ISellerDTO>(`${this.apiUrl}/seller/Add`, sellerDTO)
      .pipe(catchError(this.handleError<ISellerDTO>('addSeller')));
  }

  getSellerById(id: number): Observable<ISellerGetDTO> {
    const url = `${this.apiUrl}/seller/${id}`;

    return this.http
      .get<ISellerGetDTO>(url)
      .pipe(catchError(this.handleError<ISellerGetDTO>('getSellerById')));
  }

  getAllSellers(): Observable<ISellerGetDTO[]> {
    const url = `${this.apiUrl}/seller/All`;

    return this.http
      .get<ISellerGetDTO[]>(url)
      .pipe(catchError(this.handleError<ISellerGetDTO[]>('getAllSellers', [])));
  }

  getSellerOrders(id: number): Observable<any[]> {
    const url = `${this.apiUrl}/seller/${id}/orders`;

    return this.http
      .get<any[]>(url)
      .pipe(catchError(this.handleError<any[]>('getSellerOrders', [])));
  }

  editSeller(id: number, sellerDTO: ISellerDTO): Observable<ISellerDTO> {
    const url = `${this.apiUrl}/seller/Edit/${id}`;

    return this.http
      .put<ISellerDTO>(url, sellerDTO)
      .pipe(catchError(this.handleError<ISellerDTO>('editSeller')));
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
