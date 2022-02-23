<div align="center">
    <img alt="Logo" src="https://github.com/melishev/strapi-plugin-editor-js/blob/main/.github/assets/strapi-plugin-editorjs.png" width="400px">
</div>

<h1 align="center">🎛 Strapi + ✒️ Editor.js</h1>


## 🙉 What it is?
#### This is a plugin for [Strapi Headless CMS](https://strapi.io) that replaces the standard wysiwyg editor with the cool [Editor.js](https://editorjs.io) and all its compatible add-ons.
<br>

<img src="https://github.com/melishev/strapi-plugin-editor-js/blob/main/.github/assets/strapi-plugin-editorjs.gif">
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

>  Note: the Image add-on cannot be reconfigured by you personally, this is due to some problems with the work of this add-on. You just better leave it alone.

<br>

## 🤟🏻 Getting Started
```bash
yarn add strapi-plugin-react-editorjs
# or
npm install strapi-plugin-react-editorjs
```
For the plugin to work correctly, you need to give Public and Authenticated role access to the plugin API, at the moment it is necessary for:
1. [Link Tool](https://github.com/editor-js/link)
2. [Image Tool](https://github.com/editor-js/image)

<br>

## ⚙️ How to customize editor (optional)

If you want to change the look of the editor or remove unused add-ons, you can add a custom Editor.js configuration to override the default settings:

1. Go to your Strapi folder
2. Copy template config file [`node_modules/strapi-plugin-react-editorjs/admin/src/config/customTools.js`](admin/src/config/customTools.js) to `extensions/react-editorjs/admin/src/config`
3. Set up `extensions/react-editorjs/admin/src/config/customTools.js`
4. Rebuild Strapi

```bash
yarn run build
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