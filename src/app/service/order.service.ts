import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IOrderDTO } from '../Interface/IOrderDTO';
import { IOrderGetDTO } from '../Interface/IOrderGetDTO';
import { IOrderCostDTO } from '../Interface/IOrderCostDTO';
import { OrderStatus } from '../Enum/OrderStatus';
import { environment } from 'src/environments/environment';
import { IPaymentTypeDTO } from '../Interface/IPaymentTypeDTO';
import { IOrderTypeDTO } from '../Interface/IOrderTypeDTO';
import { IShippingTypeDto } from '../Interface/IShippingTypeDto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addOrder(orderDTO: IOrderDTO): Observable<any> {
    const url = `${this.baseUrl}/order/Add`;
    return this.http
      .post<any>(url, orderDTO)
      .pipe(catchError(this.handleError<any>('addOrder')));
  }

  getAll(): Observable<IOrderGetDTO[]> {
    return this.http
      .get<IOrderGetDTO[]>(`${this.baseUrl}/order/All`)
      .pipe(catchError(this.handleError<IOrderGetDTO[]>('getAll', [])));
  }

  getById(id: number): Observable<IOrderGetDTO> {
    const url = `${this.baseUrl}/order/${id}`;
    return this.http
      .get<IOrderGetDTO>(url)
      .pipe(catchError(this.handleError<IOrderGetDTO>('getById')));
  }

  assignDeliveryManToOrder(
    orderID: number,
    deliveryManID: number
  ): Observable<any> {
    const url = `${this.baseUrl}/Order/AssignToDeliveryMan?orderID=${orderID}&deliveryManID=${deliveryManID}`;
    return this.http
      .post<any>(url, null)
      .pipe(catchError(this.handleError<any>('assignDeliveryManToOrder')));
  }

  getByStatus(status: OrderStatus): Observable<IOrderGetDTO[]> {
    const url = `${this.baseUrl}/order/GetByStatus?status=${status}`;
    return this.http
      .get<IOrderGetDTO[]>(url)
      .pipe(catchError(this.handleError<IOrderGetDTO[]>('getByStatus', [])));
  }

  getOrderTypes(): Observable<IOrderTypeDTO[]> {
    const url = `${this.baseUrl}/order/OrderTypes`;
    return this.http
      .get<IOrderTypeDTO[]>(url)
      .pipe(catchError(this.handleError<IOrderTypeDTO[]>('getOrderTypes', [])));
  }

  getShippingTypes(): Observable<IShippingTypeDto[]> {
    const url = `${this.baseUrl}/order/ShippingTypes`;
    return this.http.get<IShippingTypeDto[]>(url)
      .pipe(catchError(this.handleError<IShippingTypeDto[]>('getShippingTypes', [])));
  }

  getPaymentTypes():Observable<IPaymentTypeDTO[]>{
    const url = `${this.baseUrl}/order/PaymentTypes`;
    return this.http.get<IPaymentTypeDTO[]>(url)
      .pipe(catchError(this.handleError<IPaymentTypeDTO[]>('getPaymentTypes', [])));
  }

  changeOrderStatus(newStatus: OrderStatus, id: number): Observable<any> {
    const url = `${this.baseUrl}/Order/ChangeOrderStatus/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = newStatus;

    return this.http.put(url, requestBody, { headers, responseType: 'text' }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Error occurred while changing order status:', error);
        throw error;
      })
    );
  }


  editOrder(id: number, orderDTO: IOrderDTO): Observable<string> {
    const url = `${this.baseUrl}/order/Edit/${id}`;
    return this.http
      .put<string>(url, orderDTO)
      .pipe(catchError(this.handleError<string>('editOrder')));
  }

  deleteOrder(id: number): Observable<string> {
    const url = `${this.baseUrl}/order/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteOrder')));
  }

  calculateOrderCost(orderCostDTO: IOrderCostDTO): Observable<number> {
    const url = `${this.baseUrl}/order/OrderCost`;
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
