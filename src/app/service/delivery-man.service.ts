import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../Enum/OrderStatus';
import { IOrderGetDTO } from '../Interface/IOrderGetDTO';
import { IDeliveryManGetDTO } from '../Interface/IDeliveryManGetDTO';
import { IDeliveryManDTO } from '../Interface/IDeliveryManDTO';

@Injectable({
  providedIn: 'root',
})
export class DeliveryManService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private ordersSource = new BehaviorSubject<IOrderGetDTO[]>([]);
  DeliveryManOrders = this.ordersSource.asObservable();

  setOrders(orders: IOrderGetDTO[]) {
    this.ordersSource.next(orders);
  }


  // POST: /api/DeliveryMan/Register
  registerDeliveryMan(deliveryManDTO: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/DeliveryMan/Add`, deliveryManDTO)
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
  getDeliveryManOrders(
    id: number,
    status?: OrderStatus
  ): Observable<IOrderGetDTO[]> {
    let params = new HttpParams();

    if (status !== undefined && status !== null) {
      params = params.set('status', status.toString());
    }

    return this.http.get<IOrderGetDTO[]>(
      `${this.apiUrl}/DeliveryMan/${id}/orders`,
      {
        params,
      }
    );
  }

  // GET: /api/DeliveryMan/All
  getAllDeliveryMen(): Observable<IDeliveryManGetDTO[]> {
    return this.http
      .get<IDeliveryManGetDTO[]>(`${this.apiUrl}/DeliveryMan/All`)
      .pipe(catchError(this.handleError));
  }

  // GET: /api/DeliveryMan/{id}
  getDeliveryManById(id: number): Observable<IDeliveryManGetDTO> {
    return this.http
      .get<IDeliveryManGetDTO>(`${this.apiUrl}/DeliveryMan/${id}`)
      .pipe(catchError(this.handleError));
  }

  // PUT: /api/DeliveryMan/Update/{id}
  updateDeliveryMan(id: number, deliveryManDTO: IDeliveryManDTO): Observable<IDeliveryManDTO> {
    return this.http
      .put<IDeliveryManDTO>(`${this.apiUrl}/DeliveryMan/Update/${id}`, deliveryManDTO)
      .pipe(catchError(this.handleError));
  }

  // DELETE: /api/DeliveryMan/Delete/{id}
  deleteDeliveryMan(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/DeliveryMan/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  assignRegions(deliveryManDTO: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/DeliveryMan/AssignRegions`, deliveryManDTO)
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
