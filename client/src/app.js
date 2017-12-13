var map = require('./mapWrapper')

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
  displayMap();

  // var submit = document.getElementById("submit");
  // var latInput = document.getElementById('lat');
  // var lngInput = document.getElementById('lng');
  //
  // submit.addEventListener('click', function(){
  //
  //   latInput.value = countryList[select.selectedIndex-1].latlng[0];
  //   lngInput.value = countryList[select.selectedIndex-1].latlng[1];
  //   mainMap.addMarker(latInput.value, lngInput.value);
  // });

};

var makeRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var countryList = JSON.parse(jsonString);
  addMarkerOnSubmit(countryList);
  populateSelect(countryList);
}

var populateSelect = function(countryList) {
  var select = document.getElementById("countries-list");
  countryList.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    var latInput = document.getElementById('lat');
    var lngInput = document.getElementById('lng');
    latInput.value = countryList[select.selectedIndex-1].latlng[0];
    lngInput.value = countryList[select.selectedIndex-1].latlng[1];
  })
}

var addMarkerOnSubmit = function(countryList){
  var select = document.getElementById('countries-list')
  var submit = document.getElementById("submit");
  var latInput = document.getElementById('lat');
  var lngInput = document.getElementById('lng');


  submit.addEventListener('click', function(){
    latInput.value = countryList[select.selectedIndex-1].latlng[0];
    lngInput.value = countryList[select.selectedIndex-1].latlng[1];

    var lat = parseFloat(latInput.value);
    var lng = parseFloat(lngInput.value);
    mainMap.addMarker({lat: lat, lng: lng});
  });
}

var displayMap = function(){
  var map = document.getElementById('map-container');
  var center = {lat: 0, lng: 0};
  mainMap = new MapWrapper(map, center, 5);
  console.log(mainMap.markers.length);
};


window.addEventListener("load", app);
