import { Component, OnInit } from '@angular/core';
import { WeatherService } from '@app/weather-widget/services/weather.service';
import { LocationService } from '@app/weather-widget/services/location.service';
import { WeatherData } from '@app/weather-widget/models/weather-data';
import { WEATHER_COLORS } from '@app/weather-widget/constants/color-constants';

// Enable use of Skycons javascript library
declare var Skycons: any;

export enum CurrentTempUnitEnum {
  FAHRENHEIT = 'fahrenheit',
  CELCIUS = 'celsius',
}

export enum CurrentSpeedUnitEnum {
  KPH = 'kph',
  MPH = 'mph',
}

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService, LocationService]
})
export class WeatherComponent implements OnInit {
  public currentSpeedUnit = CurrentSpeedUnitEnum.MPH;
  public currentTempUnit = CurrentTempUnitEnum.FAHRENHEIT;
  public currentLocation = '';
  public dataReceived = false;
  public weatherData: WeatherData = new WeatherData(null, null, null, null, null);
  private icons = new Skycons();
  private position: Position;

  constructor(private weatherService: WeatherService, private locationService: LocationService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  public toggleUnits(): void {
    this.toggleTempUnits();
    this.toggleSpeedUnits();
  }

  private setStyles(): Object {
    if (this.weatherData.icon) {
      this.icons.color = WEATHER_COLORS[this.weatherData.icon]['color'];
      return WEATHER_COLORS[this.weatherData.icon];
    } else {
      this.icons.color = WEATHER_COLORS['default']['color'];
      return WEATHER_COLORS['default'];
    }
  }

  private getCurrentLocation(): void {
    this.locationService.getCurrentLocation().subscribe(
      position => {
        this.position = position;
        this.getCurrentWeather();
        this.getLocationName();
      },
      err => console.error(err)
    );
  }

  private getLocationName(): void {
    this.locationService
      .getLocationName(
        this.position.coords.latitude,
        this.position.coords.longitude
      )
      .subscribe(location => {
        this.currentLocation =
          // Get city and state
          location['results'][0]['locations'][0]['adminArea5'] +
          ', ' +
          location['results'][0]['locations'][0]['adminArea3'];
      });
  }

  private getCurrentWeather(): void {
    this.weatherService
      .getCurrentWeather(
        this.position.coords.latitude,
        this.position.coords.longitude
      )
      .subscribe(
        weather => {
          this.weatherData.temp = weather['currently']['temperature'];
          this.weatherData.summary = weather['currently']['summary'];
          this.weatherData.wind = weather['currently']['windSpeed'];
          this.weatherData.humidity = weather['currently']['humidity'];
          this.weatherData.icon = weather['currently']['icon'];
          this.setIcon();
          this.dataReceived = true;
        },
        err => console.error(err)
      );
  }

  private toggleTempUnits() {
    if (this.currentTempUnit === CurrentTempUnitEnum.FAHRENHEIT) {
      this.currentTempUnit = CurrentTempUnitEnum.CELCIUS;
    } else {
      this.currentTempUnit = CurrentTempUnitEnum.FAHRENHEIT;
    }
  }

  private toggleSpeedUnits() {
    if (this.currentSpeedUnit === 'kph') {
      this.currentSpeedUnit = CurrentSpeedUnitEnum.MPH;
    } else {
      this.currentSpeedUnit = CurrentSpeedUnitEnum.KPH;
    }
  }

  private setIcon() {
    this.icons.add('icon', this.weatherData.icon);
    this.icons.play();
  }
}
