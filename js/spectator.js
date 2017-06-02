var spectator = function() {
  "use strict";

  var init = function (data, callback) {
    return firebase.database().ref('/users/').on('value', function(snapshot) {
      var performers = [];
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
      
        if ( childData.role == "performer" ) {
          performers.push(childData);
        }
      });
    
      data.performers = performers;
      callback(data);
    });
  }
    
  var findPerformer = function(uid) {
    window.location.hash = "#performer/" + uid; 
  }
  
  return {
	  init : init,
	  findPerformer : findPerformer
  }
}();