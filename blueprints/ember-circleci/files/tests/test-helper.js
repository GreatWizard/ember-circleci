import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
<% if (exam) { %>import start from 'ember-exam/test-support/start';
<% } else { %>import { start } from 'ember-qunit';
<% } %>

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
