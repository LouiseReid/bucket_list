var app = function(){
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);
};

var makeRequest = function(url, callback){
    request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}


window.addEventListener("load", app);
