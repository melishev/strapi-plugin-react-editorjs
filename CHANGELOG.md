# [2.0.0-beta.1](https://github.com/melishev/strapi-plugin-editor-js/compare/v1.5.1...v2.0.0-beta.1) (2022-02-24)


### Bug Fixes

* added /api/ to byUrl and byFile ([211c1f3](https://github.com/melishev/strapi-plugin-editor-js/commit/211c1f3bbfd8ed551021488dfd24f2c6d4caddf3))


* feat!: updates to allow Strapi v4 functionality ([72b4913](https://github.com/melishev/strapi-plugin-editor-js/commit/72b491313b172629cfab129586c68d80e6c508d8))


### BREAKING CHANGES

* This update refactors the plugin to work in Strapi v4. This code will not work in Strapi v3. At this time, the Image tool is not functioning. The link tool works, but thumbnails are being blocked by Strapi 4's contentSecurityPolicy. The current workaround for this is to replace the 'strapi::security' default export in ./config/middlewares.js to the following code (do this at your own risk):

"{
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: false
    },
  },"

I've yet to find a solution that can be baked into the plugin itself. I have also added "auth: false" to the routes config so that it is not necessary to give authenticated and public permissions to the plugin. This may need to be removed if it is seen as a security risk.

Custom styles have been added to Wysiwyg/wrapper.js for headers (H1-H6) because Strapi resets styles and there is no styling for the plugin without them.

I have updated editorjs to 2.23.2 and several other of the plugins (see package.json). I've also added @buffetjs/core and @buffetjs/styles to package.json because the library is not in Strapi now. I also removed "axios" because that library is in Strapi. I updated node to the following: "node": ">=10.16.0 <=16.x.x"

## [1.5.1](https://github.com/melishev/strapi-plugin-editor-js/compare/v1.5.0...v1.5.1) (2022-02-23)


### Bug Fixes

* '/link' controller was never responding. ([e081bfa](https://github.com/melishev/strapi-plugin-editor-js/commit/e081bfae08cefe380e14b8d98091dd5f29c2923d))
