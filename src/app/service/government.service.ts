import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGovernmentDTO } from '../Interface/IGovernmentDTO';
import { IGovernmentGetDTO } from '../Interface/IGovernmentGetDTO';
import { BASE_URL } from '../constants';


@Injectable({
  providedIn: 'root',
})
export class GovernmentService {
  private baseUrl = `${BASE_URL}/Government`; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getAll(): Observable<IGovernmentGetDTO[]> {
    return this.http
      .get<IGovernmentGetDTO[]>(`${this.baseUrl}/All`)
      .pipe(catchError(this.handleError<IGovernmentGetDTO[]>('getAll', [])));
  }

  addGovernment(name: string): Observable<any> {
    const url = `${this.baseUrl}/Add`;
    return this.http
      .post<any>(url, { name })
      .pipe(catchError(this.handleError<any>('addGovernment')));
  }

  getById(id: number): Observable<IGovernmentGetDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<IGovernmentGetDTO>(url)
      .pipe(catchError(this.handleError<IGovernmentGetDTO>('getById')));
  }

  editGovernment(
    id: number,
    IGovernmentDTO: IGovernmentDTO
  ): Observable<string> {
    const url = `${this.baseUrl}/Edit/${id}`;
    return this.http
      .put<string>(url, IGovernmentDTO)
      .pipe(catchError(this.handleError<string>('editGovernment')));
  }

  deleteGovernment(id: number): Observable<string> {
    const url = `${this.baseUrl}/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteGovernment')));
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
