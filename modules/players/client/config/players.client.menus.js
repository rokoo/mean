(function () {
  'use strict';

  angular
    .module('players')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'ATP',
      state: 'atp',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'atp', {
      title: 'ATP Players',
      state: 'players.list',
      roles: ['*']
    });
  }
}());
