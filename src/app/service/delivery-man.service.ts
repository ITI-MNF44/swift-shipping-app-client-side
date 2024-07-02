import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryManService {
  private apiUrl = 'https://your-api-base-url/api'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // POST: /api/DeliveryMan/Register
  registerDeliveryMan(deliveryManDTO: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/DeliveryMan/Register`, deliveryManDTO)
      .pipe(catchError(this.handleError));
  }

  // POST: /api/DeliveryMan/Login
  login(loginDTO: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/DeliveryMan/Login`, loginDTO)
      .pipe(catchError(this.handleError));
  }

  // POST: /api/DeliveryMan/AssignToRegion
  assignToRegion(deliveryManId: number, regionId: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/DeliveryMan/AssignToRegion`, {
        deliveryManId,
        regionId,
      })
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan/{id}/orders
  getDeliveryManOrders(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/DeliveryMan/${id}/orders`)
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan
  getAllDeliveryMen(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/DeliveryMan`)
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan/{id}
  getDeliveryManById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/DeliveryMan/${id}`)
      .pipe(catchError(this.handleError));
  }

  // PUT: /api/DeliveryMan/Update/{id}
  updateDeliveryMan(id: number, deliveryManDTO: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/DeliveryMan/Update/${id}`, deliveryManDTO)
      .pipe(catchError(this.handleError));
  }

  // DELETE: /api/DeliveryMan/Delete/{id}
  deleteDeliveryMan(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/DeliveryMan/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan/Count?status={status}&delivaryId={delivaryId}
  getOrderStatusCount(status: string, delivaryId: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/DeliveryMan/Count?status=${status}&delivaryId=${delivaryId}`
      )
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan/AllStatusCount/{delivaryId}
  getAllStatusCount(delivaryId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/DeliveryMan/AllStatusCount/${delivaryId}`)
      .pipe(catchError(this.handleError));
  }

  // Handle error method
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error;
  }
}
