var map = require('./mapWrapper')
var CountryView = require('./views/countryView')

var app = function(){

  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestAllCountries);
  var url = "http://localhost:3000/countries";
  makeRequest(url, requestUsers);
  displayMap();
  var userDropper = document.getElementById('user-dropper');
  userDropper.addEventListener("change", function(){
    var url = "http://localhost:3000/countries";
    makeRequest(url, requestUserCountries);
  });

  var url = "https://restcountries.eu/rest/v2/all";
  var api = "/countries"

  makeRequest(url, requestComplete);
  makeRequest(api, requestComplete2);
  displayMap();

};

var makeRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};


var requestAllCountries = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var countryList = JSON.parse(jsonString);
  populateSelect(countryList)
}

var requestUsers = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var userList = JSON.parse(jsonString);
  populateUserlist(userList)
}

var requestUserCountries = function(userName){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var bucketList = JSON.parse(jsonString);
  populateBucketList(bucketList)
}

var requestComplete = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var countryList = JSON.parse(jsonString);
  addMarkerOnSubmit(countryList);
  populateSelect(countryList);
}

var requestComplete2 = function(){
  if(this.status!=200){return};
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var markers = new CountryView(countries);
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


var populateUserlist = function(userList){
  var select = document.getElementById("user-dropper");
  userList.forEach(function(user){
    var option = document.createElement('option');
    option.innerText = user.name;
    select.appendChild(option);
  })
}

var populateBucketList = function(bucketList){
  var userName = document.getElementById("user-dropper").value;
  var bList = document.getElementById("user-countries")
  bList.innerHTML = "";
  bucketList.forEach(function(item){
    if (item.name === userName){
      var liTag = document.createElement('li');
      liTag.innerText = item.country;
      bList.appendChild(liTag);
    }
  });
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
  mainMap = new MapWrapper(map, center, 2);
  console.log(mainMap.markers.length);
};



window.addEventListener("load", app);
