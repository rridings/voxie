var writeUser = function(user) {
  var obj = new Object();
  obj[user.uid] = user;
  
  $.ajax({
    url: 'https://amplified-time-153819.firebaseio.com/users.json',    //Your api url
    type: 'PUT',   //type is any HTTP method
    data: JSON.stringify(obj),      //Data as js object
    success:function(){
      alert("success");
    }
  });
}

var readUser = function readUserData(user, token, callback) {
    
  $.ajax({
    url: 'https://amplified-time-153819.firebaseio.com/users/' + user.uid + '.json?auth=' + token,
    type: 'GET'
  }).done(function(data){
    callback(user, data);
  }); 
}

var updateUserRole = function updateUserRole(token) {
  var user = JSON.parse(sessionStorage.user);
  var role = $('input[name=role]').val()    
  
  var obj = new Object;
  obj.role  = role;
    
  $.ajax({
    url: 'https://amplified-time-153819.firebaseio.com/users/' + user.uid + '.json', 
    type: 'PATCH',   
    data: JSON.stringify(obj),      
    success:function(){
      alert("success");
    }
  });
}