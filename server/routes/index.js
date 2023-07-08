module.exports = [
    {
        method: "GET",
        path: "/link",
        handler: "editorjs.link",
    },
    {
        method: "POST",
        path: "/image/byFile",
        handler: "editorjs.byFile",
    },
    {
        method: "POST",
        path: "/image/byUrl",
        handler: "editorjs.byURL",
    },
]

