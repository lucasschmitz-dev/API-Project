import type { Weatherdata } from "@/model/Weatherdata.model";

export function downloadImage(weatherData: Weatherdata) {
  const filename =
    weatherData.city +
    weatherData.country +
    new Date(weatherData.timeStamp).toLocaleTimeString("de-DE", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }) +
    ".png";
  const uri = "data:image/png;base64," + weatherData.imageData;
  const link = document.createElement("a");
  if (typeof link.download === "string") {
    document.body.appendChild(link);
    link.download = filename;
    link.href = uri;
    link.click();
    document.body.removeChild(link);
  } else {
    location.replace(uri);
  }
}
