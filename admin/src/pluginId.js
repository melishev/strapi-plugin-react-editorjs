const pluginPkg = require('../../package.json');
const pluginId = pluginPkg.name.replace(
  /^strapi-plugin-react-/i,
  ''
);

module.exports = pluginId;
