var org_ID = localStorage.getItem('userID');
var createMer = () => {
	document.getElementById('one').disabled = true;
	document.getElementById('two').disabled = false;
	document.getElementById('three').disabled = false;
	document.getElementById('one').style.fontSize = '14.5px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('three').innerHTML = 'Unapproved Merchant';
	document.getElementById('two').innerHTML = 'Approved Merchant';

	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = false;

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = false;

	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('#merchantCreate').show();
};
var invoice = (id) => {
	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			"url": urlForAll + "reports/reportForMerchant/report/" + id.id + "/" + id.name,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				window.open(urlForAll + "reports/reportForMerchant/report/" + id.id + "/" + id.name);
			},
			error: function (data) {
				document.getElementById('wrongThisMerCreate').innerHTML = data.responseJSON.errorMessage;
				$('#myModalWrongMerCreate').modal('show');
			}
		});
};
var approvedMer = () => {
	document.getElementById('two').disabled = true;
	document.getElementById('one').disabled = false;
	document.getElementById('three').disabled = false;
	document.getElementById('two').style.fontSize = '14.5px';
	document.getElementById('one').style.fontSize = '13px';
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('three').innerHTML = 'Unapproved Merchant';

	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = false;

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = false;

	$('#merchantCreate').hide();
	$('#dtBasicExample2').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	var table = $('#dtBasicExample').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			"url": urlForAll + "orgHead/merchant/approved/details/" + org_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExample_processing").style.display = "block";
			},
			success: function (data) {
				document.getElementById('two').innerHTML = 'Approved Merchant: ' + data.data.length;

				var trHTML = '';
				$.each(data.data, function (i, item) {
					var table_rows = '<tr><td>'
						+ data.data[i].merchant_id + '</td><td>'
						+ data.data[i].org_name + '</td><td>'
						+ data.data[i].person_name + '</td><td>'
						+ data.data[i].email + '</td><td>'
						+ data.data[i].phone_number + '</td><td>'
						+ data.data[i].business_filed + '</td><td>'
						+ data.data[i].per_delivery_cost + '</td><td>'
						+ data.data[i].cod_percentage + '</td><td>'
						+ '<button id="' + data.data[i].merchant_id + '$$' + data.data[i].org_name + '$$' + data.data[i].person_name + '$$' + data.data[i].email + '$$' + data.data[i].phone_number + '$$' + data.data[i].business_filed + '$$' + data.data[i].per_delivery_cost + '$$' + data.data[i].cod_percentage + '" class="btn-round btn-outline btn updateIT">Update</button></td><td>'
						+ '<button id="' + org_ID + '" name="' + data.data[i].approved_merchant_id + '" class="btn-round btn-outline btn" onclick=invoice(this)>Invoice</button>' + '</td><td>'
						+ '<button id="' + org_ID + '" name="' + data.data[i].approved_merchant_id + '" class="btn-round btn-outline btn btn-taka">Complete Payment</button>' + '</td></tr>';
					table.rows.add($(table_rows)).draw();
				});
			},
			complete: function (data) {
				document.getElementById("dtBasicExample_processing").style.display = "none";
			}
		});
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$('#dtBasicExample').show();
	$('.a').show();
}

var unApprovedMer = () => {
	document.getElementById('three').disabled = true;
	document.getElementById('two').disabled = false;
	document.getElementById('one').disabled = false;
	document.getElementById('three').style.fontSize = '14.5px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('one').style.fontSize = '13px';
	document.getElementById('two').innerHTML = 'Approved Merchant';

	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = false;

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = false;
	$('#merchantCreate').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.c').hide();
	$('.d').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	var table = $('#dtBasicExample2').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			"url": urlForAll + "orgHead/merchant/unapproved/details/" + org_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExample2_processing").style.display = "block";
			},
			success: function (data) {
				document.getElementById('three').innerHTML = 'Unapproved Merchant: ' + data.data.length;
				var trHTML = '';

				$.each(data.data, function (i, item) {
					var table_rows = '<tr><td>'
						+ data.data[i].merchant_id + '</td><td>'
						+ data.data[i].org_name + '</td><td>'
						+ data.data[i].person_name + '</td><td>'
						+ data.data[i].email + '</td><td>'
						+ data.data[i].phone_number + '</td><td>'
						+ data.data[i].business_filed + '</td><td>'
						+ data.data[i].per_delivery_cost + '</td><td>'
						+ '<button id="' + data.data[i].merchant_id + '" name="' + data.data[i].user_id + '" class="btn-round btn-outline btn approveIT">Approve</button></td></tr>';;

					table.rows.add($(table_rows)).draw();
				});
			},
			complete: function (data) {
				document.getElementById("dtBasicExample2_processing").style.display = "none";
			}
		});
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$('#dtBasicExample2').show();
	$('.b').show();
};

