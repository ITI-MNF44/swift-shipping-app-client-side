import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGovernmentDTO } from '../Interface/IGovernmentDTO';
import { IGovernmentGetDTO } from '../Interface/IGovernmentGetDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GovernmentService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IGovernmentGetDTO[]> {
    return this.http
      .get<IGovernmentGetDTO[]>(`${this.baseUrl}/Government/All`)
      .pipe(catchError(this.handleError<IGovernmentGetDTO[]>('getAll', [])));
  }

  addGovernment(name: string): Observable<any> {
    const url = `${this.baseUrl}/government/Add`;
    return this.http
      .post<any>(`${url}?name=${name}`, null)
      .pipe(catchError(this.handleError<any>('addGovernment')));
  }

  getById(id: number): Observable<IGovernmentGetDTO> {
    const url = `${this.baseUrl}/government/${id}`;
    return this.http
      .get<IGovernmentGetDTO>(url)
      .pipe(catchError(this.handleError<IGovernmentGetDTO>('getById')));
  }

  editGovernment(
    id: number,
    IGovernmentDTO: IGovernmentDTO
  ): Observable<string> {
    const url = `${this.baseUrl}/government/Edit/${id}`;
    return this.http
      .put<any>(url, IGovernmentDTO)
      .pipe(catchError(this.handleError<any>('editGovernment')));
  }

  deleteGovernment(id: number): Observable<any> {
    const url = `${this.baseUrl}/Government/Delete/${id}`;
    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError<any>('deleteGovernment')));
  }

  toggleActivityStatus(id: number): Observable<any> {
    const url = `${this.baseUrl}/Government/ToggleActivityStatus/${id}`;
    return this.http.put(url, null);
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
