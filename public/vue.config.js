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
};