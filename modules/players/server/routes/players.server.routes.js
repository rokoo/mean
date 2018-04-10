'use strict';

/**
 * Module dependencies
 */
var playersPolicy = require('../policies/players.server.policy'),
  players = require('../controllers/players.server.controller');

module.exports = function (app) {
  // players collection routes
  app.route('/api/players')
    .get(players.list)
    .post(players.create);

  // Single article routes
  app.route('/api/players/:playerId')
    .get(players.read)
    .put(players.update)
    .delete(players.delete);

  // Finish by binding the article middleware
  app.param('playerId', players.articleByID);
};
