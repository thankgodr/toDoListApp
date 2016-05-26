
//Global variables 
var ref = new Firebase("https://todolistapp23.firebaseio.com/");
var authtoken = sessionStorage.getItem('token'),
  uid;

//milliseconds to time
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

//Firebase Authentiate or reidrect back to logon page
ref.authWithCustomToken(authtoken, function(error, result) {
  if (error) {
    alert("You need to Login");
    window.location.href = "register.html";
  } else {
    uid = result.uid;
    var useref = ref.child("todo");
    useref.child(uid).on("value", function(snapshot) {
      $("#taskrow").html();
      var datasnap = snapshot.val();
      for (var key in datasnap) {
        var date1 = new Date();
        var j = date1.getTime();
        var d = datasnap[key].date;
        if (j - datasnap[key].alert < 30000 && datasnap[key].alert == isNaN && datasnap[key].date < j) {
          setInterval(function() {
            alert("You have" + datasnap[key].name + " now");
          }, j - datasnap[key].alert);
        }
        var date = new Date(d);
        $("#taskrow").append(
          '<div class="col-lg-3 col-sm-2 todolistbg " id="' + key + '""><p>' + datasnap[key].name +
          '<p>' + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + '</p>' + msToTime(date) + '</p><p><a href="#">Read More</a></p></div>');
      }
    }, function(errorObject) {
      $("#taskrow").append('<div class="col-sm-3 col-md-6 col-lg-4"><header>No Task in your List or There was an error</header><main></main></div>');
    });
  }
});




$(document).ready(function() {
  /*
    Date Validation to make sure date is future date or today
  */

  var input = document.getElementById("form-date");
  var today = new Date();
  var day = today.getDate();

  // Set month to string to add leading 0
  var mon = new String(today.getMonth() + 1); //January is 0!
  var yr = today.getFullYear();

  if (mon.length < 2) {
    mon = "0" + mon;
  }
  if (day.length < 2) {
    dayn = "0" + day;
  }

  var date = yr + '-' + mon + '-' + day;

  input.disabled = false;
  input.setAttribute('min', date);

  //-------------------------------------------------------\\

  /*
        Modals
    */
  $('.launch-modal').on('click', function(e) {
    e.preventDefault();
    $('#' + $(this).data('modal-id')).modal();
  });
  // When the add button is clicked
  $('.login-form').on('submit', function() {
    var timeInMs = Date.now();
    var name = $(this).find('input[name="toDoName"]').val();
    var desc = $(this).find('input[name="form-desc"]').val();
    var dateStr = $(this).find('input[name="form-date"]').val();
    var time = $(this).find('input[name="form-time"]').val();
    dateStr = dateStr.split("-").join("/");
    var date = new Date(dateStr + " " + time + ":00");
    date = date.getTime();
    var refTodo = ref.child("todo");
    refTodo.child(uid).child(timeInMs).set({
      'name': name,
      'desc': desc,
      'date': date + 3600000,
      'alert': date - 300000
    });
  });

  // Log out and redirect when the button is click
  $('#logoubtn').click(function() {
    sessionStorage.setItem('token', "null");
    alert("You just logged out");
    window.location = "register.html";
  });

});