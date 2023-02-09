import { WeatherData } from "@/model/Weather.model";
import httpService from "@/services/http.service";

const parseWeather = (s: any) =>
  new WeatherData(s.name, s.wind, s.main, s.weather);

const fullURL = "https://api.openweathermap.org/data/2.5/weather";
const APIkey = "0d7433cd987a7d0b91d2be6cf123bb12"; // https://home.openweathermap.org/api_keys

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const weather = await httpService.get(
    `${fullURL}`,
    {
      lat: lat,
      lon: lon,
      appid: APIkey,
      units: "metric",
    },
    parseWeather
  );
  return weather as WeatherData;
}
