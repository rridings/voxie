var auth = function() {

  var googleSignIn = function () {
    sessionStorage.authState = "AUTHENICATING";
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithRedirect(provider);
  }

  var facebookSignIn = function () {
    sessionStorage.authState = "AUTHENICATING";
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('email');

    firebase.auth().signInWithRedirect(provider);
  }

  var twitterSignIn = function () {
    sessionStorage.authState = "AUTHENICATING";
    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  } 

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
    
      console.log("Authenication");

      // The signed-in user info.
      var user = new Object();
      user.uid = result.user.uid;
      user.name = result.user.displayName;
      user.email = result.user.email;
      user.photoURL = result.user.photoURL;
      
      window.location.hash = "#spectator";
      account.readUser(user, findUserCallback);
    }
  }).catch(function(error) {
    sessionStorage.authState = "NOT_AUTHENICATED";
    sessionStorage.user = null;
  
    console.log("Failed");
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  var findUserCallback = function(user, dbUser) {
    sessionStorage.authState = "AUTHENICATED";

    if ( dbUser == null ) {
      user.credits = 0;
      account.writeUser(user);
    }
    else {
      user = dbUser;
    }
  
    if ( user.role != null ) {
      window.location.hash = "#spectator";    
    } 
    else {
      window.location.hash = "#role";
    }
    sessionStorage.user = JSON.stringify(user);
  };
  
  return {
	  googleSignIn : googleSignIn,
	  facebookSignIn : facebookSignIn,
	  twitterSignIn : twitterSignIn
  };
}();