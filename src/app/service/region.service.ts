import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegionDTO } from '../Interface/IRegionDTO';
import { IRegionGetDTO } from '../Interface/IRegionGetDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
 private baseUrl = environment.apiUrl; // Adjust the base URL as necessary

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

  editRegion(id: number, regionDTO: IRegionDTO): Observable<string> {
    const url = `${this.baseUrl}/region/Edit/${id}`;
    return this.http
      .put<string>(url, regionDTO)
      .pipe(catchError(this.handleError<string>('editRegion')));
  }

  deleteRegion(id: number): Observable<string> {
    const url = `${this.baseUrl}/region/Delete/${id}`;
    return this.http
      .delete<string>(url)
      .pipe(catchError(this.handleError<string>('deleteRegion')));
  }

  GetRegionsByGovernrmnt(governmentId: number): Observable<IRegionGetDTO[]> {
    const url = `${this.baseUrl}/Region/Government/${governmentId}`;

    return this.http.get<IRegionGetDTO[]>(url)
      .pipe(catchError(this.handleError<IRegionGetDTO[]>('calculateOrderCost')));
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
