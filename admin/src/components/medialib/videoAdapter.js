import MediaLibAdapter from "./adapter";

export default class VideoLibAdapter extends MediaLibAdapter {
  static get toolbox() {
    return {
      title: 'Video',
      icon: `
        <svg width="17" height="15" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_16)">
            <path d="M29.4115 21.4624L29.4464 9.02975C29.4464 7.1296 27.9061 5.58928 26.006 5.58928H7.99405C6.09389 5.58928 4.55357 7.1296 4.55357 9.02975V18.6618L11.2607 14.6536L19.4341 21.4258L25.1312 18.4018L29.4115 21.4624ZM29.4115 21.4624L25.1312 18.4018L19.4341 21.4258L11.2607 14.6536L4.55357 18.6618V20.9702C4.55357 22.8704 6.09389 24.4107 7.99405 24.4107H26.006C27.7389 24.4107 29.1727 23.1293 29.4115 21.4624ZM7.99405 1.03571H26.006C30.4209 1.03571 34 4.61481 34 9.02975V20.9702C34 25.3852 30.4209 28.9643 26.006 28.9643H7.99405C3.57911 28.9643 0 25.3852 0 20.9702V9.02975C0 4.61481 3.57911 1.03571 7.99405 1.03571Z" fill="black"/>
            <path d="M12 20V10L23 15L12 20Z" stroke="black" stroke-width="4" stroke-linejoin="round" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1_16">
              <rect width="34" height="30" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      `
    }
  }

  constructor({api, config}) {
    super({api, config});
  }

  save() {
    return {
      name: "videoLibraryStrapi"
    }
  }
}