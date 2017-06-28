var spectator = function() {
  "use strict";

  var init = function (data, callback) {
    return firebase.database().ref('/users/').on('value', function(snapshot) {
      var performers = [];
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
      
        childData.totalVotes = 5;
        if ( childData.role == "performer" ) {
          performers.push(childData);
        }
      });
    
      data.performers = performers;
      
      var plen = performers.length;
      var i;
      
      for (i = 0; i < plen; i++) {
        var total = 0;
        var performer = performers[i];
        var voteRef = firebase.database().ref('/votes/' + performer.uid + '/');
        voteRef.on('value', function(snapshot) {
          var videos = snapshot.val();
          var vote;
          Object.keys(videos).forEach(function(key) {
            vote = videos[key];
            total = total + parseInt(vote.value);
          });
          
          performer.totalVotes = total;
          callback(data);
        });
      }
    });
  }
  
  return {
	  init : init
  }
}();