var Map = angular.module('chicago.map', [])

Map.controller('MapController', ['$scope', '$http', function($scope, $http) {

  $scope.buildings = undefined // will get defined when the "getBuildings" function runs;

  $scope.initMap = function() {
    var mapLatLng = {lat: 41.882018, lng: -87.629496};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: mapLatLng
    });

    var buildings = $scope.buildings;

    for (var m = 0; m < buildings.length; m++) {
      var latitude = parseFloat(buildings[m].coordinates[0]);
      var longitude = parseFloat(buildings[m].coordinates[1]);
      infowindow = new google.maps.InfoWindow({
          content: buildings[m].name
        });
      var content = '<div class="infoWindow"><p>'+buildings[m].name+'</p></div>'
      loc = {lat: latitude, lng: longitude};
      marker = new google.maps.Marker({
          position: loc,
          map: map,
          title: buildings[m].name,
          icon: '/assets/red-dot.png'
        });
        google.maps.event.addListener(marker,'mouseover', (function(marker,content,infowindow){ 
          return function() {
              infowindow.setContent(content);
              infowindow.open(map, marker);
          };
      })(marker,content,infowindow));
      google.maps.event.addListener(marker,'mouseout', (function(marker,content,infowindow){ 
          return function() {
              infowindow.close();
          };
      })(marker,content,infowindow));
    }
  }

  $scope.addBuilding = function(name, coordinates, url) {
    var arr = coordinates.split(',')
    var lat = arr[0]
    var lon = arr[1].slice(1)
  	var data = {
      name: name,
      coordinates: [lat, lon],
      url: url
    };
  	$http({
  		method: 'POST',
  		url: '/',
  		data: data
  	}).then(function(res) {
  		console.log(res.data)
    })
  }

  $scope.getBuildings = function() {
    $http({
      method: 'GET',
      url: '/buildings',
    }).then(function(res) {
      $scope.buildings = res.data.results;
      console.log($scope.buildings);
      $scope.initMap();
    })
  }

  $scope.getBuildings();

}]);