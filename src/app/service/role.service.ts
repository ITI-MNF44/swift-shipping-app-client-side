import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRolePermissions } from '../Interface/IRolePermissions';
import { IPermissionDTO } from '../Interface/IPermissionDTO';
import { Department } from '../Enum/Department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPermissionsByRole(role: string): Observable<IRolePermissions[]> {
    const url = `${this.baseUrl}/role/${role}`;
    return this.http
      .get<IRolePermissions[]>(url)
      .pipe(
        catchError(
          this.handleError<IRolePermissions[]>('getPermissionsByRole', [])
        )
      );
  }

  getPermissionsByRoleAndDept(
    role: string,
    dept: Department
  ): Observable<IRolePermissions> {
    const url = `${this.baseUrl}/role/department?role=${role}&department=${dept}`;
    return this.http
      .get<IRolePermissions>(url)
      .pipe(
        catchError(
          this.handleError<IRolePermissions>('GetDepartmentPermissionsByRole')
        )
      );
  }

  updatePermissionsByRole(
    role: string,
    permissionsDTOList: IRolePermissions[]
  ): Observable<any> {
    const url = `${this.baseUrl}/role/${role}`;
    return this.http
      .put<any>(url, permissionsDTOList)
      .pipe(catchError(this.handleError<any>('updatePermissionsByRole')));
  }

  getRole(role: string): Observable<any> {
    const url = `${this.baseUrl}/role/Get/${role}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getRole')));
  }

  updateRole(role: string, updatedRole: string): Observable<any> {
    const url = `${this.baseUrl}/role/Update/${role}`;
    return this.http
      .put<any>(url, { updatedRole })
      .pipe(catchError(this.handleError<any>('updateRole')));
  }

  roleExists(role: string): Observable<boolean> {
    const url = `${this.baseUrl}/role/Exist?role=${role}`;
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
