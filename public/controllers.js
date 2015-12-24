var Map = angular.module('chicago.map', [])

Map.controller('MapController', ['$scope', '$http', function($scope, $http) {


  $scope.initMap = function() {
    var mapLatLng = {lat: 41.882018, lng: -87.629496};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: mapLatLng
    });
  }

  $scope.addBuilding = function(name, coordinates, url) {
  	var data = {
      name: name,
      coordinates: coordinates,
      url: url
    };
  	$http({
  		method: 'POST',
  		url: '/',
  		data: data
  	}).then(function(res) {
  		console.log(res)
  	})
  }

  $scope.initMap();

}]);