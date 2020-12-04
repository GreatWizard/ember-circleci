/* eslint-env node */
const path = require("path");
const { existsSync } = require("fs");

let hasExam = false,
  isAddon = false;

module.exports = {
  description: "Ember-CircleCI blueprint",

  normalizeEntityName() {},

  locals(options) {
    let {
      exam,
      project: {
        root,
        pkg: { keywords = [] }
      }
    } = options;
    isAddon = keywords.includes("ember-addon");
    let hasYarn = existsSync(path.join(root, "yarn.lock"));
    hasExam = exam !== undefined;
    return {
      yarn: hasYarn,
      addon: isAddon,
      exam: hasExam,
      parallel: !isNaN(Number.parseInt(exam)) ? exam : 4
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
    if (isAddon && hasExam) {
      return this.addPackageToProject("ember-exam");
    }

    let travisFile = `${this.project.root}/.travis.yml`

    if (existsSync(travisFile)) {
      unlinkSync(travisFile)
    }
  }
};
