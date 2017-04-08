$.login = function() {
	return {
		init : function() {
			$.validator.setDefaults({
			    submitHandler: function() {
			    	window.location.href = '/';
			    }
			});
			$(document).ready(function() {
			    $("#lForm").validate();
			});

			$('#login-button').click(function (event) {
				event.preventDefault();
				$('form').fadeOut(500);
				$('.wrapper').addClass('form-success');
			});
		},
		login : function() {
	    	var name = $('#lname').val();
	    	alert(name);
	    	var password = $('#lpassword').val();
			var data = {
			    data: JSON.stringify({
		            "account_name": name,
		            "account_pwd": password
		        })
			};
		    $.ajax({
			    url: '/login',
			    type: 'post',
				dataType: "json",
		      	data: data,
		      	success:function(data){
		      		if(data.login == 'success'){
		      			window.location.href = '/';
		      		}
		      		else{
		      			alert('name or password wrong!');
		      		}
		      	}
		    })
		}
	}
}();
$(document).ready(function(){
	$.login.init();
});