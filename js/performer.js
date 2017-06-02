var performer = function() {
  "use strict";

  var init = function (data, callback) {
    return firebase.database().ref('/users/' + data.uid).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      var performer = snapshot.val();
      data.performer = performer;
      
      callback(data);
    });
  }
    
  return {
	  init : init
  }
}();
