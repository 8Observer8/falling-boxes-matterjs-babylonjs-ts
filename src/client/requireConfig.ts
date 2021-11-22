requirejs.config({
    baseUrl: "js",
    paths: {
        "babylonjs": "https://cdnjs.cloudflare.com/ajax/libs/babylonjs/4.2.0/babylon",
        "matter-js": "https://cdn.jsdelivr.net/npm/matter-js@0.14.2/build/matter.min"
    }
});

requirejs(["main"], () => { });
