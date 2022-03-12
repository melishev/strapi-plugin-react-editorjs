import styled from 'styled-components';
import { Box } from "@strapi/design-system/Box";

const Wrapper = styled(Box)`
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
