import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FORECAST_KEY, FORECAST_ROOT } from '@app/keys/keys';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  /**
   * Get weather for user's location with latitude and longitude values.
   * Note that JSONP is not normally used to get data when CORS issues are
   * present. It is used here because this is a front end sample project.
   * Normally this HTTP call would be handled by a proper back end.
   * @param latitude - Numerical value from the location service
   * @param longitude - Numerical value from the location service
   */
  public getCurrentWeather(latitude: number, longitude: number): Observable<any> {
    const url = FORECAST_ROOT + FORECAST_KEY + '/' + latitude + ',' + longitude;
    const queryParams = '?callback=JSONP_CALLBACK';
      return this.http.jsonp(url + queryParams, 'callback').pipe(
      map(data => data),
      catchError(err => {
        console.error('Unable to get weather data - ', err);
        return throwError(err.json());
      })
    );
  }
}
