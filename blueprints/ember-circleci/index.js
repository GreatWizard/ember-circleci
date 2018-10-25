/* eslint-env node */
const path = require('path')
const { existsSync } = require('fs')
const stringUtil = require("ember-cli-string-utils")

module.exports = {
  description: "Ember-CircleCI blueprint",

  normalizeEntityName() {},
  locals({ project }) {
    let { name, keywords = [] } = project.pkg
    let isAddon = keywords.includes('ember-addon')
    let hasYarn = existsSync(path.join(project.root, 'yarn.lock'))

    return {
      name: stringUtil.dasherize(name),
      yarn: hasYarn,
      addon: isAddon
    }
  }
}
