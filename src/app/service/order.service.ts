import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrderDTO } from '../Interface/IOrderDTO';
import { IOrderGetDTO } from '../Interface/IOrderGetDTO';
import { IOrderCostDTO } from '../Interface/IOrderCostDTO';
import { OrderStatus } from '../Enum/OrderStatus';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/order'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  addOrder(orderDTO: IOrderDTO): Observable<any> {
    const url = `${this.baseUrl}/Add`;
    return this.http
      .post<any>(url, orderDTO)
      .pipe(catchError(this.handleError<any>('addOrder')));
  }

  getAll(): Observable<IOrderGetDTO[]> {
    return this.http
      .get<IOrderGetDTO[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError<IOrderGetDTO[]>('getAll', [])));
  }

  getById(id: number): Observable<IOrderGetDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<IOrderGetDTO>(url)
      .pipe(catchError(this.handleError<IOrderGetDTO>('getById')));
  }

  assignDeliveryManToOrder(
    orderID: number,
    deliveryManID: number
  ): Observable<string> {
    const url = `${this.baseUrl}/AssignToDeliveryMan?orderID=${orderID}&deliveryManID=${deliveryManID}`;
    return this.http
      .post<string>(url, null) // Assuming no body is needed
      .pipe(catchError(this.handleError<string>('assignDeliveryManToOrder')));
  }

  getByStatus(status: OrderStatus): Observable<IOrderGetDTO[]> {
    const url = `${this.baseUrl}/GetByStatus?status=${status}`;
    return this.http
      .get<IOrderGetDTO[]>(url)
      .pipe(catchError(this.handleError<IOrderGetDTO[]>('getByStatus', [])));
  }

  getOrderTypes(): Observable<string[]> {
    const url = `${this.baseUrl}/OrderTypes`;
    return this.http
      .get<string[]>(url)
      .pipe(catchError(this.handleError<string[]>('getOrderTypes', [])));
  }

  getShippingTypes(): Observable<string[]> {
    const url = `${this.baseUrl}/ShippingTypes`;
    return this.http
      .get<string[]>(url)
      .pipe(catchError(this.handleError<string[]>('getShippingTypes', [])));
  }

  changeOrderStatus(status: OrderStatus, id: number): Observable<string> {
    const url = `${this.baseUrl}/ChangeOrderStatus?id=${id}`;
    return this.http
      .put<string>(url, { status })
      .pipe(catchError(this.handleError<string>('changeOrderStatus')));
  }

  editOrder(id: number, orderDTO: IOrderDTO): Observable<string> {
    const url = `${this.baseUrl}/Edit/${id}`;
    return this.http
      .put<string>(url, orderDTO)
      .pipe(catchError(this.handleError<string>('editOrder')));
  }

  deleteOrder(id: number): Observable<string> {
    const url = `${this.baseUrl}/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteOrder')));
  }

  calculateOrderCost(orderCostDTO: IOrderCostDTO): Observable<number> {
    const url = `${this.baseUrl}/OrderCost`;
    return this.http
      .post<number>(url, orderCostDTO)
      .pipe(catchError(this.handleError<number>('calculateOrderCost')));
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
