"use strict";

const { readJsonSync, removeSync } = require("fs-extra");
const { join } = require("path");
const {
  setupTestHooks,
  emberNew,
  emberGenerate
} = require("ember-cli-blueprint-test-helpers/helpers");
const { expect, file } = require("ember-cli-blueprint-test-helpers/chai");

const appPath = process.cwd();

function getDevDependencies() {
  let pkg = readJsonSync("package.json");
  return Object.keys(pkg.devDependencies);
}

describe("Acceptance: ember generate ember-circleci", function() {
  setupTestHooks(this);

  beforeEach(function() {
    removeSync(join(appPath, "testem.js"));
    removeSync(join(appPath, ".circleci", "config.yml"));
    removeSync(join(appPath, "tests", "test-helper.js"));
    removeSync(join(appPath, "config", "ember-try.js"));
  });

  it("ember-circleci without activate parameters in application", function() {
    let args = ["ember-circleci", "--yarn=nope", "--addon=nope"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("npm install");
        expect(file("tests/test-helper.js")).to.contain(
          'import start from "ember-exam/test-support/start";'
        );
        expect(file("tests/test-helper.js")).to.contain("start();");
      });
  });

  it("ember-circleci without activate parameters in addon", function() {
    let args = ["ember-circleci", "--yarn=nope", "--addon"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("npm install");
        expect(file("tests/test-helper.js")).to.contain(
          'import start from "ember-exam/test-support/start";'
        );
        expect(file("tests/test-helper.js")).to.contain("start();");
      });
  });

  it("ember-circleci with --yarn parameter in application", function() {
    let args = ["ember-circleci", "--yarn", "--addon=nope"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("yarn install");
      });
  });

  it("ember-circleci with --yarn parameter in addon", function() {
    let args = ["ember-circleci", "--yarn", "--addon"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("yarn install");
        expect(file("config/ember-try.js")).to.contain("useYarn: true");
      });
  });

  it("ember-circleci with --exam parameter in application", function() {
    let args = ["ember-circleci", "--exam", "--addon=nope"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.not.contain("parallelism:");
      });
  });

  it("ember-circleci with --exam parameter in addon", function() {
    let args = ["ember-circleci", "--exam", "--addon"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("parallelism: 4");
        expect(file("config/ember-try.js")).to.contain(
          "command: `ember exam --split=${process.env.CIRCLE_NODE_TOTAL} --partition=${Number(process.env.CIRCLE_NODE_INDEX) + 1} --parallel --load-balance`,"
        );
      });
  });

  it("ember-circleci with --exam=bonjour parameter in addon", function() {
    let args = ["ember-circleci", "--exam=bonjour", "--addon"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("parallelism: 4");
      });
  });

  it("ember-circleci with --exam=2 parameter in addon", function() {
    let args = ["ember-circleci", "--exam=2", "--addon"];
    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file(".circleci/config.yml")).to.contain("parallelism: 2");
      });
  });

  it("adds ember-exam as a dependency", () => {
    let args = ["ember-circleci", "--exam", "--addon"];
    return emberNew()
      .then(() => {
        expect(getDevDependencies()).to.not.contain("ember-exam");
      })
      .then(() => emberGenerate(args))
      .then(() => {
        expect(getDevDependencies()).to.contain("ember-exam");
      });
  });
});
