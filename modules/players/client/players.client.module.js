(function (app) {
  'use strict';

  app.registerModule('players', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('players.admin', ['core.admin']);
  app.registerModule('players.admin.routes', ['core.admin.routes']);
  app.registerModule('players.services');
  app.registerModule('players.routes', ['ui.router', 'core.routes', 'players.services']);
}(ApplicationConfiguration));
