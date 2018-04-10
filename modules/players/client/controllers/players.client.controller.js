(function () {
  'use strict';

  angular
    .module('players')
    .controller('PlayersController', PlayersController);

  PlayersController.$inject = ['$scope', 'playerResolve', 'Authentication'];

  function PlayersController($scope, player, Authentication) {
    var vm = this;

    vm.player = player;
    vm.authentication = Authentication;

  }
}());
