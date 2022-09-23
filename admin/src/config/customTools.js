import PluginId from '../pluginId'

import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline';
import NestedList from '@editorjs/nested-list';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';

const customTools = {
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },
  code: Code,
  LinkTool: {
    class: LinkTool,
    config: {
      endpoint: `/api/${PluginId}/link`,
    },
  },
  raw: {
    class: Raw,
    inlineToolbar: true,
  },
  underline: Underline,
  header: {
    class: Header,
    inlineToolbar: true,
    tunes: ['tuneAlignment'],
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['tuneAlignment'],
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Quote',
      captionPlaceholder: 'Quote`s author',
    },
  },
  marker: {
    class: Marker,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
  tuneAlignment: {
    class: AlignmentTuneTool,
    config:{
      default: "right",
      blocks: {
        header: 'center',
        list: 'right'
      }
    },
  }
}

export default customTools
