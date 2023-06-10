const ogs = require('open-graph-scraper');
const { parseMultipartData } = require('@strapi/utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { LocalFileData } = require('get-file-object-from-local-path');
const pluginId = require('../../admin/src/pluginId');


module.exports = ({ strapi }) => ({

  link: async (ctx) => {
    const result = await new Promise((resolve) => {

      ogs(ctx.query, (error, results, response) => {

        const imageUrl = (results.ogImage && results.ogImage.url) ? { url: results.ogImage.url } : undefined;

        resolve({
          success: 1,
          meta: {
            title: results.ogTitle,
            description: results.ogDescription,
            image: imageUrl,
          },
        })
      })
    });

    ctx.send(result);
  },

  byFile: async (ctx) => {
    try {
      const { files } = parseMultipartData(ctx)

      const [uploadedFile] = await strapi.plugin('upload').service('upload').upload({
        data: {},
        files: Object.values(files)
      })

      ctx.send({
        success: 1,
        file: uploadedFile
      })
    } catch (e) {
      ctx.send({
        success: 0,
        message: e.message
      }, 500)
    }
  },

  byURL: async (ctx) => {
    try {
      const { url } = ctx.request.body;
      const {name, ext} = path.parse(url)
      const filePath = `./public/${name}${ext}`

      const response = await axios.get(url, {responseType: 'arraybuffer'})
      const buffer = Buffer.from(response.data, 'binary')

      await fs.promises.writeFile(filePath, buffer)

      const fileData = new LocalFileData(filePath)

      const file = {
        path: filePath,
        name: fileData.name,
        type: fileData.type,
        size: Buffer.byteLength(buffer),
      }

      const [uploadedFile] = await strapi.plugin('upload').service('upload').upload({
        data: {},
        files: file
      })

      await fs.promises.unlink(filePath);

      ctx.send({
          success: 1,
          file: uploadedFile
      })
    } catch (e) {
      ctx.send({
        success: 0,
        message: e.message
      }, 500)
    }
  },

  serveToolpack: async (ctx) => {

    const toolpackService = strapi.plugin(pluginId).service('toolpack');
    const toolpackPackageName = toolpackService.getToolpackPackageName();

    // try and load from the config package
    let toolpackFilePath = toolpackService.tryLoadFromPackage(toolpackPackageName);

    // if it has failed, and it wasn't the default, try the default
    if (toolpackFilePath === undefined && toolpackPackageName !== DEFAULT_TOOLPACK_PACKAGE) {
        toolpackFilePath = toolpackService.tryLoadFromPackage(DEFAULT_TOOLPACK_PACKAGE);
    }

    // if it has still failed, log and return an error
    if (toolpackFilePath === undefined) {
        ctx.response.status = 400;
        return;
    }

    // otherwise send the toolpack file
    const fileStream = fs.createReadStream(toolpackFilePath)
    ctx.response.body = fileStream;
    ctx.response.type = 'js';
    return;
  },
  checkToolpackValid: async (ctx) => {

    const toolpackService = strapi.plugin(pluginId).service('toolpack');
    const toolpackPackageName = toolpackService.getToolpackPackageName();

    const ret = toolpackService.packageIsValid(toolpackPackageName);

    if (ret.valid) {
        ctx.response.status = 200;
    } else {
        ctx.response.status = 400;
        ctx.response.body = ret.reason;
    }

  },
  config: async (ctx) => {
    const config = strapi.config.get(`plugin.${pluginId}`);
    ctx.response.body = config;
  }
});
