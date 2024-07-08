import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeightSettingDto } from '../Interface/IWeightSettingDto';

@Injectable({
  providedIn: 'root'
})
export class WeightSettingsService
{
  //Api url
  private baseUrl : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Get all weight settings
  getWeightSetting(): Observable<IWeightSettingDto> {
    return this.http
      .get<IWeightSettingDto>(`${this.baseUrl}/WeightSetting`)
      .pipe(
        catchError(this.handleError<IWeightSettingDto>('WeightSetting'))
      );
  }

  //Update
  editWeightsetting(settingDTO: IWeightSettingDto ): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/WeightSetting`, settingDTO)
      .pipe(catchError(this.handleError<any>('updateSetting')));
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
