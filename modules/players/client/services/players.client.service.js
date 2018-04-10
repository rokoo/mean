(function () {
  'use strict';

  angular
    .module('players.services')
    .factory('PlayersService', PlayersService);

  PlayersService.$inject = ['$resource', '$log'];

  function PlayersService($resource, $log) {
    var Player = $resource('/api/players/:playerId', {
      playerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Player.prototype, {
      createOrUpdate: function () {
        var player = this;
        return createOrUpdate(player);
      }
    });

    return Player;

    function createOrUpdate(player) {
      if (player._id) {
        return player.$update(onSuccess, onError);
      } else {
        return player.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(player) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
