<div align="center">
    <img alt="Logo" src="https://github.com/melishev/strapi-plugin-editor-js/blob/master/.github/assets/strapi-plugin-editorjs.png" width="400px">
</div>

<h1 align="center">🎛 Strapi + ✒️ Editor.js</h1>

⚠️ **This is the Strapi v4 version of this plugin! In order to use with v3, please use [release v.1.5.1](https://github.com/melishev/strapi-plugin-react-editorjs/releases/tag/v1.5.1).**


## 🙉 What it is?

#### This is a plugin for [Strapi Headless CMS](https://strapi.io) that replaces the standard wysiwyg editor with the cool [Editor.js](https://editorjs.io) and all its compatible add-ons.
<br>

<img src="https://github.com/melishev/strapi-plugin-editor-js/blob/master/.github/assets/strapi-plugin-editorjs.gif">
<br>

## 🍀 Supported official add-ons

- [x] Paragraph Tool (default)
- [x] [Embed Tool](https://github.com/editor-js/embed)
- [x] [Table tool](https://github.com/editor-js/table)
- [x] [List Tool](https://github.com/editor-js/list)
- [x] [Warning Tool](https://github.com/editor-js/warning)
- [x] [Code Tool](https://github.com/editor-js/code)
- [x] [Link Tool](https://github.com/editor-js/link)
- [x] [Image Tool](https://github.com/editor-js/image)
- [x] [Raw HTML Tool](https://github.com/editor-js/raw)
- [x] [Heading Tool](https://github.com/editor-js/header)
- [x] [Quote Tool](https://github.com/editor-js/quote)
- [x] [Marker Tool](https://github.com/editor-js/marker)
- [x] [Checklist Tool](https://github.com/editor-js/checklist)
- [x] [Delimiter Tool](https://github.com/editor-js/delimiter)
- [x] [InlineCode Tool](https://github.com/editor-js/inline-code)
- [ ] [Personality Tool](https://github.com/editor-js/personality)
- [ ] [Attaches Tool](https://github.com/editor-js/attaches)

<br>

#### All of the above add-ons (if added) work initially when the plugin is loaded. You can also customize the add-ons available in your application using the instructions below.

<br>

## 🤟🏻 Getting Started

```bash
yarn add strapi-plugin-react-editorjs
# or
npm install strapi-plugin-react-editorjs
```

In order for Strapi to show the Link Tool thumbnails correctly, you will need to edit the 'strapi::security' line in ./config/middlewares.js. Change that line to the following (do this at your own risk). 

```js
module.exports = [
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ['*'],
        },
      }
    },
  },
  // ...
];
```

<br>

## ⚙️ How to extend/develop this plugin (optional)

If you want to change the look of the editor or add/remove editorJS plugins, you will need to do the following:

1. If this plugin is already install via yarn or npm, uninstall: 
```bash
yarn remove strapi-plugin-react-editorjs
# or
npm uninstall strapi-plugin-react-editorjs
```
2. Go to the ./src/plugins folder (create it if it doesn't exist) and clone the project:

```bash
# If you wish to clone the Master Branch
git clone https://github.com/melishev/strapi-plugin-react-editorjs.git
# If you wish to clone the Beta Branch
git clone --single-branch --branch beta https://github.com/melishev/strapi-plugin-react-editorjs.git
```
3. Go into the plugin and install dependencies:
   - `cd strapi-plugin-react-editorjs`
   - `yarn install` or `npm install`
4. In an editor add the following code into the main Strapi v4 ./config/plugins.js file (create the file if it doesn't exist)

```js
module.exports = ({ env }) => ({
  // ...
  'editorjs': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-react-editorjs'
  },
  // ...
})
```

5. To make changes to EditorJS plugins, edit the `./src/plugins/strapi-plugin-react-editorjs/admin/src/config/customTools.js` file. 
   - Note: the Image Tool add-on has been highly customized in order to work in Strapi and cannot be edited in the `customTools.js` file. If you wish to develop it further, you may, but it will take much more advanced knowledge and testing.
6. Rebuild Strapi after installation and after any changes made in the plugin.
```bash
yarn build
# or
npm run build
```

### Please note that the add-ons are configured for Strapi, be careful when changing the configuration.

<br>

## 👨🏻‍🏭 Developing

1. [Personality Tool](https://github.com/editor-js/personality)
2. [Attaches Tool](https://github.com/editor-js/attaches)
3. Full screen mode

<br>

## ⭐️ Show your support

Give a star if this project helped you.