function merchantActivateFunction(dataGet, table) {
	$.ajax
		({
			type: "GET",
			"url": urlForAll + "otp/enable/all/" + org_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (dataOTP) {
				$.each(dataGet.data, function (i, item) {
					var table_rows = '<tr><td>'
						+ dataGet.data[i].merchant_id + '</td><td>'
						+ dataGet.data[i].org_name + '</td><td>'
						+ dataGet.data[i].person_name + '</td><td>'
						+ dataGet.data[i].email + '</td><td>'
						+ dataGet.data[i].phone_number + '</td><td>'
						+ dataGet.data[i].business_filed + '</td><td>'
						+ dataGet.data[i].per_delivery_cost + '</td><td>'
						+ '<button id="' + dataGet.data[i].approved_merchant_id + '"  class="btn-round btn-outline btn btn-EditCriteria">Edit</button>' + '</td><td>'
						+ '<button id="' + dataGet.data[i].approved_merchant_id + '"  class="btn-round btn-outline btn btn-EnableOTP">Enable OTP</button>' + '</td><td>'
						+ '<button id="' + dataGet.data[i].approved_merchant_id + '"  class="btn-round btn-outline btn btn-DisableOTP">Disable OTP</button>' + '</td><td>'
						+ '<button id="' + org_ID + '" name="' + dataGet.data[i].approved_merchant_id + '" class="btn-round btn-outline btn btn-Disable">Disable</button>' + '</td></tr>';

					table.rows.add($(table_rows)).draw();
				});
				table.rows().every(function (index, element) {
					var row = $(this.node());
					row.find('td').eq(8)[0].children[0].disabled = dataOTP.data.indexOf(dataGet.data[index].approved_merchant_id) !== -1 ? true : false;
					row.find('td').eq(9)[0].children[0].disabled = !row.find('td').eq(8)[0].children[0].disabled;

					row.find('td').eq(7)[0].children[0].disabled = flag ? false : true;

					// console.log(element, row, statusElement, row.find('td'));
					// var isChecked = statusElement.prop('checked');
					// /* ... etc ... */
				});
			}
		});
}
var activated = () => {
	document.getElementById('three').disabled = false;
	document.getElementById('two').disabled = false;
	document.getElementById('one').disabled = false;
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('one').style.fontSize = '13px';
	document.getElementById('two').innerHTML = 'Approved Merchant';
	document.getElementById('three').innerHTML = 'Unapproved Merchant';

	document.getElementById('four').style.fontSize = '14.5px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = true;

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = false;
	$('#merchantCreate').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.c').hide();
	$('.d').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	var table = $('#dtBasicExampleActivate').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			"url": urlForAll + "orgHead/enable/merchant/" + org_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExampleActivate_processing").style.display = "block";
			},
			success: function (data) {
				document.getElementById('four').innerHTML = 'Activated Merchant: ' + data.data.length;
				var trHTML = '';
				merchantActivateFunction(data, table);

			},
			complete: function (data) {
				document.getElementById("dtBasicExampleActivate_processing").style.display = "none";
			}
		});
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$('#dtBasicExampleActivate').show();
	$('.c').show();
};

