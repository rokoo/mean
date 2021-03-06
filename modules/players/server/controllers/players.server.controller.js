'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port: '3306',
      user : 'root',
      password : 'mysql',
      database : 'atp'
    },
    pool: { min: 0, max: 7
    }
  });
  knex('atp_players')
  .limit(10)
  .then(function(obj) {
      res.json(obj);
  });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};

/**
 * Article middleware
 */
exports.playersByRange = function (req, res, next, id) {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port: '3306',
      user : 'root',
      password : 'mysql',
      database : 'atp'
    },
    pool: { min: 0, max: 7
    }
  });
  knex('atp_players')
  .limit(5)
  .then(function(obj) {
      res.json(obj);
  });
};

exports.playerByCountry = function (req, res, next, country) {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port: '3306',
      user : 'root',
      password : 'mysql',
      database : 'atp'
    },
    pool: { min: 0, max: 7
    }
  });
  knex('atp_players').where('country',country)
  .limit(5)
  .then(function(obj) {
      res.json(obj);
  });
};

exports.matchesByTourney = function (req, res, next, tourneyId) {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port: '3306',
      user : 'root',
      password : 'mysql',
      database : 'atp'
    },
    pool: { min: 0, max: 7
    }
  });
  knex('atp_matches_2016').where('tourney_name','Australian Open')
  .then(function(rows) {
    var arr = [];
    rows.forEach(element => {
        var obj = new Object;
        obj.round = element.round;
        obj.winner = element.winner_name;
        obj.loser = element.loser_name;
        obj.name = element.winner_name;
        arr.push(obj);
      });
    return arr;
  }).then(function(matches) {
    var rounds = ['F', 'SF', 'QF','R16','R32','R64','R128'];
    var roundMatches = [];
    rounds.forEach(round => {
      var matchRound = [];
      matches.forEach(match => {
        if(match.round == round) {
          matchRound.push(match);
        }
      });
      roundMatches.push(matchRound);
    });
    return roundMatches;
  }).then(function(roundMatches) {
    while(roundMatches.length > 1) {
      var roundMatchesNode = roundMatches.pop();
      var roundMatchesParent = roundMatches.pop();
      roundMatchesParent.forEach(parentMatch => {
        parentMatch.children = [];
        roundMatchesNode.forEach(nodeMatch => {
          if(parentMatch.winner == nodeMatch.winner || parentMatch.loser == nodeMatch.winner) {
            parentMatch.children.push(nodeMatch);
          }
        });
      });
      roundMatches.push(roundMatchesParent);
    }
    return roundMatches.pop();
  }).then(function(obj) {
    // console.log(JSON.stringify(obj));
    res.json(obj);
  });
};
