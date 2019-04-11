const lint = process.env.CI ? "nolint" : "";
const testParams = ["hidepassed", lint].filter(Boolean).join("&");

module.exports = {
  parallel: -1,
  test_page: `tests/index.html?${testParams}`,
  disable_watching: true,
  launch_in_ci: ["Chrome"],
  launch_in_dev: ["Chrome"],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? "--no-sandbox" : null,
        "--headless",
        "--disable-gpu",
        "--remote-debugging-port=0",
        "--window-size=1440,900"
      ].filter(Boolean)
    },
    Firefox: {
      ci: ["-headless", "--window-size=1440,900"].filter(Boolean)
    }
  }
};
