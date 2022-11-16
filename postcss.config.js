//PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS
module.exports = {
  plugins: {
    "postcss-preset-env": {
      browsers: "last 2 versions",
    },
  },
};
