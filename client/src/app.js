var app = function(){
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);
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
//
var populateSelect = function(countryList) {
  var select = document.getElementById("countries-list");
  countryList.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  })

}

window.addEventListener("load", app);
