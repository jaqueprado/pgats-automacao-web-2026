const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // Disables Cross-Origin iframe security restrictions
    chromeWebSecurity: false, 
    
    // Blocks the third-party ads on automationexercise.com
    blockHosts: [             
      "*.doubleclick.net",
      "*.googlesyndication.com",
      "*.adservice.google.com",
      "*amazon-adsystem.com"
    ],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
