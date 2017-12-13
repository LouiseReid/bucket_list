var map = require('./mapWrapper')

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
  displayMap();

  // var select = document.getElementById('countries-list')
  // select.addEventListener('change', function(){
  //   console.log(select.selectedIndex)
  //   console.log()
  // })
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
  populateSelect(countryList)
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

var displayMap = function(){
  var map = document.getElementById('map-container');
  var center = {lat: 0, lng: 0};
  var mainMap = new MapWrapper(map, center, 5);
};


window.addEventListener("load", app);
