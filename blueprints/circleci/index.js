/* eslint-env node */
const stringUtil = require("ember-cli-string-utils");

module.exports = {
  description: "Ember-CircleCI blueprint",

  locals(options) {
    let name = stringUtil.dasherize(options.entity.name);
    let { addon, yarn } = options;
    return {
      name,
      addon,
      yarn
    };
  }
};
