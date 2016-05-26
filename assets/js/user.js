$(document).ready(function() {
  var ref = new Firebase("https://todolistapp23.firebaseio.com/");
  var usersRef = ref.child("users");
  $('.form-google-button').click(function() {
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        alert("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        usersRef.child(authData.uid).set({
          details: {
            gender: authData.google.cachedUserProfile.gender,
            full_name: authData.google.cachedUserProfile.name,
            picture: authData.google.cachedUserProfile.picture,
          }
        });
        sessionStorage.setItem('token', authData.token);
        window.location = "index.html";
      }
    });
  });

  $('.form-facebook-button').click(function() {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });

  $('.form-twitter-button').click(function() {
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });
});