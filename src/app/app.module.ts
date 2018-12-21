import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from '@app/weather-widget/component/weather.component';

import { SpeedUnitPipe } from '@app/weather-widget/pipes/speed-unit.pipe';
import { TempUnitPipe } from '@app/weather-widget/pipes/temp-unit.pipe';

@NgModule({
    imports: [BrowserModule, HttpClientModule, HttpClientJsonpModule],
    declarations: [AppComponent, WeatherComponent, SpeedUnitPipe, TempUnitPipe],
    bootstrap: [AppComponent]
})

export class AppModule { }
