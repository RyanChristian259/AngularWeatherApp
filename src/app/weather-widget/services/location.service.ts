import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import {
  MAPQUEST_KEY,
  MAPQUEST_ROOT
} from '@app/keys/keys';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  // Get the user's location
  public getCurrentLocation(): Observable<any> {
    if (navigator.geolocation) {
      return new Observable(observer => {
        navigator.geolocation.getCurrentPosition(pos => {
          observer.next(pos);
        }),
          catchError(err => {
            console.error('Unable to get location - ', err);
            return throwError(err);
          });
      });
    } else {
      return throwError('Geolocation is not available.');
    }
  }

  // Get the city name of the user's location
  getLocationName(latitude: number, longitude: number): Observable<any> {
    const url = MAPQUEST_ROOT;
    const queryParams =
      '?key=' +
      MAPQUEST_KEY + '&location=' + latitude + ',' + longitude +
      '&includeRoadMetadata=true&includeNearestIntersection=true';

    return this.http.get(url + queryParams).pipe(
      map((location) => {
        return location;
      }),
      catchError(err => {
        console.error('Unable to get location - ', err);
        return throwError(err);
      })
    );
  }
}
