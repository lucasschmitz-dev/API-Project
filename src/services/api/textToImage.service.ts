import { ImageData } from "@/model/ImageB64.model";
import httpService from "@/services/http.service";

const parseImage = (s: any) => new ImageData(s.data);

const fullURL = "https://api.openai.com/v1/images/generations";
const APIkey = import.meta.env.VITE_OPENAI_API_KEY; // https://platform.openai.com/account/api-keys

const headers: { [headerfield: string]: string } = {
  Authorization: "Bearer " + APIkey,
};

export async function createImage(prompt: string): Promise<ImageData> {
  const image = await httpService.post(
    `${fullURL}`,
    { prompt: prompt, n: 1, size: "1024x1024", response_format: "b64_json" },
    headers,
    parseImage
  );
  return image as ImageData;
}
