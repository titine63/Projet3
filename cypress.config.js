const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();

const frontendUrl = process.env.FRONTEND_URL;
console.log("frontendUrl", frontendUrl);

module.exports = defineConfig({
  projectId: "11n3oh",

  e2e: {
    baseUrl: frontendUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
