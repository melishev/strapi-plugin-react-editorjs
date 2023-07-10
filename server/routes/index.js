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
    {
        method: "GET",
        path: "/toolpackValid",
        handler: "editorjs.checkToolpackValid",
    },
    {
        method: "GET",
        path: "/toolpack",
        handler: "editorjs.serveToolpack",
        config: {
            auth: false
        }
    },
    {
        method: "GET",
        path: "/config",
        handler: "editorjs.config",
    },
]

