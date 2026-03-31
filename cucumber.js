module.exports = {
  default: {
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["src/features/**/*.feature"],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results"
    }
  }
};