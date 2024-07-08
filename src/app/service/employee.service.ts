import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEmployeeDTO } from 'src/app/Interface/IEmployeeDTO';
import { ILoginDTO } from 'src/app/Interface/ILoginDTO';
import { IEmployeeGetDTO } from '../Interface/IEmployeeGetDTO';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(employeeDTO: IEmployeeDTO): Observable<any> {
    const url = `${this.baseUrl}/Employee/Add`;

    return this.http
      .post<any>(url, employeeDTO)
      .pipe(catchError(this.handleError<any>('register')));
  }

  login(loginDTO: ILoginDTO): Observable<any> {
    const url = `${this.baseUrl}/Employee/Login`;
    return this.http
      .post<any>(url, loginDTO)
      .pipe(catchError(this.handleError<any>('login')));
  }

  getAll(): Observable<IEmployeeDTO[]> {
    const url = `${this.baseUrl}/Employee/all`;

    console.log('Request URL:', url);

    return this.http.get<IEmployeeGetDTO[]>(url).pipe(
      map((employees) =>
        employees.map((employee) => ({
          id: employee.id,
          name: employee.name,
          address: employee.address,
          email: employee.email,
          userName: employee.userName,
          password: employee.password,
          phoneNumber: employee.phoneNumber,
          branchId: employee.branchName,
          isActive: employee.isActive ?? false,
          isDeleted: employee.isDeleted ?? false,
        }))
      ),
      map((employees) => employees.filter((employee) => !employee.isDeleted)),
      catchError(this.handleError<IEmployeeDTO[]>('getAll', []))
    );
  }

  getById(id: number): Observable<IEmployeeGetDTO> {
    const url = `${this.baseUrl}/Employee/${id}`;
    return this.http
      .get<IEmployeeGetDTO>(url)
      .pipe(catchError(this.handleError<IEmployeeGetDTO>('getById')));
  }

  updateEmployee(id: number, employee: IEmployeeDTO): Observable<any> {
    const url = `${this.baseUrl}/Employee/Update/${id}`;
    return this.http
      .put<any>(url, employee)
      .pipe(catchError(this.handleError<any>('updateEmployee')));
  }

  deleteEmployee(id: number): Observable<any> {
    const url = `${this.baseUrl}/Employee/Delete/${id}`;
    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError<any>('deleteEmployee')));
  }

  toggleActivityStatus(id: number): Observable<any> {
    const url = `${this.baseUrl}/Employee/ToggleActivityStatus/${id}`;
    return this.http
      .put<any>(url, null) 
      .pipe(catchError(this.handleError<any>('toggleActivityStatus')));
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
