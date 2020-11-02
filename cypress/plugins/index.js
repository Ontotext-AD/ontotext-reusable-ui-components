const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on) =>
{
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};

module.exports = (on, config) => {
  on('task', {
    failed: require('cypress-failed-log/src/failed')(),
  })
};

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config;
};
