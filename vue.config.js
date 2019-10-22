module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_fonts.scss";
          `,
      },
      postcss: {
        // options here will be passed to postcss-loader
      },
    },
  },
};
