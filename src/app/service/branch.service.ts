import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBranchGetDTO } from '../Interface/IBranchGetDTO';
import { IBranchDTO } from '../Interface/IBranchDto';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = 'http://localhost:5000/api/branch'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getAllBranches(): Observable<IBranchGetDTO[]> {
    return this.http
      .get<IBranchGetDTO[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.handleError<IBranchGetDTO[]>('getAllBranches', []))
      );
  }

  addBranch(branchDTO: IBranchDTO): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/Add`, branchDTO)
      .pipe(catchError(this.handleError<string>('addBranch')));
  }

  getById(id: number): Observable<IBranchGetDTO> {
    return this.http
      .get<IBranchGetDTO>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<IBranchGetDTO>('getById')));
  }

  editBranch(id: number, branchDTO: IBranchDTO): Observable<string> {
    return this.http
      .put<string>(`${this.baseUrl}/Edit/${id}`, branchDTO)
      .pipe(catchError(this.handleError<string>('editBranch')));
  }

  deleteBranch(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/Delete/${id}`)
      .pipe(catchError(this.handleError<string>('deleteBranch')));
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