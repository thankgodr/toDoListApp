var ref = new Firebase("https://todolistapp23.firebaseio.com/");
var authtoken = sessionStorage.getItem('token'),
  uid;

//Firebase Authentiate or reidrect back to logon page
ref.auth(authtoken, function(error, result) {
  if (error) {
    console.log("Authentication Failed!", error);
    window.location = "register.html";
  } else {
    uid = result.uid
    var useref = ref.child("todo");
    useref.child(uid).on("value", function(snapshot) {
      for(key in snapshot.val()){
        console.log(key);
      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log("Auth expires at:", new Date(result.expires * 1000));
  }
})

jQuery(document).ready(function() {
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

});