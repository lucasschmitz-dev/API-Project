import type { Weatherdata } from "@/model/Weatherdata.model";
import httpService from "@/services/http.service";

const fullURL = "http://localhost:3000/weatherdata";

export async function uploadWeatherData(
  inpoutWeatherdata: Weatherdata
): Promise<any> {
  const weatherdata = await httpService.post(`${fullURL}`, inpoutWeatherdata);
  return weatherdata;
}
