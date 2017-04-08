$.register = function() {
	return {
		init : function() {
			$.validator.setDefaults({
			    submitHandler: function() {
			    	$.register.register();
			    }
			});
			$(document).ready(function() {
			    $("#rForm").validate();
			});

			$('#register-button').click(function (event) {
				event.preventDefault();
				$('form').fadeOut(500);
				$('.wrapper').addClass('form-success');
			});
		},
		register : function() {
	    	var name = $('#rname').val();
	    	var password = $('#rpassword').val();
	    	var email = $('#remail').val();
			var data = {
			    data: JSON.stringify({
		            "account_name": name,
		            "account_pwd": password,
		            "account_email": email
		        })
			};
		    $.ajax({
				    url: '/register',
				    type: 'post',
			      	data: data,
			      	success:function(data){
			      		if(data.register == 'success'){
			      			window.location.href = '/';
			      		}
			      		else{
			      			alert('name already exist!');
			      		}
			      	}
			    })
		    }
		}
	}
}();
$(document).ready(function(){
	$.register.init();
});