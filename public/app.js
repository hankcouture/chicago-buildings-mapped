var app = angular.module('chicago', [
  'chicago.map',
  'ui.router'
])

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/map");
  //
  // Now set up the states
  $stateProvider
    .state('map', {
      url: "/map",
      templateUrl: "views/map.html",
      controller: "MapController"
    })
});