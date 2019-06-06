import Application from "../app";
import config from "../config/environment";
import { setApplication } from "@ember/test-helpers";
<% if (exam) { %>import start from "ember-exam/test-support/start";
<% } else { %>import { start } from "ember-qunit";
<% } %>
setApplication(Application.create(config.APP));

start();
