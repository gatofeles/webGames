const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '63fsuu',
  e2e: {
    baseUrl:'http://localhost:3000/',
    setupNodeEvents(on, config) {
      
    },
  },
});
