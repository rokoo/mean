(function () {
  'use strict';

  angular
    .module('players.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('players', {
        abstract: true,
        url: '/players',
        template: '<ui-view/>'
      })
      .state('players.list', {
        url: '',
        templateUrl: '/modules/players/client/views/list-players.client.view.html',
        controller: 'PlayersListController',
        controllerAs: 'vm'
      })
      .state('players.view', {
        url: '/:playerId',
        templateUrl: '/modules/players/client/views/view-player.client.view.html',
        controller: 'PlayersListController',
        controllerAs: 'vm',
        resolve: {
          playerResolve: getplayer
        },
        data: {
          pageTitle: '{{ playerResolve.title }}'
        }
      });
  }

  getplayer.$inject = ['$stateParams', 'PlayersService'];

  function getplayer($stateParams, PlayersService) {
    return PlayersService.get({
      playerId: $stateParams.playerId
    }).$promise;
  }
}());
