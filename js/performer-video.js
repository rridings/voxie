var performervideo = function() {
  "use strict";

  var init = function (data, callback) {   
    return firebase.database().ref('/videos/' + data.uid).once('value', function(snapshot) {
      var videos = [];
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
      
        videos.push(childData);
      });
    
      data.videos = videos;
  
      callback(data);
    });
  }
   
  return {
	  init : init
  }
}();

