(function ($) {
    "use strict";
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 0;
        }
        
    });

})(jQuery);
$(document).ready(function() {
	var scrollAnimation;
    var position =
        document.body.scrollTop || document.documentElement.scrollTop;
	
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        scrollAnimation = setTimeout("scrollToTop()", 30);
    } else {
		clearTimeout(scrollAnimation)
	};
	
	window.addEventListener('storage', function(event){
		if (event.key == 'login-event') {
			$('#myModalLogIN').modal('show');
			setTimeout(function(){ window.location.href = "../indexPanel.html"; }, 1500);
		}
	});

});
var phoneNumber, code;
function scrollToTop() {
    var position =
        document.body.scrollTop || document.documentElement.scrollTop;
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        scrollAnimation = setTimeout("scrollToTop()", 30);
    } else clearTimeout(scrollAnimation);
}

document.getElementById('login').addEventListener("click", function(event)
{
	event.preventDefault();
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	localStorage.setItem('Nginx', username);
	
	var path = document.location.pathname;
	localStorage.setItem('NginxCode', path);
	if(username=="" || password=="")
	{
		$('#myModalForE5').modal('show');
	}
	else
	{
		localStorage.setItem('user',username);
		localStorage.setItem('pass',password);
		document.getElementById('login').disabled = true;
		if(username && password)
		{
			$.ajax
			({
				async: true,
				type: "POST",
				url: urlForAll + "login",
				headers: 
				{
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				data: JSON.stringify
				({
					"username" : username,
					"password": password
				}),
				success: function(data) 
				{
					document.getElementById('login').disabled = false;
					
					localStorage.setItem('login-event', 'login' + Math.random());
					window.location.href = "../indexPanel.html";
				},
				error: function(data) {
					document.getElementById('login').disabled = false;
					var ob = Object.keys(data);
					if(ob[17]=="responseJSON"){
						document.getElementById('whatIsWrong').innerHTML = data.responseJSON.errorMessage;
						$('#myModalHello').modal('show');
					}
					else{
						document.getElementById('whatIsWrong').innerHTML = "Please Wait! We are working!";
						$('#myModalHello').modal('show');
					}
					//console.log(textStatus);whatIsWrong
					
				}
			});
		}
	}
});


function manage1(phone){
	var buttonCode = document.getElementById('modalNext');
	if(phone.value.length<11){
		buttonCode.disabled = true;
	}
	else if(phone.value.length==11 && !/\D/.test(phone.value)==true){
		buttonCode.disabled = false;
	}
	else{
		buttonCode.disabled = true;
	}
}

function manage2(code){
	var buttonCode = document.getElementById('codeFinal');
	if(code.value.length<4){
		buttonCode.disabled = true;
	}
	else if(code.value.length==4 && !/\D/.test(code.value)==true){
		buttonCode.disabled = false;
	}
	else{
		buttonCode.disabled = true;
	}
}

function forG(){
	
	$("#myModalLabel").html("Forgot Password?");
	$('#tick22').hide();
	$(".circle-loader").removeClass("load-complete");
	$(".circle-loader").hide();
	$(".btn-okk").hide();
	$("#code").hide();
	
	$("#phone").show();
	$("#modalNext").show();
	$(".btn-ok").show();
	$("#sure22").html("Enter Phone Number:");
	$("#sure23").html("A 4-digit code will be sent to your phone number!");
	$("#sure22").show();
	$("#sure23").show();
	$("#myModalFor").modal('show');
	document.getElementById('modalNext').disabled = true;
}

$('.btn-ok').click(function(){
	
	document.getElementById('modalNext').disabled = true;
	//$("#sure22").html("Please wait!");
	phoneNumber = document.getElementById('phone').value;
	document.getElementById('phone').value = "";
	
	$.ajax
	({
		async: true,
		type: "POST",
		url: urlForAll + "forget/password/get/vCode/" + phoneNumber,
		success: function(data) 
		{
			$("#phone").hide();
			$(".btn-ok").hide();
			$(".btn-okk").show();
			$("#code").show();
			$("#sure22").html("Please enter code:");
			$("#sure23").html("New password will be sent to your phone number!");
			$("#sure23").show();
			$("#sure23").show();
			
		},
		error: function(data) {
			
			//$('#myModalFor').modal('hide');
			document.getElementById('whatIsWrong').innerHTML = data.responseJSON.errorMessage;
			$('#myModalHello').modal('show');
		}
	});
});

$('.btn-okk').click(function(){
					
	//$("#sure22").html("Please wait!");
	
	code = document.getElementById('code').value;

	document.getElementById('codeFinal').disabled = true;
	document.getElementById('modalCancel').disabled = true;
	
	$("#sure22").html("");
	$("#code").hide();

	$("#phone").hide();
	$("#code").hide();
	//$("#sure22").hide();
	$("#sure23").html("Please wait!");
	$(".circle-loader").show();
	$.ajax
	({
		async: true,
		type: "GET",
		url: urlForAll + "forget/password/submit/vCode/" + phoneNumber + "/" + code,
		success: function(data) 
		{
			$("#myModalLabel").html("Password Changed");
			setTimeout(function(){
				
				$(".circle-loader").addClass("load-complete");
				
				$('#tick22').show(); 
				$('#sure22').show(); 
			
				$("#sure23").hide();
				$("#sure22").html("Your password has been changed!<br>Please wait for SMS");
			}, 2200);
			
			setTimeout(function(){ 
					$("#myModalLabel").html("Password Changed");
					$("#myModalFor").modal('hide');
					document.getElementById('code').value = "";
					document.getElementById('phone').value = "";
					document.getElementById('modalCancel').disabled = false;
					document.getElementById('codeFinal').disabled = true;
				}, 4500);

		},
		error: function(data) {
			
			document.getElementById('code').value = "";
			document.getElementById('phone').value = "";
			document.getElementById('modalCancel').disabled = false;
			document.getElementById('codeFinal').disabled = false;
			//$('#myModalFor').modal('hide');
			
			document.getElementById('whatIsWrong').innerHTML = data.responseJSON.errorMessage;
			$('#myModalHello').modal('show');
		}
	});
});