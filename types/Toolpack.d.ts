import type { BlockToolConstructable, ToolSettings } from "@editorjs/editorjs"

export type StrapiEditorJS = {
    pluginEndpoint: string,
    mediaLib: {
        toggle: (blockIndex: number) => void
    }
}

export type ToolMap = {
    [toolName: string]: BlockToolConstructable | ToolSettings;
}

export type CreateToolsFunction = (ejs: StrapiEditorJS) => ToolMap