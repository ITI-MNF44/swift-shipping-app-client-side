import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegionDTO } from '../Interface/IRegionDTO';
import { IRegionGetDTO } from '../Interface/IRegionGetDTO';
import { environment } from 'src/environments/environment';
import { IGovernmentWithRegionsDTO } from '../Interface/IGovernmentWithRegionsDTO';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addRegion(regionDTO: IRegionDTO): Observable<any> {
    const url = `${this.baseUrl}/region/Add`;
    return this.http
      .post<any>(url, regionDTO)
      .pipe(catchError(this.handleError<any>('addRegion')));
  }

  getAllRegions(): Observable<IRegionGetDTO[]> {
    return this.http
      .get<IRegionGetDTO[]>(`${this.baseUrl}/region/All`)
      .pipe(catchError(this.handleError<IRegionGetDTO[]>('getAllRegions', [])));
  }

  getRegionById(id: number): Observable<IRegionGetDTO> {
    const url = `${this.baseUrl}/region/${id}`;
    return this.http
      .get<IRegionGetDTO>(url)
      .pipe(catchError(this.handleError<IRegionGetDTO>('getRegionById')));
  }

  editRegion(id: number, regionDTO: IRegionDTO): Observable<any> {
    const url = `${this.baseUrl}/region/Edit/${id}`;
    return this.http
      .put<string>(url, regionDTO)
      .pipe(catchError(this.handleError<string>('editRegion')));
  }

  deleteRegion(id: number): Observable<any> {
    const url = `${this.baseUrl}/region/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteRegion')));
  }

  GetRegionsByGovernrmnt(governmentId: number): Observable<IRegionGetDTO[]> {
    const url = `${this.baseUrl}/Region/Government/${governmentId}`;

    return this.http
      .get<IRegionGetDTO[]>(url)
      .pipe(
        catchError(this.handleError<IRegionGetDTO[]>('calculateOrderCost'))
      );
  }

  // get all governments with their regions
  getAllGovernmentsWithRegions(): Observable<IGovernmentWithRegionsDTO[]> {
    return this.http
      .get<IGovernmentWithRegionsDTO[]>(
        `${this.baseUrl}/Government/GetAllGovernmentsWithRegions`
      )
      .pipe(
        catchError(
          this.handleError<IGovernmentWithRegionsDTO[]>(
            'getAllGovernmentsWithRegions',
            []
          )
        )
      );
  }

  // Error handler method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
