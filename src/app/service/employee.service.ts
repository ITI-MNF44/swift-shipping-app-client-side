import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployeeDTO } from '../Interface/IEmployeeDTO';
import { ILoginDTO } from '../Interface/ILoginDTO';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5000/api/employee'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  register(employeeDTO: IEmployeeDTO): Observable<string> {
    const url = `${this.baseUrl}/Register`;
    return this.http
      .post<string>(url, employeeDTO)
      .pipe(catchError(this.handleError<string>('register')));
  }

  login(loginDTO: ILoginDTO): Observable<any> {
    const url = `${this.baseUrl}/Login`;
    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('login')));
  }

  getAll(): Observable<IEmployeeDTO[]> {
    const url = `${this.baseUrl}`;
    return this.http
      .get<IEmployeeDTO[]>(url)
      .pipe(catchError(this.handleError<IEmployeeDTO[]>('getAll', [])));
  }

  getById(id: number): Observable<IEmployeeDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<IEmployeeDTO>(url)
      .pipe(catchError(this.handleError<IEmployeeDTO>('getById')));
  }

  updateEmployee(id: number, employee: IEmployeeDTO): Observable<string> {
    const url = `${this.baseUrl}/Update/${id}`;
    return this.http
      .put<string>(url, employee)
      .pipe(catchError(this.handleError<string>('updateEmployee')));
  }

  deleteEmployee(id: number): Observable<string> {
    const url = `${this.baseUrl}/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteEmployee')));
  }

  toggleActivityStatus(id: number): Observable<string> {
    const url = `${this.baseUrl}/ToggleActivityStatus/${id}`;
    return this.http
      .put<string>(url, null) // Assuming no body is needed
      .pipe(catchError(this.handleError<string>('toggleActivityStatus')));
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
