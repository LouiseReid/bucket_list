MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  this.markers.push(marker);
  // attachInfoWindow(owner);
}

MapWrapper.prototype.attachInfoWindow = function(owner){
  var infowindow = new google.maps.InfoWindow({
    content: owner
  });
}

MapWrapper.prototype.removeMarker = function(){
  if (this.markers.length > 1){
    var lastMarker = this.markers.pop();
    lastMarker.setMap(null);
  }
}

MapWrapper.prototype.recenterMap = function(newCoords){
  this.googleMap.setCenter(newCoords);
}

MapWrapper.prototype.goToGeolocation = function(map){
  navigator.geolocation.getCurrentPosition(function(position){
    map.googleMap.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
  });
}
