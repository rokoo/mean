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

    app.route('/api/boys')
    .get(players.list)
    .post(players.create);

  // Single article routes
  app.route('/api/players/:playerId')
    .get(players.read)
    .put(players.update)
    .delete(players.delete);
    app.param('playerId', players.playersByRange);

    app.route('/api/country/players/:country')
    .get(players.read);


  // Finish by binding the article middleware
  app.param('country', players.playerByCountry);

  app.route('/api/matches/:tourney')
    .get(players.read);
    app.param('tourney', players.matchesByTourney);
};
