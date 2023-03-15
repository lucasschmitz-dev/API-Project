export class Weatherdata {
  country: string;
  city: string;
  lat: number;
  lon: number;
  imageData: string;
  stationName: string;
  windSpeed: number;
  windGust: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weatherName: string;
  weatherDescription: string;
  weatherIcon: string;
  timeStamp: Date;
  likes?: number;
  dislikes?: number;
  id?: number;

  constructor(
    country: string,
    city: string,
    lat: number,
    lon: number,
    imageData: string,
    stationName: string,
    windSpeed: number,
    windGust: number,
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    weatherName: string,
    weatherDescription: string,
    weatherIcon: string,
    timeStamp: Date,
    likes?: number,
    dislikes?: number,
    id?: number
  ) {
    this.country = country;
    this.city = city;
    this.lat = lat;
    this.lon = lon;
    this.imageData = imageData;
    this.stationName = stationName;
    this.windSpeed = windSpeed;
    this.windGust = windGust;
    this.temp = temp;
    this.feels_like = feels_like;
    this.temp_min = temp_min;
    this.temp_max = temp_max;
    this.weatherName = weatherName;
    this.weatherDescription = weatherDescription;
    this.weatherIcon = weatherIcon;
    this.timeStamp = timeStamp;
    if (likes) {
      this.likes = likes;
    }
    if (dislikes) {
      this.dislikes = dislikes;
    }
    if (id) {
      this.id = id;
    }
  }
}
