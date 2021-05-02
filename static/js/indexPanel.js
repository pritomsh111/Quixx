$(document).ready(function () {
	md.initDashboardPageCharts();
});

var buttonUpdate = document.getElementById('modalUpdateA');
function dashio() {
	var user = localStorage.getItem('user');
	var dash;
	if (user == 'SUPER_ADMIN') {
		dash = 'dashboard'
	} else if (user == 'ORGANIZATIONAL_ADMIN') {
		dash = 'dashboardOrg'
	} else if (user == 'MANAGER') {
		dash = 'dashboardMan'
	} else if (user == 'MERCHANT') {
		dash = 'dashboardMer'
	}
	if (window.location.hash.substr(1) != dash) {
		$(".nav").find(".active").removeClass("active");
		window.location.hash = dash;
	}
};

$(".toggle-password").click(function () {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

function milse() {
	var agerPass = document.getElementById("password-field1").value;
	var msg = document.getElementById("msg").innerHTML;
	if (agerPass.length > 0 && msg == "Password Matched!") {
		buttonUpdate.disabled = false;
	}
	else {
		buttonUpdate.disabled = true;
	}
}

function passc() {
	$('.frm').show();
	buttonUpdate.disabled = true;
	$('#msg').html("");
	// document.getElementById('userName').value = localStorage.getItem('Nginx');
	$("#myModalFor").modal('show');
	$('#tick223').hide();
	$("#sure223").html("");
	$(".circle-loader2").removeClass("load-complete2");
	$(".circle-loader2").hide();
}

$('#password-field2').on('keyup', function () {
	var pas3 = document.getElementById('password-field2').value;
	if ($(this).val().length >= 8 && $(this).val() == $('#password-field3').val()) {
		$('#msg').html('Password Matched!').css('color', 'green');

		var agerPass = document.getElementById("password-field1").value;

		if (agerPass.length > 0) {
			buttonUpdate.disabled = false;
		}
		else {
			buttonUpdate.disabled = true;
		}
	}
	else if (pas3.length > 0) {
		buttonUpdate.disabled = true;
		$('#msg').html('Password Do Not Match!').css('color', 'red');
	}
});

$('#password-field3').on('keyup', function () {
	if ($(this).val().length >= 8 && $(this).val() == $('#password-field2').val()) {
		$('#msg').html('Password Matched!').css('color', 'green');
		var agerPass = document.getElementById("password-field1").value;

		if (agerPass.length > 0) {
			buttonUpdate.disabled = false;
		}
		else {
			buttonUpdate.disabled = true;
		}
	}
	else {
		buttonUpdate.disabled = true;
		$('#msg').html('Password Do Not Match!').css('color', 'red');
	}
});

$('.btn-ok1k').click(function () {
	$("#myModalFor").modal('show');
	document.getElementById('modalCancelA').disabled = true;
	document.getElementById('modalUpdateA').disabled = true;
	$('#tick223').hide();
	$(".circle-loader2").removeClass("load-complete2");
	$(".circle-loader2").show();
	$("#sure223").html("Please wait!");
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "approved/change/password/" + localStorage.getItem('userID'),
			data: JSON.stringify
				({
					"prev_password": document.getElementById('password-field1').value,
					"new_password": document.getElementById('password-field2').value,
					"confirm_password": document.getElementById('password-field3').value
				}),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.status == 'OK') {
					setTimeout(function () {
						$(".circle-loader2").addClass("load-complete2");

						$('#tick223').show();

						$("#sure223").html("Password Updated!");
					}, 1000);
					document.getElementById('password-field1').value = "";
					document.getElementById('password-field2').value = "";
					document.getElementById('password-field3').value = "";
					setTimeout(function () {
						$("#myModalFor").modal('hide');
						document.getElementById('modalCancelA').disabled = false;
						document.getElementById('modalUpdateA').disabled = false;
					}, 2000);
				}
			},
			error: function (data) {

				document.getElementById('modalCancelA').disabled = false;
				document.getElementById('modalUpdateA').disabled = false;
				$("#myModalFor").modal('hide');
				var ob = Object.keys(data);
				if (ob[17] == "responseJSON") {
					$("#kiHoyeche").html(data.responseJSON.errorMessage);
				}
				else {
					$("#kiHoyeche").html("Please wait, We're Working!");
				}
				$('#myModalForE2').modal('show');
			}
		})
});