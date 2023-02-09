import type { LocationData } from "@/model/Location.model";
import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state: {
    location: {} as LocationData,
  },
  getters: {
    getLocation(state) {
      return state.location;
    },
  },
  mutations: {
    changeLocation(state, location: LocationData) {
      state.location = location;
    },
  },
});
