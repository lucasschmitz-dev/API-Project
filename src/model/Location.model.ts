export class LocationData {
  country: string;
  name: string;
  lat: number;
  lon: number;

  constructor(country: string, name: string, lat: number, lon: number) {
    this.country = country;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
  }
}
