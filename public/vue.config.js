const path = require("path");

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "~@/scss/_colors.scss";
          @import "~@/scss/_fonts.scss";
        `,
            },
        },
    },
    outputDir: path.resolve(__dirname, "../../jamenwalz.github.io"),
    indexPath: "404.html",
    transpileDependencies: ["vue-meta"],
    chainWebpack: (config) => {
        if (config.plugins.has("extract-css")) {
            const extractCSSPlugin = config.plugin("extract-css");
            extractCSSPlugin &&
                extractCSSPlugin.tap(() => [{
                    filename: "[name].css",
                    chunkFilename: "[name].css",
                }, ]);
        }
    },
    configureWebpack: {
        output: {
            filename: "[name].js",
            chunkFilename: "[name].js",
        },
    },
};