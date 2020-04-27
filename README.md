# Ember-CircleCI

[![CircleCI](https://circleci.com/gh/GreatWizard/ember-circleci.svg?style=shield)](https://circleci.com/gh/GreatWizard/ember-circleci)
[![Ember Observer Score](https://emberobserver.com/badges/ember-circleci.svg)](https://emberobserver.com/addons/ember-circleci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Liberapay](http://img.shields.io/liberapay/receives/GreatWizard.svg?logo=liberapay)](https://liberapay.com/GreatWizard/)
[![Beerpay](https://beerpay.io/GreatWizard/ember-circleci/badge.svg?style=flat)](https://beerpay.io/GreatWizard/ember-circleci)

CircleCI configuration generator for your Ember projects.

The generated configuration is compatible with applications and addons.
In addition, it uses parallel jobs to optimize CI time.

## Installation

```
ember install ember-circleci
```

## Usage

```
ember g ember-circleci [--exam=X]
```

### Options

- `--exam=X`: Use [`ember-exam`](https://github.com/ember-cli/ember-exam) to run tests in parallel, X is the number of parallel processes (default value is 4)

## Generated configuration

This addon generates the `.circleci/config.yml` file.
Lint and Tests jobs are started as parallel jobs.

If you activate ember-exam, it provides the ability to split, parallelize, and load-balance your test suite.

If ember-exam is not activated, it provides reports of the tests by using xUnit.
xUnit generates an xml file and expose it to CircleCI, that way it can gave a quick overview of the failing tests

After the install dependencies job, the `node_modules` folder is cached by CircleCI to speed up the next runs.

:bulb: If you later need to regenerate the `.circleci/config.yml` file, run `ember g ember-circle-ci [--exam=X]`.

### Configuration for application

It will provides a `test_and_build` workflow, as follows:

![checkout code / install dependencies / run lint (js and hbs) / run tests (default)](https://raw.githubusercontent.com/GreatWizard/ember-circleci/master/doc/workflow-app.png)

### Configuration for addon

It will provides a `test_matrix` workflow, as follows:

![checkout code / install dependencies / run lint (js and hbs) / run tests (default, LTS 3.12, LTS 3.16, release, beta, canary, default with jquery and classic)](https://raw.githubusercontent.com/GreatWizard/ember-circleci/master/doc/workflow-addon.png)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
