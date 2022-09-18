const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
     " // implement node event listeners here"
    },
    "baseUrl": "https://www.natura.com.br",
    'defaultCommandTimeout': 60000
  },
  projectId: 'npra2m',
});
