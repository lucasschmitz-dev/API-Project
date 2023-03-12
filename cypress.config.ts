import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on: any, config: any) {
      require("@cypress/code-coverage/task")(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    baseUrl: "http://localhost:8080",
  },
});
