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
  
  return {
	  init : init,
	  pauseVideo : pauseVideo
  }
}();

