import PluginId from "../pluginId";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";

class Button {
  static get toolbox() {
    return {
      title: "Button",
      icon: '<svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm21.1 80C367 158.8 384 129.4 384 96c0-53-43-96-96-96s-96 43-96 96c0 33.4 17 62.8 42.9 80H224c-17.7 0-32 14.3-32 32s14.3 32 32 32h32V448H208c-53 0-96-43-96-96v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97 263c-9.4-9.4-24.6-9.4-33.9 0L7 319c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 88.4 71.6 160 160 160h80 80c88.4 0 160-71.6 160-160v-6.1l7 7c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-56-56c-9.4-9.4-24.6-9.4-33.9 0l-56 56c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l7-7V352c0 53-43 96-96 96H320V240h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H341.1z"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
  }

  render() {
    this.wrapper = document.createElement("div");

    const href = this.data && this.data.href ? this.data.href : "";
    const label = this.data && this.data.label ? this.data.label : "";
    const openInNewTab = this.data && this.data.openInNewTab ? true : false;

    const checkboxId = `open-in-new-tab-${Math.random()}`;

    const html = `
      <div class="button-container">
        <h4>Button</h4>
        <input type="text" class="cdx-input button-label" placeholder="ex: Learn more or Get started" value="${label}">
        <input type="text" class="cdx-input button-href" placeholder="ex: /simple or https://stashaway.sg/simple" value="${href}">
        <label for="${checkboxId}">
          <input type="checkbox" class="button-open-in-new-tab" id="${checkboxId}" ${
      openInNewTab ? "checked" : ""
    }>
          Open in new tab
        </label>
      </div>
    `;

    this.wrapper.innerHTML = html;

    return this.wrapper;
  }

  save(blockContent) {
    const hrefInput = blockContent.querySelector(".button-href");
    const labelInput = blockContent.querySelector(".button-label");
    const openInNewTabCheckbox = blockContent.querySelector(
      ".button-open-in-new-tab"
    );

    return {
      href: hrefInput.value,
      label: labelInput.value,
      openInNewTab: openInNewTabCheckbox.checked ? true : false,
    };
  }
}

const customTools = {
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
  },
  button: {
    class: Button,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  LinkTool: {
    class: LinkTool,
    config: {
      endpoint: `/api/${PluginId}/link`,
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Quote",
      captionPlaceholder: "Quote`s author",
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
};

export default customTools;
