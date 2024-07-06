import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRolePermissions } from '../Interface/IRolePermissions';
import { IPermissionDTO } from '../Interface/IPermissionDTO';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = 'http://localhost:5168/api/role'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getPermissionsByRole(role: string): Observable<IRolePermissions[]> {
    const url = `${this.baseUrl}/${role}`;
    return this.http
      .get<IRolePermissions[]>(url)
      .pipe(
        catchError(
          this.handleError<IRolePermissions[]>('getPermissionsByRole', [])
        )
      );
  }

  updatePermissionsByRole(
    role: string,
    permissionsDTOList: IPermissionDTO[]
  ): Observable<any> {
    const url = `${this.baseUrl}/${role}`;
    return this.http
      .put<any>(url, permissionsDTOList)
      .pipe(catchError(this.handleError<any>('updatePermissionsByRole')));
  }

  getRole(role: string): Observable<any> {
    const url = `${this.baseUrl}/Get/${role}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getRole')));
  }

  updateRole(role: string, updatedRole: string): Observable<any> {
    const url = `${this.baseUrl}/Update/${role}`;
    return this.http
      .put<any>(url, { updatedRole })
      .pipe(catchError(this.handleError<any>('updateRole')));
  }

  roleExists(role: string): Observable<boolean> {
    const url = `${this.baseUrl}/Exist?role=${role}`;
    return this.http
      .get<boolean>(url)
      .pipe(catchError(this.handleError<boolean>('roleExists')));
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
