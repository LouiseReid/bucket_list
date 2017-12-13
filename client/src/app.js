var app = function(){
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);
    displayMap();
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
    var countyList = JSON.parse(jsonString);
}

var displayMap = function(){
  var map = document.getElementById('container');
  var center = {lat: 0, lng: 0};
  var mainMap = new MapWrapper(map, center, 5);
}

window.addEventListener("load", app);
