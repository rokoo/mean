(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('players.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Players',
      state: 'admin.player.list'
    });
  }
}());
