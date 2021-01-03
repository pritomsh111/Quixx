var scrollAnimation;
var position =
	document.body.scrollTop || document.documentElement.scrollTop;
if (position) {
	window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
	scrollAnimation = setTimeout("scrollToTop()", 30);
} else clearTimeout(scrollAnimation);

function scrollToTop() {
	var position =
		document.body.scrollTop || document.documentElement.scrollTop;
	if (position) {
		window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
		scrollAnimation = setTimeout("scrollToTop()", 30);
	} else clearTimeout(scrollAnimation);
}

document.getElementById('orgCreate').addEventListener("click", function (event) {
	//event.preventDefault();
	var organizationName = document.getElementById('organizationName').value;
	var emailId = document.getElementById('emailId').value;
	var contactNumber = document.getElementById('contactNumber').value;
	var businessField = document.getElementById('businessField').value;
	var deliveryRange = document.getElementById('deliveryRange').value;
	var tradeLicence = document.getElementById('tradeLicence').value;
	var organizationalFaceBookLink = document.getElementById('organizationalFaceBookLink').value;
	var organizationWebsite = document.getElementById('organizationWebsite').value;

	var v1 = () => {

		if (tradeLicence == "" || tradeLicence == null) {
			document.getElementById('wrongThis').innerHTML = "Trade License cannot be empty!";
			$('#myModalWrong').modal('show');
			document.getElementById("tradeLicence").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (parseInt(deliveryRange) <= 0 || deliveryRange.charAt(0) == 0) {
			document.getElementById('wrongThis').innerHTML = "Delivery Range must be greater than 0!";
			$('#myModalWrong').modal('show');
			document.getElementById("deliveryRange").focus();
			return 0;
		}
		else if (isNaN(deliveryRange) == true || deliveryRange == "" || !/\D/.test(deliveryRange) == false) {
			document.getElementById('wrongThis').innerHTML = "Delivery Range must be a number!";
			$('#myModalWrong').modal('show');
			document.getElementById("deliveryRange").focus();
			return 0;
		}
		else if (!/\D/.test(deliveryRange) == true) {
			return 1;
		}
	}
	var v3 = () => {
		if (businessField == "" || businessField == null) {
			document.getElementById('wrongThis').innerHTML = "Business Field cannot be empty!";
			$('#myModalWrong').modal('show');
			document.getElementById("businessField").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v4 = () => {
		if (contactNumber == "" || contactNumber == null) {
			document.getElementById('wrongThis').innerHTML = "Phone Number cannot be empty!";
			$('#myModalWrong').modal('show');
			document.getElementById("contactNumber").focus();
			return 0;
		}
		else if ((contactNumber.length < 11 || contactNumber.length > 11) && !/\D/.test(contactNumber) == true) {
			document.getElementById('wrongThis').innerHTML = "Phone Number must be of 11 digits!";
			$('#myModalWrong').modal('show');
			document.getElementById("contactNumber").focus();
			return 0;
		}
		else if (contactNumber.match(/\d/g).length === 11 && !/\D/.test(contactNumber) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThis').innerHTML = "Phone Number not valid!";
			$('#myModalWrong').modal('show');
			document.getElementById("contactNumber").focus();
			return 0;
		}
	}
	var v5 = () => {
		if (emailId == "" || emailId == null) {
			document.getElementById('wrongThis').innerHTML = "Email cannot be empty!";
			$('#myModalWrong').modal('show');
			document.getElementById("emailId").focus();
			return 0;
		}
		else if (emailId != "" || emailId != null) {
			var em = emailId.split("@").length - 1;
			var atposition = emailId.indexOf("@");
			var dotposition = emailId.lastIndexOf(".");
			if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailId.length || em > 1) {
				document.getElementById('wrongThis').innerHTML = "Please enter a valid e-mail address!";
				$('#myModalWrong').modal('show');
				document.getElementById("emailId").focus();
				return 0;
			}
			else {
				return 1;
			}
		}

	}
	var v6 = () => {
		if (organizationName == "" || organizationName == null) {
			document.getElementById('wrongThis').innerHTML = "Organization Name cannot be empty!";
			$('#myModalWrong').modal('show');
			document.getElementById("organizationName").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	if (v6() == 1 && v5() == 1 && v4() == 1 && v3() == 1 && v2() == 1 && v1() == 1) {
		document.getElementById('orgCreate').disabled = true;
		document.getElementById('orgCreate').innerHTML = "Please wait!";

		document.getElementById('page-top').style.pointerEvents = "none";
		$.ajax
			({
				type: "POST",
				url: urlForAll + "initUser/create",
				data: JSON.stringify
					({
						"organizationName": organizationName,
						"tradeLicence": tradeLicence,
						"businessField": businessField,
						"contactNumber": contactNumber,
						"emailId": emailId,
						"deliveryRange": deliveryRange,
						"organizationalFaceBookLink": organizationalFaceBookLink,
						"organizationWebsite": organizationWebsite
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				success: function (data) {
					if (data.status == 'OK') {
						var position =
							document.body.scrollTop || document.documentElement.scrollTop;
						if (position) {
							window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
							scrollAnimation = setTimeout("scrollToTop()", 30);
						} else clearTimeout(scrollAnimation);

						$('#modal-container').removeAttr('class').addClass('one');
						document.getElementById("myForm").style.display = "none";
						$('.success').addClass('modal-active');
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							document.getElementById('kotha1').innerHTML = "Congratulations!";
							document.getElementById('kotha2').innerHTML = "You have successfully registered your organization!";
							document.getElementById("tick").style.display = "block";
							setTimeout(function () {
								document.getElementById('page-top').style.pointerEvents = "auto";
							}, 1000);

						}, 3000);

						document.getElementById("myForm").reset();
						document.getElementById('kotha1').innerHTML = "";
						document.getElementById('kotha2').innerHTML = "";
						document.getElementById('orgCreate').innerHTML = "Create your account";
						document.getElementById('orgCreate').disabled = false;

					}
				},
				error: function (data) {
					//console.log(data);
					document.getElementById('page-top').style.pointerEvents = "auto";
					document.getElementById('orgCreate').innerHTML = "Create your account";
					document.getElementById('orgCreate').disabled = false;
					document.getElementById('wrong').innerHTML = data.responseJSON.errorMessage + 's';
					$('#myModal').modal('show');
				}
			})
	}
});

$('#modal-container').click(function () {
	$(".circle-loader").removeClass("load-complete");
	document.getElementById("tick").style.display = "none";
	$(this).addClass('out');
	$('.success').removeClass('modal-active');
	setTimeout(function () {
		document.getElementById("myForm").style.display = "block";
	}, 1300);

});