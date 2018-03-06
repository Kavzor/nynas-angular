export interface WeatherData {
  clock: string;
  wind: string;
  tempature: string;
  description: string;
}

export interface UpdatableTable {
  updateWeather(data: Array<WeatherData>);
  updateTrain(data: Array<any>);
}