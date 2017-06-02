var login = function() {
  "use strict";

  var init = function (data, callback) {
    data.display = !(sessionStorage.authState == "AUTHENICATING");
    
    callback(data);
  }
    
  return {
	  init : init
  }
}();