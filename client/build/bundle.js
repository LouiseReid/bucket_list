/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var map = __webpack_require__(1)

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype.addMarker = function(coords, owner){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  attachInfoWindow(owner);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map