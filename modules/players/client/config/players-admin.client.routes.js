(function () {
  'use strict';

  angular
    .module('players.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.players', {
        abstract: true,
        url: '/players',
        template: '<ui-view/>'
      })
      .state('admin.players.list', {
        url: '',
        templateUrl: '/modules/players/client/views/admin/list-players.client.view.html',
        controller: 'PlayersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.players.create', {
        url: '/create',
        templateUrl: '/modules/players/client/views/admin/form-players.client.view.html',
        controller: 'PlayersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          playerResolve: newplayer
        }
      })
      .state('admin.players.edit', {
        url: '/:playerId/edit',
        templateUrl: '/modules/players/client/views/admin/form-player.client.view.html',
        controller: 'PlayersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ playerResolve.title }}'
        },
        resolve: {
          playerResolve: getplayer
        }
      });
  }

  getplayer.$inject = ['$stateParams', 'PlayersService'];

  function getplayer($stateParams, PlayersService) {
    return PlayersService.get({
      playerId: $stateParams.playerId
    }).$promise;
  }

  newplayer.$inject = ['PlayersService'];

  function newplayer(PlayersService) {
    return new PlayersService();
  }
}());