var disabledd = () => {
	document.getElementById('three').disabled = false;
	document.getElementById('two').disabled = false;
	document.getElementById('one').disabled = false;
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('one').style.fontSize = '13px';
	document.getElementById('two').innerHTML = 'Approved Merchant';
	document.getElementById('three').innerHTML = 'Unapproved Merchant';

	document.getElementById('five').style.fontSize = '14.5px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = true;

	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = false;
	$('#merchantCreate').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.c').hide();
	$('.d').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	var table = $('#dtBasicExampleDisable').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			"url": urlForAll + "orgHead/disable/merchant/" + org_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExampleDisable_processing").style.display = "block";
			},
			success: function (data) {
				document.getElementById('five').innerHTML = 'Disabled Merchant: ' + data.data.length;
				var trHTML = '';

				$.each(data.data, function (i, item) {
					var table_rows = '<tr><td>'
						+ data.data[i].merchant_id + '</td><td>'
						+ data.data[i].org_name + '</td><td>'
						+ data.data[i].person_name + '</td><td>'
						+ data.data[i].email + '</td><td>'
						+ data.data[i].phone_number + '</td><td>'
						+ data.data[i].business_filed + '</td><td>'
						+ data.data[i].per_delivery_cost + '</td><td>'
						+ '<button id="' + org_ID + '" name="' + data.data[i].approved_merchant_id + '" class="btn-round btn-outline btn btn-Activate">Activate</button>' + '</td></tr>';

					table.rows.add($(table_rows)).draw();
				});
			},
			complete: function (data) {
				document.getElementById("dtBasicExampleDisable_processing").style.display = "none";
			}
		});
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$('#dtBasicExampleDisable').show();
	$('.d').show();
};

var addMerchant = () => {
	var canMan, canDeliver;
	var name = document.getElementById('person_name').value;
	var company = document.getElementById('org_name').value;
	var email = document.getElementById('email').value;
	var phone = document.getElementById('phone_number').value;
	var business = document.getElementById('business_filed').value;
	var per_delivery_cost = document.getElementById('per_delivery_cost').value;
	var v1 = () => {
		if (name == "" || name == null) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Name cannot be empty!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("person_name").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (company == "" || company == null) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Company Name cannot be empty!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("org_name").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (email == "" || email == null) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Email cannot be empty!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("email").focus();
			return 0;
		}
		else if (email != "" || email != null) {
			var em = email.split("@").length - 1;
			var atposition = email.indexOf("@");
			var dotposition = email.lastIndexOf(".");
			if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length || em > 1) {
				document.getElementById('wrongThisMerCreate').innerHTML = "Please enter a valid e-mail address!";
				$('#myModalWrongMerCreate').modal('show');
				document.getElementById("email").focus();
				return 0;
			}
			else {
				return 1;
			}
		}

	}
	var v4 = () => {
		if (phone == "" || phone == null) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Merchant's Phone Number cannot be empty!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("phone_number").focus();
			return 0;
		}
		else if ((phone.length < 11 || phone.length > 11) && !/\D/.test(phone) == true) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Merchant's Phone Number must be of 11 digits!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("phone_number").focus();
			return 0;
		}
		else if (phone.match(/\d/g).length === 11 && !/\D/.test(phone) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisMerCreate').innerHTML = "Merchant's Phone Number not valid!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("phone_number").focus();
			return 0;
		}
	}
	var v5 = () => {
		if (business == "" || business == null) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Business Field cannot be empty!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("business_filed").focus();
			return 0;
		}
		else {
			return 1;
		}
	}

	var v6 = () => {
		if (parseInt(per_delivery_cost) <= 0 || per_delivery_cost.charAt(0) == 0) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Per Delivery Cost must be greater than 0!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("per_delivery_cost").focus();
			return 0;
		}
		else if (isNaN(per_delivery_cost) == true || per_delivery_cost == "" || !/\D/.test(per_delivery_cost) == false) {
			document.getElementById('wrongThisMerCreate').innerHTML = "Per Delivery Cost must be a number!";
			$('#myModalWrongMerCreate').modal('show');
			document.getElementById("per_delivery_cost").focus();
			return 0;
		}
		else if (!/\D/.test(per_delivery_cost) == true) {
			return 1;
		}
	}
	if (v2() == 1 && v1() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1) {
		document.getElementById('MERCHANT_CREATION').disabled = true;
		//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
		//$(".container").show();
		$.ajax
			({
				type: "POST",
				url: urlForAll + "merchant/create",
				data: JSON.stringify
					({
						"user_id": org_ID,
						"org_name": company,
						"person_name": name,
						"phone_number": phone,
						"email": email,
						"business_filed": business,
						"per_delivery_cost": per_delivery_cost
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					$('#tick2').hide();
					$(".circle-loader").removeClass("load-complete");
					$("#sure2").html("");
					$("#myModal").modal('show');
					$("#sure2").html("Please wait!");
					if (data.status == 'OK') {
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							$('#tick2').show();

							$("#sure2").html("Merchant added!");
						}, 2000);
						document.getElementById('org_name').value = "";
						document.getElementById('person_name').value = "";
						document.getElementById('phone_number').value = "";
						document.getElementById('email').value = "";
						document.getElementById('business_filed').value = "";
						document.getElementById('per_delivery_cost').value = "";
						//alert('Merchant added, Wait For Approval!');
						setTimeout(function () {

							document.getElementById('MERCHANT_CREATION').disabled = false;
							$("#myModal").modal('hide');
						}, 4000);
					}
				},
				error: function (data) {
					document.getElementById('MERCHANT_CREATION').disabled = false;
					document.getElementById('wrong').innerHTML = data.responseJSON.errorMessage + 's';
					$('#myModa').modal('show');
				}
			})
	}
};

