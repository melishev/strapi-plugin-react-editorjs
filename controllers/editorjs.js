const ogs = require('open-graph-scraper');

module.exports = {

  index: async (ctx) => {
    ctx.send({
      message: 'ok'
    });
  },

  link: async (ctx) => {
    return await new Promise((resolve) => {
      ogs(ctx.query, (error, results, response) => {
        resolve({
          success: 1,
          meta: {
            title: results.ogTitle,
            description: results.ogDescription,
            image: {
              url: results.ogImage.url,
            },
          },
        })
      })
    })
  }
}
