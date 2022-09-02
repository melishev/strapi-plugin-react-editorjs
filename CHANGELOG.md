## [2.0.2](https://github.com/melishev/strapi-plugin-editor-js/compare/v2.0.1...v2.0.2) (2022-09-02)


### Bug Fixes

* empty editor and required field ([#59](https://github.com/melishev/strapi-plugin-editor-js/issues/59)) ([6320c2a](https://github.com/melishev/strapi-plugin-editor-js/commit/6320c2a35c72ce8a416cfb2032a22fd6566f9a40))

## [2.0.1](https://github.com/melishev/strapi-plugin-editor-js/compare/v2.0.0...v2.0.1) (2022-05-05)


### Bug Fixes

* bug upload image from clipboard ([#44](https://github.com/melishev/strapi-plugin-editor-js/issues/44)) ([fd67756](https://github.com/melishev/strapi-plugin-editor-js/commit/fd67756ec5991c9ac44da05c6c639f8f763492fb))

# [2.0.0](https://github.com/melishev/strapi-plugin-editor-js/compare/v1.5.1...v2.0.0) (2022-03-19)


### Bug Fixes

* added /api/ to byUrl and byFile ([211c1f3](https://github.com/melishev/strapi-plugin-editor-js/commit/211c1f3bbfd8ed551021488dfd24f2c6d4caddf3))
* fixed the image tool. Now able to add images from the media library, and automatically shuts the media library window after saving. ([fb5a907](https://github.com/melishev/strapi-plugin-editor-js/commit/fb5a907de6d4d6399b6a5e23b596d9893159944c))
* include label for the rich text editor field ([73187d7](https://github.com/melishev/strapi-plugin-editor-js/commit/73187d73977d25ddb317c890cc2b5f48e72ed94c))
* refactored to allow copy and paste images from another website ([3330250](https://github.com/melishev/strapi-plugin-editor-js/commit/3330250a03e64e41095057b8ecd7290e4c6f688c)), closes [#5](https://github.com/melishev/strapi-plugin-editor-js/issues/5)
* returned to making API route only be 'react-editorjs' ([ee9b747](https://github.com/melishev/strapi-plugin-editor-js/commit/ee9b74759786f8bcd87135a80932a14885f5a3f7))
* solution for [#5](https://github.com/melishev/strapi-plugin-editor-js/issues/5) axios ([1f2d9a7](https://github.com/melishev/strapi-plugin-editor-js/commit/1f2d9a73c7fb2a7653d8e7527cbd2c03f76335c5))


* feat!: updates to allow Strapi v4 functionality ([72b4913](https://github.com/melishev/strapi-plugin-editor-js/commit/72b491313b172629cfab129586c68d80e6c508d8))


### Features

* add background to focused block & differentiate image tool caption ([a5d2b1b](https://github.com/melishev/strapi-plugin-editor-js/commit/a5d2b1b5650926014da076c9844739ffe6a81897))
* add width, height, size, mime, responsive data to image tool ([e07548c](https://github.com/melishev/strapi-plugin-editor-js/commit/e07548ca71e7ffc211acb53e8aa556ef2fe660e6)), closes [#6](https://github.com/melishev/strapi-plugin-editor-js/issues/6) [#16](https://github.com/melishev/strapi-plugin-editor-js/issues/16)
* enabled inline links ([ad11533](https://github.com/melishev/strapi-plugin-editor-js/commit/ad11533f0ba260cb1671bbd62ef7641bfd06512a))


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

# [2.0.0-beta.2](https://github.com/melishev/strapi-plugin-editor-js/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-03-13)


### Bug Fixes

* fixed the image tool. Now able to add images from the media library, and automatically shuts the media library window after saving. ([fb5a907](https://github.com/melishev/strapi-plugin-editor-js/commit/fb5a907de6d4d6399b6a5e23b596d9893159944c))
* include label for the rich text editor field ([73187d7](https://github.com/melishev/strapi-plugin-editor-js/commit/73187d73977d25ddb317c890cc2b5f48e72ed94c))
* refactored to allow copy and paste images from another website ([3330250](https://github.com/melishev/strapi-plugin-editor-js/commit/3330250a03e64e41095057b8ecd7290e4c6f688c)), closes [#5](https://github.com/melishev/strapi-plugin-editor-js/issues/5)
* returned to making API route only be 'react-editorjs' ([ee9b747](https://github.com/melishev/strapi-plugin-editor-js/commit/ee9b74759786f8bcd87135a80932a14885f5a3f7))
* solution for [#5](https://github.com/melishev/strapi-plugin-editor-js/issues/5) axios ([1f2d9a7](https://github.com/melishev/strapi-plugin-editor-js/commit/1f2d9a73c7fb2a7653d8e7527cbd2c03f76335c5))


### Features

* add background to focused block & differentiate image tool caption ([a5d2b1b](https://github.com/melishev/strapi-plugin-editor-js/commit/a5d2b1b5650926014da076c9844739ffe6a81897))
* add width, height, size, mime, responsive data to image tool ([e07548c](https://github.com/melishev/strapi-plugin-editor-js/commit/e07548ca71e7ffc211acb53e8aa556ef2fe660e6)), closes [#6](https://github.com/melishev/strapi-plugin-editor-js/issues/6) [#16](https://github.com/melishev/strapi-plugin-editor-js/issues/16)
* enabled inline links ([ad11533](https://github.com/melishev/strapi-plugin-editor-js/commit/ad11533f0ba260cb1671bbd62ef7641bfd06512a))

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
