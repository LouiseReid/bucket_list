CountryView = function(countries){
  this.render(countries)
}

CountryView.prototype.render = function (countries) {
  countries.forEach(function(country){
    var lat = parseFloat(country.lat)
    var lng = parseFloat(country.lng)
    mainMap.addMarker({lat: lat, lng: lng})
  })
};


module.exports = CountryView;
