import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FORECAST_KEY, FORECAST_ROOT } from '@app/keys/keys';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(latitude: number, longitude: number): Observable<any> {
    const url = FORECAST_ROOT + FORECAST_KEY + '/' + latitude + ',' + longitude;
    const queryParams = '?callback=JSONP_CALLBACK';
      return this.http.jsonp(url + queryParams, 'callback').pipe(
      map(data => data),
      catchError(err => {
        console.error('Unable to get weather data - ', err);
        return Observable.throw(err.json());
      })
    );
  }
}
