var account = function() {

  var writeUser = function(user) {
    var userRef = firebase.database().ref('users/' + user.uid)
 
    for (var key in user) {
      userRef.child(key).set(user[key]);
    }
  };

  var readUser = function readUserData(user, callback) {
    return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      var dbUser = snapshot.val();
    
      callback(user, dbUser);
    });
  };

  var updateUserRole = function updateUserRole(role) {
    var user = JSON.parse(sessionStorage.user);
   
    user.role = role;
    if ( role == 'performer' )  {
      user.totalVotes = 0;
    }
  
    writeUser(user);
  };

  return {
	  writeUser : writeUser,
	  readUser : readUser,
	  updateUserRole : updateUserRole 
  }
}();
  
