
jQuery(document).ready(function() {
    //Firebase Authentiate or reidrect back to logon page
	var ref = new Firebase("https://todolistapp23.firebaseio.com/");
    var authtoken = sessionStorage.getItem('token');
    var uid;
    ref.auth(authtoken, function(error, result) {
      if (error) {
        console.log("Authentication Failed!", error);
        window.location = "register.html";
      } else {
        uid = result.uid
        console.log("Auth expires at:", new Date(result.expires * 1000));
      }
    })


    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
    
    /*
        Form validation
   
	$('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });
     */

    $('.login-form').on('submit', function() {
        var name = $(this).find('input[name="toDoName"]').val();
        var desc = $(this).find('input[name="form-desc"]').val();
        var date = $(this).find('input[name="form-date"]').val();
        var time = $(this).find('input[name="form-time"]').val();
        var refTodo = ref.child("todo");
        refTodo.child(uid).set({ uid : {
           'name': name,
           'desc': desc,
           'date': date,
           'time': time
        }})
    });

 });
