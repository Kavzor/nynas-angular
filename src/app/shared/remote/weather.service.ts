import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdatableTable, WeatherData } from '../data';


const WEATHER_URL: string = "http://api.openweathermap.org/data/2.5/forecast?q=Nynashamn&APPID=5b755d33b1f3737e41eab07a7de9424e&lang=se";


@Injectable()
export class WeatherService {


  constructor(private http: HttpClient) { }

  refresh(table: UpdatableTable) {
    this.http.get(WEATHER_URL).subscribe( data => {
      var weatherResponse = this.parseWeather(data);
      table.updateWeather(weatherResponse);
    });
  }

  parseWeather(data: any): Array<WeatherData> {
    var weatherData = new Array<WeatherData>();
    var weatherList = data.list;

    for(let index = 0; index < 7; index++) {
      var time = weatherList[index].dt_txt;
      time = new Date(time).getHours() + ":00";
      if(time.length < 5) {
        time = 0 + time;
      }

      var wind = weatherList[index].wind.speed.toFixed(1);

      var temp = weatherList[index].main.temp;
      temp = Number(temp - 273.15).toFixed(1);
    
      var desc = weatherList[index].weather[0].description;
      desc = desc[0].toUpperCase() + desc.substr(1);

      weatherData.push({
        clock: time,
        wind: wind,
        tempature: temp,
        description: desc
      });
    }
    return weatherData;
  }
}






