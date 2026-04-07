module.exports = {
  default: {
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["src/features/**/*.feature"],
    format: ["allure-cucumberjs/reporter:NUL", "progress"],
    formatOptions: {
      resultsDir: "allure-results"
    }
  },
  smoke: {
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["src/features/**/*.feature"],
    tags: "@smoke",
    format: ["allure-cucumberjs/reporter:NUL", "progress"],
    formatOptions: {
      resultsDir: "allure-results"
    }
  },
  ci: {
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["src/features/**/*.feature"],
    format: ["allure-cucumberjs/reporter:NUL", "progress"],
    formatOptions: {
      resultsDir: "allure-results"
    },
    retry: 2
  }
};