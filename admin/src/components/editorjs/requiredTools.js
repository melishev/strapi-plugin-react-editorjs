import PluginId from '../../pluginId'
const axios = require('axios')
import { auth } from '@strapi/helper-plugin';

// Plugins for Editor.js
import Image from '@editorjs/image'

const requiredTools = {
  image: {
    class: Image,
    config: {
      field: "files.image",
      additionalRequestData: {
        data: JSON.stringify({})
      },
      additionalRequestHeaders: {
        "Authorization": `Bearer ${auth.getToken()}`
      },
      endpoints: {
        byUrl: `/api/${PluginId}/image/byUrl`,
      },
      uploader: {
        async uploadByFile(file) {
          const formData = new FormData();
          formData.append("data", JSON.stringify({}));
          formData.append("files.image", file);

          const {data} = await axios.post(`/api/${PluginId}/image/byFile`, formData, {
            headers: {
              "Authorization": `Bearer ${auth.getToken()}`
            }
          });

          return data
        },
      }
    }
  }
}

export default requiredTools
