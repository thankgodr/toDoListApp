var ref = new Firebase("https://todolistapp23.firebaseio.com/");
var authtoken = sessionStorage.getItem('token'),
  uid;

//time to date
function to12hrs(mi) {
  var offset = 10;
  var d = new Date(mi + (3600000 * offset));
  return d.toGMTString()
}

//Firebase Authentiate or reidrect back to logon page
ref.auth(authtoken, function(error, result) {
  if (error) {
    console.log("Authentication Failed!", error);
    window.location.href = "register.html";
  } else {
    uid = result.uid
    var useref = ref.child("todo");
    useref.child(uid).on("value", function(snapshot) {
      console.log(snapshot.val())
      $("#taskrow").html();
      var datasnap = snapshot.val();
      for (key in datasnap) {
        var date = new Date(parseInt(key))
        $("#taskrow").append(
          '<div class="col-lg-3 col-sm-2 todolistbg " id="' + key + '""><p>' + datasnap[key].name +
          '</p><p>Date: ' + datasnap[key].date + '</p><p><a href="#">Read More</a></p></div>')
      }
    }, function(errorObject) {
      $("#taskrow").append('<div class="col-sm-3 col-md-6 col-lg-4"><header>No Task in your List</header><main></main></div>');

      console.log("The read failed: " + errorObject.code);
    });
    console.log("Auth expires at:", new Date(result.expires * 1000));
  }
})




$(document).ready(function() {
  /*
        Modals
    */
  $('.launch-modal').on('click', function(e) {
    e.preventDefault();
    $('#' + $(this).data('modal-id')).modal();
  });

  $('.login-form').on('submit', function() {
    var timeInMs = Date.now();
    var name = $(this).find('input[name="toDoName"]').val();
    var desc = $(this).find('input[name="form-desc"]').val();
    var date = $(this).find('input[name="form-date"]').val();
    var time = $(this).find('input[name="form-time"]').val();
    var refTodo = ref.child("todo");
    refTodo.child(uid).child(timeInMs).set({
      'name': name,
      'desc': desc,
      'date': date,
      'time': time
    });
  });

  // Log out and redirect when the button is click
  $('#logoubtn').click(function() {
    sessionStorage.setItem('token', "null");
    alert("You just logged out");
    window.location = "register.html";
  });

});