$('#dtBasicExampleActivate').on('click', '.btn-Disable', function () {
	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('#tickActivate').hide();
	$(".circle-loader").removeClass("load-complete");
	$("#myModalLabelWork").html("Disable Merchant?");

	$("#sureActivate").html("Are you sure?");
	$("#myModalMerActivate").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okActivate').click(function () {

	$("#sureActivate").html("Please wait!");
	document.getElementById('modalCancel1Activate').disabled = true;
	document.getElementById('modalApprove1Activate').disabled = true;
	$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "orgHead/disable/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureActivate").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickActivate').show();

					$("#sureActivate").html("Merchant Disabled!");
				}, 900);

				setTimeout(function () {
					$("#myModalMerActivate").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw();
					document.getElementById('four').innerHTML = 'Activated Merchant: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancel1Activate').disabled = false;
					document.getElementById('modalApprove1Activate').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCancel1Activate').disabled = false;
				document.getElementById('modalApprove1Activate').disabled = false;
				$('#myModalMerActivate').modal('hide');
				$('#myModal2').modal('show');
			}
		});
});

$('#dtBasicExampleDisable').on('click', '.btn-Activate', function () {
	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('#tickDisable').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sureDisable").html("Are you sure?");
	$("#myModalMerDisable").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okDisable').click(function () {

	$("#sureDisable").html("Please wait!");
	document.getElementById('modalCancel1Disable').disabled = true;
	document.getElementById('modalApprove1Disable').disabled = true;
	$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "orgHead/activate/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureDisable").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickDisable').show();

					$("#sureDisable").html("Merchant Activated!");
				}, 900);

				setTimeout(function () {
					$("#myModalMerDisable").modal('hide');
					var table = $('#dtBasicExampleDisable').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw();
					document.getElementById('five').innerHTML = 'Disabled Merchant: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancel1Disable').disabled = false;
					document.getElementById('modalApprove1Disable').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCancel1Disable').disabled = false;
				document.getElementById('modalApprove1Disable').disabled = false;
				$('#myModalMerDisable').modal('hide');
				$('#myModal2').modal('show');
			}
		});
});


