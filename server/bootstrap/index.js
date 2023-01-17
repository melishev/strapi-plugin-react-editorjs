const pluginName = "editorjs";

module.exports = async ({ strapi }) => {
  const pluginStore = strapi.store({
    type: "plugin",
    name: pluginName,
  });
  const getFromStaticConfig = await strapi.plugin(pluginName).config || {};

  await pluginStore.set({
    key: "config",
    value: {
      enabledTools: getFromStaticConfig("enabledTools") ?? null,
    },
  });
};
