$(document).ready(function(){
	var ref = new Firebase("https://todolistapp23.firebaseio.com/");


	$('.login-form').on('submit', function() {
		var name = $(this).find('input[name="toDoName"]').val();
		var desc = $(this).find('input[name="form-desc"]').val();
		var date = $(this).find('input[name="form-date"]').val();
		var time = $(this).find('input[name="form-time"]').val();
		console.log(name);
	});

})