$('#dtBasicExample2').on('click', '.approveIT', function () {
	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('#tick').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure").html("Are you sure?");
	$("#myModalMer").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok').click(function () {

	$("#sure").html("Please wait!");
	document.getElementById('modalCancel1').disabled = true;
	document.getElementById('modalApprove1').disabled = true;
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "orgHead/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sure").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tick').show();

					$("#sure").html("Merchant Approved!");
				}, 900);

				setTimeout(function () {
					$("#myModalMer").modal('hide');
					var table = $('#dtBasicExample2').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw();
					document.getElementById('three').innerHTML = 'Unapproved Merchant: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancel1').disabled = false;
					document.getElementById('modalApprove1').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCancel1').disabled = false;
				document.getElementById('modalApprove1').disabled = false;
				$('#myModalMer').modal('hide');
				var ob = Object.keys(data);
				if (ob[17] == "responseJSON") {
					$("#errorFix").html(data.responseJSON.errorMessage);
				}
				else {
					$("#errorFix").html("Something Went Wrong!");
				}
				$('#myModal2XYZ').modal('show');
			}
		});
});
var arr;
$('#dtBasicExample').on('click', '.updateIT', function () {
	merId = $(this).attr('id');

	arr = merId.split('$$');

	document.getElementById('org_name2').value = arr[1];
	document.getElementById('person_name2').value = arr[2];
	document.getElementById('email2').value = arr[3];
	document.getElementById('phone_number2').value = arr[4];
	document.getElementById('business_filed2').value = arr[5];
	document.getElementById('per_cost').value = arr[6];
	document.getElementById('cod_per').value = arr[7];

	$t = $(this);

	$("#formUpdate").show();
	$('#tick3').hide();
	//$(".circle-loader").removeClass("load-complete");
	$("#circleLoad3").hide();

	$("#sure3").hide();
	//$("#sure3").html("Are you sure?");
	$("#myModalMerUpdate").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok-update').click(function () {

	var org_name = document.getElementById('org_name2').value;
	var person_name = document.getElementById('person_name2').value;
	var phone_number = document.getElementById('phone_number2').value;
	var email = document.getElementById('email2').value;
	var business_filed = document.getElementById('business_filed2').value;
	var per_delivery_cost = document.getElementById('per_cost').value;
	var cod_per = document.getElementById('cod_per').value;

	var v1 = () => {
		if (org_name == "" || org_name == null) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Company Name cannot be empty!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("org_name2").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (person_name == "" || person_name == null) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Owner Name cannot be empty!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("person_name2").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (phone_number == "" || phone_number == null) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Phone Number cannot be empty!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("phone_number2").focus();
			return 0;
		}
		else if ((phone_number.length < 11 || phone_number.length > 11) && !/\D/.test(phone_number) == true) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Phone Number must be of 11 digits!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("phone_number2").focus();
			return 0;
		}
		else if (phone_number.match(/\d/g).length === 11 && !/\D/.test(phone_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Phone Number not valid!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("phone_number2").focus();
			return 0;
		}
	}
	var v4 = () => {
		if (email == "" || email == null) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Email cannot be empty!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("email2").focus();
			return 0;
		}
		else if (email != "" || email != null) {
			var em = email.split("@").length - 1;
			var atposition = email.indexOf("@");
			var dotposition = email.lastIndexOf(".");
			if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length || em > 1) {
				document.getElementById('wrongThisMerUpdate').innerHTML = "Please enter a valid e-mail address!";
				$('#myModalWrongMerUpdate').modal('show');
				document.getElementById("email2").focus();
				return 0;
			}
			else {
				return 1;
			}
		}

	}
	var v5 = () => {
		if (business_filed == "" || business_filed == null) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Business Field cannot be empty!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("business_filed2").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (parseInt(per_delivery_cost) <= 0 || per_delivery_cost.charAt(0) == 0) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Per Delivery Cost must be greater than 0!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("per_cost").focus();
			return 0;
		}
		else if (isNaN(per_delivery_cost) == true || per_delivery_cost == "" || !/\D/.test(per_delivery_cost) == false) {
			document.getElementById('wrongThisMerUpdate').innerHTML = "Per Delivery Cost must be a number!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("per_cost").focus();
			return 0;
		}
		else if (!/\D/.test(per_delivery_cost) == true) {
			return 1;
		}
	}
	var v7 = () => {
		if (isNaN(cod_per) == true || cod_per == "") {
			document.getElementById('wrongThisMerUpdate').innerHTML = "COD Percentage must be a number!";
			$('#myModalWrongMerUpdate').modal('show');
			document.getElementById("cod_per").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var datap;

	if (v1() == 1 && v2() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1 && v7() == 1) {
		document.getElementById('modalApprove').disabled = true;
		document.getElementById('modalCancel').disabled = true;
		$('.btn-ok-update').attr('disabled', true);
		$('.cancelMod').prop('disabled', true);
		$("#formUpdate").hide();
		$(".circle-loader").removeClass("load-complete");
		$(".circle-loader").show();
		$("#sure3").html("Please wait!");
		$("#sure3").show();
		var trimmer = cod_per.trim();
		trimmer = parseInt(trimmer);
		$.ajax
			({
				async: true,
				type: "PUT",
				url: urlForAll + "orgHead/merchant",
				data: JSON.stringify
					({
						"merchant_id": arr[0],
						"user_id": org_ID,
						"org_name": org_name,
						"person_name": person_name,
						"phone_number": phone_number,
						"email": email,
						"business_filed": business_filed,
						"per_delivery_cost": per_delivery_cost,
						"cod_percentage": trimmer
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					var newArr;
					newArr = [
						data.data.merchant_id,
						data.data.org_name,
						data.data.person_name,
						data.data.email,
						data.data.phone_number,
						data.data.business_filed,
						data.data.per_delivery_cost,
						data.data.cod_percentage,
						'<button id="' + data.data.merchant_id + '$$' + data.data.org_name + '$$' + data.data.person_name + '$$' + data.data.email + '$$' + data.data.phone_number + '$$' + data.data.business_filed + '$$' + data.data.per_delivery_cost + '$$' + data.data.cod_percentage + '" class="btn-round btn-outline btn updateIT">Update</button>',
						'<button id="' + org_ID + '" name="' + data.data.approved_merchant_id + '" class="btn-round btn-outline btn" onclick=invoice(this)>Invoice</button>',
						'<button id="' + org_ID + '" name="' + data.data.approved_merchant_id + '" class="btn-round btn-outline btn btn-taka">Complete Payment</button>'
					];
					//$("#sure").html("Please wait!");
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tick3').show();

						$("#sure3").html("Merchant Updated!");
					}, 1500);

					setTimeout(function () {
						$("#myModalMerUpdate").modal('hide');
						var table = $('#dtBasicExample').DataTable();
						table
							.row($t.parents('tr'))
							.data(newArr)
							.draw();
						//console.log(table.row($t.parents('tr')).data());

						$('.btn-ok-update').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
					}, 3000);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					setTimeout(function () {

						$('.btn-ok-update').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
					}, 900);
					$('#myModalMerUpdate').modal('hide');
					$('#myModal2').modal('show');
				}
			});
	}
});
var orgx, merx;
$('#dtBasicExample').on('click', '.btn-taka', function () {
	orgx = $(this).attr('id');
	merx = $(this).attr('name');
	$t = $(this);

	$('#tick2taka').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure2taka").html("Are you sure?");
	$("#myModaltaka").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok-taka').click(function () {

	$("#sure2taka").html("Please wait!");
	document.getElementById('modalCanceltaka').disabled = true;
	document.getElementById('modalApprovetaka').disabled = true;
	$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "orgHead/payment/comlete/" + orgx + "/" + merx,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sure2taka").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tick2taka').show();

					$("#sure2taka").html("Payment Complete!");
				}, 900);

				setTimeout(function () {
					$("#myModaltaka").modal('hide');
					document.getElementById('modalCanceltaka').disabled = false;
					document.getElementById('modalApprovetaka').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCanceltaka').disabled = false;
				document.getElementById('modalApprovetaka').disabled = false;
				$('#myModaltaka').modal('hide');
				document.getElementById('wrongTaka').innerHTML = data.responseJSON.errorMessage;
				$('#myModataka').modal('show');
			}
		});
});

