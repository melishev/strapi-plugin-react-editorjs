export default class MediaLibAdapter {

  static get toolbox() {
    return {
      title: 'Strapi Image',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 336 276"><path d="M291 150.242V79c0-18.778-15.222-34-34-34H79c-18.778 0-34 15.222-34 34v42.264l67.179-44.192 80.398 71.614 56.686-29.14L291 150.242zm-.345 51.622l-42.3-30.246-56.3 29.884-80.773-66.925L45 174.187V197c0 18.778 15.222 34 34 34h178c17.126 0 31.295-12.663 33.655-29.136zM79 0h178c43.63 0 79 35.37 79 79v118c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79C0 35.37 35.37 0 79 0z"/></svg>'
    }
  }

  constructor({api, config}) {
    this.api = api
    this.config = config || {}
  }

  render() {
    const currentIndex = this.api.blocks.getCurrentBlockIndex();

    if (this.config.mediaLibToggleFunc) {
      this.config.mediaLibToggleFunc(currentIndex);
    }

    return document.createElement('p');
  }

  save() {
    return {
      name: "mediaLibraryStrapi"
    }
  }
}