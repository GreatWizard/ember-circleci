/* eslint-env node */
const path = require("path");
const { existsSync } = require("fs");
const stringUtil = require("ember-cli-string-utils");

let hasExam = false,
  isAddon = false;

module.exports = {
  description: "Ember-CircleCI blueprint",

  normalizeEntityName() {},

  locals({ exam, project }) {
    let { name, keywords = [] } = project.pkg;
    isAddon = keywords.includes("ember-addon");
    let hasYarn = existsSync(path.join(project.root, "yarn.lock"));
    hasExam = exam !== undefined;
    return {
      name: stringUtil.dasherize(name),
      yarn: hasYarn,
      addon: isAddon,
      exam: hasExam,
      parallel: exam ? exam : 4
    };
  },

  files() {
    let files = this._super.files.apply(this, arguments);
    if (!isAddon) {
      files = files.filter(file => file !== "config/ember-try.js");
    }
    return files;
  },

  afterInstall() {
    if (hasExam) {
      //return this.addPackagesToProject([{ name: "ember-exam" }]);
    }
  }
};
