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
  
      return firebase.database().ref('/votes/' + data.currentUser.uid).once('value', function(snapshot) {
        var votes = [];
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          
          if ( data.videos.indexOf(childKey) > -1 ) {
            var vote = new Object;
            vote[childKey] = childData.value;
            
            votes.push(vote);
          }
        });
      
        data.votes = votes;
        callback(data);
      });
        
      callback(data);
    });
  }
   
  var pauseVideo = function() {
    var div = document.getElementById("video-container");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
  
  var vote = function(user, video, value) {
    var userVoteRef = firebase.database().ref('votes/' + user + '/' + video)
    userVoteRef.child("value").set(value);
  };
  
  return {
	  init : init,
	  pauseVideo : pauseVideo,
	  vote : vote
  }
}();