$('#dtBasicExampleActivate').on('click', '.btn-DisableOTP', function () {
	merId = $(this).attr('id');
	$t = $(this);
	$('#tickActivate2').hide();
	$(".circle-loader").removeClass("load-complete");
	$("#sureActivate2").html("Are you sure?");
	$("#myModalMerActivate2").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okActivate2').click(function () {

	$("#sureActivate").html("Please wait!");
	document.getElementById('modalCancel1Activate2').disabled = true;
	document.getElementById('modalApprove1Activate2').disabled = true;
	$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "otp/disable/disable/" + merId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureActivate2").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickActivate2').show();

					$("#sureActivate2").html("Merchant's OTP Disabled!");
				}, 900);

				setTimeout(function () {
					$("#myModalMerActivate2").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					var btn11 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-DisableOTP" disabled>Disable OTP</button>';
					var btn22 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-EnableOTP">Enable OTP</button>';

					table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(btn22);
					table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(btn11);

					document.getElementById('modalCancel1Activate2').disabled = false;
					document.getElementById('modalApprove1Activate2').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCancel1Activate2').disabled = false;
				document.getElementById('modalApprove1Activate2').disabled = false;
				$('#myModalMerActivate2').modal('hide');
				$('#myModal2').modal('show');
			}
		});
});

