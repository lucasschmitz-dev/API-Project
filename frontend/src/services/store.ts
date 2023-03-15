import type { ImageData } from "@/model/ImageB64.model";
import type { LocationData } from "@/model/Location.model";
import type { WeatherData } from "@/model/Weather.model";
import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state: {
    location: {} as LocationData,
    weather: {} as WeatherData,
    image: {} as ImageData,
    likedImages: [] as Number[],
    dislikedImages: [] as Number[],
  },
  getters: {
    getLocation(state) {
      return state.location;
    },
    getWeather(state) {
      return state.weather;
    },
    getImage(state) {
      return state.image;
    },
    getLikedImages(state) {
      return state.likedImages;
    },
    getDislikedImages(state) {
      return state.dislikedImages;
    },
  },
  mutations: {
    changeLocation(state, location: LocationData) {
      state.location = location;
    },
    changeWeather(state, weather: WeatherData) {
      state.weather = weather;
    },
    changeImage(state, image: ImageData) {
      state.image = image;
    },
  },
});
