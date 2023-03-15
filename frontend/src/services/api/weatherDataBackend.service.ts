import { Weatherdata } from "@/model/Weatherdata.model";
import httpService from "@/services/http.service";

const parseWeatherData = (s: any) =>
  new Weatherdata(
    s.country,
    s.city,
    s.lat,
    s.lon,
    s.imageData,
    s.stationName,
    s.windSpeed,
    s.windGust,
    s.temp,
    s.feels_like,
    s.temp_min,
    s.temp_max,
    s.weatherName,
    s.weatherDescription,
    s.weatherIcon,
    s.timeStamp,
    s.likes,
    s.dislikes,
    s.id
  );

const fullURL = "http://localhost:3000/weatherdata";

export async function uploadWeatherData(
  inpoutWeatherdata: Weatherdata
): Promise<any> {
  const weatherdata = await httpService.post(`${fullURL}`, inpoutWeatherdata);
  return weatherdata;
}

export async function getWeatherDataAtRank(rank: number): Promise<Weatherdata> {
  const weatherdata = await httpService.get(
    `${fullURL}/rank/${rank}`,
    {},
    parseWeatherData
  );
  return weatherdata as Weatherdata;
}

export async function likeImage(id: number): Promise<boolean> {
  const weatherdata = await httpService.post(`${fullURL}/like/${id}`, {});
  return weatherdata as boolean;
}

export async function removelikeImage(id: number): Promise<boolean> {
  const weatherdata = await httpService.post(`${fullURL}/removelike/${id}`, {});
  return weatherdata as boolean;
}

export async function dislikeImage(id: number): Promise<boolean> {
  const weatherdata = await httpService.post(`${fullURL}/dislike/${id}`, {});
  return weatherdata as boolean;
}

export async function removedislikeImage(id: number): Promise<boolean> {
  const weatherdata = await httpService.post(
    `${fullURL}/removedislike/${id}`,
    {}
  );
  return weatherdata as boolean;
}