$('#dtBasicExampleActivate').on('click', '.btn-EnableOTP', function () {
	merId = $(this).attr('id');
	$t = $(this);
	$('#tickActivate3').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sureActivate3").html("Are you sure?");
	$("#myModalMerActivate3").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okActivate3').click(function () {

	$("#sureActivate").html("Please wait!");
	document.getElementById('modalCancel1Activate3').disabled = true;
	document.getElementById('modalApprove1Activate3').disabled = true;
	$.ajax
		({
			async: true,
			type: "POST",
			url: urlForAll + "otp/enable/client/" + merId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureActivate3").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickActivate3').show();

					$("#sureActivate3").html("Merchant's OTP Enabled!");
				}, 900);

				setTimeout(function () {
					$("#myModalMerActivate3").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					var btnn11 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-DisableOTP">Disable OTP</button>';
					var btnn22 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-EnableOTP" disabled>Enable OTP</button>';
					table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(btnn11);
					table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(btnn22);

					document.getElementById('modalCancel1Activate3').disabled = false;
					document.getElementById('modalApprove1Activate3').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalCancel1Activate3').disabled = false;
				document.getElementById('modalApprove1Activate3').disabled = false;
				$('#myModalMerActivate3').modal('hide');
				$('#myModal2').modal('show');
			}
		});
});

var criteriaMer, criteriaEnabledMer;
$('#dtBasicExampleActivate').on('click', '.btn-EditCriteria', function () {
	criteriaMer = $(this).attr('id');
	$t = $(this);

	$("#formUpdateCriteria").show();
	$('#tick3Criteria').hide();
	$("#circleLoad3Criteria").hide();
	$("#sure3Criteria").hide();
	$("#myModalMerUpdateCriteria").modal('show');
	getData();
});

