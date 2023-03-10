import { LocationData } from "@/model/Location.model";
import httpService from "@/services/http.service";

const parseLocation = (s: any) =>
  new LocationData(s.country, s.name, s.lat, s.lon);

const fullURL = "https://api.openweathermap.org/geo/1.0/direct";
const APIkey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // https://home.openweathermap.org/api_keys

export async function getLocationByName(
  city: string,
  limit: number
): Promise<LocationData> {
  const location = await httpService.get(
    `${fullURL}`,
    { q: city, limit: limit, appid: APIkey },
    parseLocation
  );
  return location as LocationData;
}
