import styled from 'styled-components';
import {Box} from "@strapi/design-system/Box";

const computeInterfaceModeStyle = () => {
  const strapiTheme = window.localStorage.getItem('STRAPI_THEME');
  let interfaceModeTextColor = 'black';
  let toolbarButtonHoverColor = 'white';
  let selectionColor = '#e1f2ff';
  let linkColor = 'initial';

  if (strapiTheme) {
    if (strapiTheme === 'dark') {
      interfaceModeTextColor = 'white';
      toolbarButtonHoverColor = '#181826';
      selectionColor = "#181826";
      linkColor = '#7b79ff';
    }
    if (strapiTheme === 'light') {
      interfaceModeTextColor = 'black'
      linkColor = 'initial';
    }
  } else {
    // Check what the browser settings are, strapi falls back onto this when there is no local storage
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      interfaceModeTextColor = 'white';
      linkColor = '#7b79ff';
    }
  }

  return `
    .tc-wrap {
      --color-background: #f9f9fb0f;
    }
  
    .cdx-marker {
       color: ${interfaceModeTextColor};
       background-color: ${strapiTheme === 'dark' ? 'rgb(74 74 106)' : 'yellow'};
    }
    
    .ce-block a {
      color: ${linkColor};
    }
    
    .tc-popover__item-label {
        color: black;
    }
  
    .ce-block__content {
      color: ${interfaceModeTextColor};
    }
    
    .ce-toolbar__actions--opened svg {
      fill: ${interfaceModeTextColor}
    }
    
    .ce-toolbar__settings-btn--active:hover, .ce-toolbar__settings-btn:hover, .ce-toolbar__plus:hover {
      background-color: ${toolbarButtonHoverColor};
    }

    .ce-block--selected .ce-block__content {
      background: ${selectionColor};
    }
    
    .cdx-block::selection {
      background-color: ${selectionColor};
    }
    
    .cdx-block *::selection {
      background-color: ${selectionColor};
    }
    
    .tc-wrap svg {
      vertical-align: top;
      fill: black;
    }

    .tc-popover__item--confirm svg {
      fill: white;
    }
        
    .ce-toolbox--opened {
      background: white;
      padding: 2px;
      border-radius: 6px;
    }
    
    .ce-settings--opened svg {
      fill: currentColor;
    }
  `;
}


const Wrapper = styled(Box)`

  ${computeInterfaceModeStyle};

  @media (min-width: 651px) {
    .codex-editor--narrow .codex-editor__redactor {
      margin-right: 0;
    }
  }

  .codex-editor {
    padding: 16px;
    font-size: 1rem;
  }

  *:focus-visible {
    outline: none;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  h3 {
    font-size: 1.17em;
    font-weight: bold;
  }

  h4 {
    font-size: 1em;
    font-weight: bold;
  }

  h5 {
    font-size: .83em;
    font-weight: bold;
  }

  h6 {
    font-size: .67em;
    font-weight: bold;
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }

  &.bordered {
    .editorWrapper {
      border-color: red;
    }
  }

  > div + p {
    width: 100%;
    padding-top: 12px;
    font-size: 1.2rem;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: -9px;
  }

  div,
  pre,
  code {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      cursor: default;
    }
  }

  .cdx-input.image-tool__caption {
    font-size: .9rem;
    color: #444;
    line-height: 1.5;
  }
`;

export default Wrapper;
