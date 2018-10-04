# Ember-CircleCI

[![CircleCI](https://circleci.com/gh/GreatWizard/ember-circleci.svg?style=shield)](https://circleci.com/gh/GreatWizard/ember-circleci)
[![Ember Observer Score](https://emberobserver.com/badges/ember-circleci.svg)](https://emberobserver.com/addons/ember-circleci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CircleCI configuration generator for your Ember projects.

The generated configuration is compatible with applications and addons.
In addition, it uses parallel jobs to optimize CI time.

## Installation

```
ember install ember-circleci
```

## Usage

```sh
ember g circleci
```

## Generated configuration

This addon generates the `.circleci/config.yml` file.
Lint and Tests jobs are starts as parallel jobs.
After the install dependencies job, the `node_modules` folder is saved as cache for future installations.

### Configuration for application

It will provides a `test_and_build` workflow, as follows:

![checkout code / install dependencies / run lint (js and hbs) / run tests (default)](/doc/workflow-app.png)

### Configuration for addon

It will provides a `test_matrix` workflow, as follows:

![checkout code / install dependencies / run lint (js and hbs) / run tests (default, LTS 2.16, LTS 2.18, release, beta, canary and default with jquery)](/doc/workflow-addon.png)

## Contributing

### Installation

- `git clone <repository-url>`
- `cd ember-circleci`
- `yarn install`

### Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

## License

This project is licensed under the [MIT License](LICENSE.md).
