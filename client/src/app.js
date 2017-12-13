var map = require('./mapWrapper')

var app = function(){
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestAllCountries);
    var url = "http://localhost:3000/countries";
    makeRequest(url, requestUsers);
    displayMap();
    var userDropper = document.getElementById('user-dropper');
    userDropper.addEventListener("change", function(){
      makeRequest(url, requestUserCountries);
    });

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
    populateCountries(countryList)
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

//
var populateCountries = function(countryList) {
  var select = document.getElementById("countries-list");
  countryList.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
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
  bucketList.forEach(function(item){
      if (item.name === userName){
        var liTag = document.createElement('li');
        liTag.innerText = item.country;
        bList.appendChild(liTag);
      }
  });
}

var displayMap = function(){
  var map = document.getElementById('map-container');
  var center = {lat: 0, lng: 0};
  var mainMap = new MapWrapper(map, center, 5);
};



window.addEventListener("load", app);