var fillInputDetails = (types, values = undefined) => {
	let typeForCreate = types === "dayType" ? ".dyn.dayType" : types === "productType" ? ".dyn.productType" : types === "weight" ? ".dyn.productWeight" : types === "distance" ? ".dyn.productDistance" : null;
	let placeHolder = types === "dayType" ? "... Urgent, SameDay, NextDay ..." : types === "productType" ? "... Glass, Food ..." : types === "weight" ? "... 1-2, 1-4, 3, 0.6 ..." : types === "distance" ? "... 1-2, 2, 3, 0.4 ..." : null;
	let classesName = types === "dayType" ? "qdc" : types === "productType" ? "qtc" : types === "weight" ? "qwc" : types === "distance" ? "qdsc" : null;
	let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : null;

	let div = document.querySelector(`${typeForCreate}`);

	let dummyDivFlex = document.createElement("div");
	dummyDivFlex.className = `${classesName}${increment} flexIt2`;

	let identifier = document.createElement("span");
	identifier.innerHTML = values !== undefined ? `${values}:` : "";
	identifier.style.cssText = "color: #0066b3; margin:1rem 0; width: 25%;";

	let input = document.createElement("input");
	input.type = "text";
	// identidier.value = values !== undefined ? values : "";
	input.style.cssText = "color: #0066b3;";
	input.className = `form-control ${typeForCreate.substr(5)}${values.replace(/ /g, "")}`;

	types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : null;
	dummyDivFlex.append(identifier, input);

	div.append(dummyDivFlex);
}
function getData() {
	$.ajax
		({
			type: "GET",
			url: urlForAll + "delivery/criteria/" + criteriaMer,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				criteriaEnabledMer = true;
				Object.keys(data.data).map(item => {
					if (item === "id" || item === "userId") {
						return;
					}
					Array.from(Object.keys(data.data[item]).map(itemKeys => {
						console.log(itemKeys);
						console.log("");
						console.log(document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`), `.${item}${itemKeys}`, `.${item}${itemKeys.replace(/ /g, "")}`);

						document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`) ? document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`).value = data.data[item][itemKeys] : null;
					}));
				});
			},
			error: function (data) {
				criteriaEnabledMer = false;
			}
		});
}

function fillupFields() {
	if (flag) {
		document.getElementById('modalApproveCriteria').disabled = true;
		document.getElementById('modalCancelCriteria').disabled = true;
		$('.btn-ok-updateCriteria').attr('disabled', true);
		$('.cancelModCriteria').prop('disabled', true);
		$("#formUpdateCriteria").hide();
		$(".circle-loader").removeClass("load-complete");
		$(".circle-loader").show();
		$("#sure3Criteria").html("Please wait!");
		$("#sure3Criteria").show();
		let array = [];
		Array.from(document.querySelectorAll(".flexIt2")).map(item => {
			if (item.children[0].value) {
				if (item.classList.item(0).includes("qdc")) {
					dayType.push(item.children[0].value.trim().replace(/ /g, ""));
				}
				else if (item.classList.item(0).includes("qwc")) {
					weight.push(item.children[0].value.trim().replace(/ /g, ""));
				}
				else if (item.classList.item(0).includes("qds")) {
					distance.push(item.children[0].value.trim().replace(/ /g, ""));
				}
				else if (item.classList.item(0).includes("qtc")) {
					productType.push(item.children[0].value.trim().replace(/ /g, ""));
				}
			}
		});
		let typesArray = ["dayType", "productType", "productWeight", "productDistance"];
		Object.keys(fillData).map((item, index) => {
			let obj = {};
			fillData[item].map(i => {
				console.log(i, typesArray[index] + i.replace(/ /g, ""), item, index, document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`))

				obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;
				// console.log(i, document.querySelector(`input[class*='${i.replace(/ /g, "")}']`));
			});
			array.push(obj);
		});
		console.log(array);
		$.ajax
			({
				type: criteriaEnabledMer ? "PUT" : "POST",
				url: `${urlForAll}delivery/criteria/${criteriaEnabledMer ? "update" : "create"}/${criteriaMer}`,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				data: JSON.stringify({
					"dayTypeMap": array[0],
					"productTypeMap": array[1],
					"productDistanceMap": array[3],
					"productWeightMap": array[2]
				}),
				success: function (data) {
					console.log(data);
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tick3Criteria').show();

						$("#sure3Criteria").html("Merchant's Criteria Updated!");
					}, 1500);

					setTimeout(function () {
						$("#myModalMerUpdateCriteria").modal('hide');
						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelModCriteria').prop('disabled', false);
					}, 3000);
				},
				error: function (data) {
					$('.btn-ok-updateCriteria').attr('disabled', false);
					$('.cancelModCriteria').prop('disabled', false);

					var ob = Object.keys(data);
					if (ob[17] == "responseJSON") {
						$("#errorFix").html(data.responseJSON.errorMessage);
					}
					else {
						$("#errorFix").html("Something Went Wrong!");
					}
					$('#myModalMerUpdateCriteria').modal('hide');
					setTimeout(() => {
						$('#myModal2XYZ').modal('show');
					}, 0);
				}
			});
	}
}
