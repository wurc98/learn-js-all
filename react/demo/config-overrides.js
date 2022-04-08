

const {
  override,
  fixBabelImports,
  addDecoratorsLegacy 
  // addLessLoader,
} = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
      libraryName: "antd", libraryDirectory: "es", style: 'css' // change importing css to less
  }),
  addDecoratorsLegacy()
);