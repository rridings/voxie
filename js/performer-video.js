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
   
  var pauseVideo = function() {
    var div = document.getElementById("video-container");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
  
  var vote = function(user, video, value) {
    var userVoteRef = firebase.database().ref('votes/' + user + '/' + video)
    userVoteRef.child("value").set(value);
  };
  
  var getVote = function(uid, url, callback)
  {
    return firebase.database().ref('/votes/' + uid + '/' + url).once('value', function(snapshot) {
      var vote;
      snapshot.forEach(function(childSnapshot) {
        vote = childSnapshot.val();
      });

      callback(vote);
    });
  }
  
  var updateDisplay = function(vote) {
    $('#vote input:radio').prop("checked", false);
    $("#radio" + vote).prop("checked", true);
  }
  
  return {
	  init : init,
	  pauseVideo : pauseVideo,
	  vote : vote,
	  getVote : getVote,
	  updateDisplay : updateDisplay
  }
}();

