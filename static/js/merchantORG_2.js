var org_ID = localStorage.getItem('userID');

function merchantOrgButtonActive() {
	document.getElementById('one').disabled = false;
	document.getElementById('one').style.fontSize = '13px';

	document.getElementById('two').disabled = false;
	document.getElementById('two').innerHTML = 'Approved Merchant';
	document.getElementById('two').style.fontSize = '13px';

	document.getElementById('three').disabled = false;
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('three').innerHTML = 'Unapproved Merchant';

	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').innerHTML = 'Activated Merchant';
	document.getElementById('four').disabled = false;

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').innerHTML = 'Disabled Merchant';
	document.getElementById('five').disabled = false;
}

function merchantOrgTableHide() {
	$('#merchantCreate').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
}

var createMer = () => {
	merchantOrgTableHide();
	merchantOrgButtonActive();
	document.getElementById('one').disabled = true;
	document.getElementById('one').style.fontSize = '14.5px';

	$('#merchantCreate').show();
};

function merchantOrgDatatableStyle() {
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
}
var invoice = (id) => {
	$.ajax
		({
			type: "GET",
			url: urlForAll + "reports/reportForMerchant/report/" + id.id + "/" + id.name,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				window.open(urlForAll + "reports/reportForMerchant/report/" + id.id + "/" + id.name, "_blank");
			},
			error: function (data) {
				document.getElementById('wrongThisMerCreate').innerHTML = data.responseJSON.errorMessage;
				$('#myModalWrongMerCreate').modal('show');
			}
		});
};
var approvedMer = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();
	document.getElementById('two').disabled = true;
	document.getElementById('two').style.fontSize = '14.5px';

	var table = $('#dtBasicExample').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"columns": [
			{ title: "Merchant ID" },
			{ title: "Company Name" },
			{ title: "Owner Name" },
			{ title: "Email" },
			{ title: "Phone Number" },
			{ title: "Business Field" },
			{ title: "Per Delivery Cost" },
			{ title: "Cash On Delivery Percentage" },
			{
				orderable: false, title: "Update Merchant"
			}
		]
	});
	table.clear().draw();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/merchant/approved/details/" + org_ID,
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
						+ '<button id="' + data.data[i].merchant_id + '$$' + data.data[i].org_name + '$$' + data.data[i].person_name + '$$' + data.data[i].email + '$$' + data.data[i].phone_number + '$$' + data.data[i].business_filed + '$$' + data.data[i].per_delivery_cost + '$$' + data.data[i].cod_percentage + '" class="btn-round btn-outline btn updateIT">Update</button></td></tr>';
					table.rows.add($(table_rows)).draw();
				});
			},
			complete: function (data) {
				document.getElementById("dtBasicExample_processing").style.display = "none";
			}
		});

	merchantOrgDatatableStyle();
	$('#dtBasicExample').show();
	$('.a').show();
}

var unApprovedMer = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();

	document.getElementById('three').disabled = true;
	document.getElementById('three').style.fontSize = '14.5px';

	var table = $('#dtBasicExample2').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"columns": [
			{ title: "Merchant ID" },
			{ title: "Company Name" },
			{ title: "Owner Name" },
			{ title: "Email" },
			{ title: "Phone Number" },
			{ title: "Business Field" },
			{ title: "Per Delivery Cost" },
			{
				orderable: false, title: "Approve Merchant?"
			}
		],
	});
	table.clear().draw();
	$.ajax
		({
			async: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "orgHead/merchant/unapproved/details/" + org_ID,
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
	merchantOrgDatatableStyle();
	$('#dtBasicExample2').show();
	$('.b').show();
};

function merchantActivateFunction(dataGet, table) {
	$.ajax
		({
			type: "GET",
			url: urlForAll + "otp/enable/all/" + org_ID,
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
						+ '<button id="' + org_ID + '" name="' + dataGet.data[i].approved_merchant_id + '" class="btn-round btn-outline btn" onclick=invoice(this)>Invoice</button>' + '</td><td>'
						+ '<button id="' + org_ID + '" name="' + dataGet.data[i].approved_merchant_id + '" class="btn-round btn-outline btn btn-taka">Complete Payment</button>' + '</td><td>'
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

	merchantOrgButtonActive();
	merchantOrgTableHide();
	document.getElementById('four').style.fontSize = '14.5px';
	document.getElementById('four').disabled = true;

	var table = $('#dtBasicExampleActivate').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"columns": [
			{ title: "Merchant ID" },
			{ title: "Company Name" },
			{ title: "Owner Name" },
			{ title: "Email" },
			{ title: "Phone Number" },
			{ title: "Business Field" },
			{ title: "Per Delivery Cost" },
			{
				orderable: false, title: "Update Criteria"
			},
			{
				orderable: false, title: "Enable OTP"
			},
			{
				orderable: false, title: "Disable OTP"
			},
			{
				orderable: false, title: "Invoice"
			},
			{
				orderable: false, title: "Payment"
			},
			{
				orderable: false, title: "Disable Merchant?"
			}
		]
	});
	table.clear().draw();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/enable/merchant/" + org_ID,
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

	merchantOrgDatatableStyle();
	$('#dtBasicExampleActivate').show();
	$('.c').show();
};

var disabledd = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();

	document.getElementById('five').style.fontSize = '14.5px';
	document.getElementById('five').disabled = true;

	var table = $('#dtBasicExampleDisable').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"columns": [
			{ title: "Merchant ID" },
			{ title: "Company Name" },
			{ title: "Owner Name" },
			{ title: "Email" },
			{ title: "Phone Number" },
			{ title: "Business Field" },
			{ title: "Per Delivery Cost" },
			{
				orderable: false, title: "Activate Merchant?"
			}
		]
	});
	table.clear().draw();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/disable/merchant/" + org_ID,
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

	merchantOrgDatatableStyle();
	$('#dtBasicExampleDisable').show();
	$('.d').show();
};

var addMerchant = () => {
	var name = document.getElementById('person_name').value;
	var company = document.getElementById('org_name').value;
	var email = document.getElementById('email').value;
	var phone = document.getElementById('phone_number').value;
	var business = document.getElementById('business_filed').value;
	var per_delivery_cost = document.getElementById('per_delivery_cost').value;
	var v1 = () => {
		if (name == "" || name == null) {
			modalErrorShowForCreateUpdateMerchant("Owner Name cannot be empty!", "person_name");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (company == "" || company == null) {
			modalErrorShowForCreateUpdateMerchant("Company Name cannot be empty!", "org_name");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (email == "" || email == null) {
			modalErrorShowForCreateUpdateMerchant("Email cannot be empty!", "email");
			return 0;
		}
		else if (email != "" || email != null) {
			if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
				email
			)) {
				return 1;
			}
			else {
				modalErrorShowForCreateUpdateMerchant("Please enter a valid e-mail address!", "email");
				return 0;
			}
		}
	}
	var v4 = () => {
		if (phone == "" || phone == null) {
			modalErrorShowForCreateUpdateMerchant("Phone Number cannot be empty!", "phone_number");
			return 0;
		}
		else if ((phone.length < 11 || phone.length > 11) && !/\D/.test(phone) == true) {
			modalErrorShowForCreateUpdateMerchant("Phone Number must be of 11 digits!", "phone_number");
			return 0;
		}
		else if (phone.match(/\d/g).length === 11 && !/\D/.test(phone) == true) {
			return 1;
		}
		else {
			modalErrorShowForCreateUpdateMerchant("Phone Number not valid!", "phone_number");
			return 0;
		}
	}
	var v5 = () => {
		if (business == "" || business == null) {
			modalErrorShowForCreateUpdateMerchant("Business Field cannot be empty!", "business_filed");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (parseInt(per_delivery_cost) <= 0 || per_delivery_cost.charAt(0) == 0) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be greater than 0!", "per_delivery_cost");
			return 0;
		}
		else if (isNaN(per_delivery_cost) == true || per_delivery_cost == "" || !/\D/.test(per_delivery_cost) == false) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be a number!", "per_delivery_cost");
			return 0;
		}
		else if (!/\D/.test(per_delivery_cost) == true) {
			return 1;
		}
	}
	if (v2() == 1 && v1() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1) {
		document.getElementById('MERCHANT_CREATION').disabled = true;
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
						}, 1000);
						document.getElementById('org_name').value = "";
						document.getElementById('person_name').value = "";
						document.getElementById('phone_number').value = "";
						document.getElementById('email').value = "";
						document.getElementById('business_filed').value = "";
						document.getElementById('per_delivery_cost').value = "";
						setTimeout(function () {
							document.getElementById('MERCHANT_CREATION').disabled = false;
							$("#myModal").modal('hide');
						}, 2000);
					}
				},
				error: function (data) {
					document.getElementById('MERCHANT_CREATION').disabled = false;
					$("#myModal").modal('hide');
					modalError(data);
				}
			})
	}
};

// Form

function modalForm() {
	$("#formUpdate").hide();
	$("#formUpdateCriteria").hide();

	$('#tickForm').hide();
	$("#circleLoadForm").hide();
	$("#sureForm").hide();

	$("#modalApproveForm").hide();
	$("#modalApproveCriteria").hide();

	$("#myModalForm").modal('show');
}

function modalFormBeforeSuccess() {
	document.getElementById('modalApproveForm').disabled = true;
	document.getElementById('modalApproveCriteria').disabled = true;
	document.getElementById('modalCancelForm').disabled = true;
	$('.btn-ok-update').attr('disabled', true);
	$('.cancelMod').prop('disabled', true);
	$('.btn-ok-updateCriteria').prop('disabled', true);
	$("#formUpdate").hide();
	$("#formUpdateCriteria").hide();
	$(".circle-loader").removeClass("load-complete");
	$(".circle-loader").show();
	$("#sureForm").html("Please wait!");
	$("#sureForm").show();
}

var arr;
$('#dtBasicExample').on('click', '.updateIT', function () {
	merId = $(this).attr('id');

	arr = merId.split('$$');

	$t = $(this);

	document.getElementById('org_name2').value = arr[1];
	document.getElementById('person_name2').value = arr[2];
	document.getElementById('email2').value = arr[3];
	document.getElementById('phone_number2').value = arr[4];
	document.getElementById('business_filed2').value = arr[5];
	document.getElementById('per_cost').value = arr[6];
	document.getElementById('cod_per').value = arr[7];

	modalForm();
	document.getElementById('myModalFormHeader').innerHTML = "Update Merchant?";

	$("#formUpdate").show();
	$("#modalApproveForm").show();
});

function modalErrorShowForCreateUpdateMerchant(message, focusWehere) {
	document.getElementById('error').innerHTML = message;
	document.getElementById('errorButton').innerHTML = "Correct It";
	$('#myModalError').modal('show');
	document.getElementById(focusWehere).focus();
}
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
			modalErrorShowForCreateUpdateMerchant("Company Name cannot be empty!", "org_name2");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (person_name == "" || person_name == null) {
			modalErrorShowForCreateUpdateMerchant("Owner Name cannot be empty!", "person_name2");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (phone_number == "" || phone_number == null) {
			modalErrorShowForCreateUpdateMerchant("Phone Number cannot be empty!", "phone_number2");
			return 0;
		}
		else if ((phone_number.length < 11 || phone_number.length > 11) && !/\D/.test(phone_number) == true) {
			modalErrorShowForCreateUpdateMerchant("Phone Number must be of 11 digits!", "phone_number2");
			return 0;
		}
		else if (phone_number.match(/\d/g).length === 11 && !/\D/.test(phone_number) == true) {
			return 1;
		}
		else {
			modalErrorShowForCreateUpdateMerchant("Phone Number not valid!", "phone_number2");
			return 0;
		}
	}
	var v4 = () => {
		if (email == "" || email == null) {
			modalErrorShowForCreateUpdateMerchant("Email cannot be empty!", "email2");
			return 0;
		}
		else if (email != "" || email != null) {
			if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
				email
			)) {
				return 1;
			}
			else {
				modalErrorShowForCreateUpdateMerchant("Please enter a valid e-mail address!", "email2");
				return 0;
			}
		}
	}
	var v5 = () => {
		if (business_filed == "" || business_filed == null) {
			modalErrorShowForCreateUpdateMerchant("Business Field cannot be empty!", "business_filed2");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (parseInt(per_delivery_cost) <= 0 || per_delivery_cost.charAt(0) == 0) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be greater than 0!", "per_cost");
			return 0;
		}
		else if (isNaN(per_delivery_cost) == true || per_delivery_cost == "" || !/\D/.test(per_delivery_cost) == false) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be a number!", "per_cost");
			return 0;
		}
		else if (!/\D/.test(per_delivery_cost) == true) {
			return 1;
		}
	}
	var v7 = () => {
		if (isNaN(cod_per) == true || cod_per == "") {
			modalErrorShowForCreateUpdateMerchant("COD Percentage must be a number!", "cod_per");
			return 0;
		}
		else {
			return 1;
		}
	}

	if (v1() == 1 && v2() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1 && v7() == 1) {
		modalFormBeforeSuccess();
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
						'<button id="' + data.data.merchant_id + '$$' + data.data.org_name + '$$' + data.data.person_name + '$$' + data.data.email + '$$' + data.data.phone_number + '$$' + data.data.business_filed + '$$' + data.data.per_delivery_cost + '$$' + data.data.cod_percentage + '" class="btn-round btn-outline btn updateIT">Update</button>'
					];
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tickForm').show();

						$("#sureForm").html("Merchant Updated!");
					}, 1000);

					setTimeout(function () {
						$("#myModalForm").modal('hide');
						var table = $('#dtBasicExample').DataTable();
						table
							.row($t.parents('tr'))
							.data(newArr)
							.draw();
						$('.btn-ok-update').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
					}, 2000);
				},
				error: function (data) {
					$('#myModalForm').modal('hide');
					setTimeout(function () {
						$('.btn-ok-update').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
					}, 100);
					modalError(data);
				}
			});
	}
});

var criteriaMer, criteriaEnabledMer;
$('#dtBasicExampleActivate').on('click', '.btn-EditCriteria', function () {
	criteriaMer = $(this).attr('id');
	$t = $(this);

	modalForm();
	document.getElementById('myModalFormHeader').innerHTML = "Update Merchant Criteria?";

	$("#formUpdate").show();
	$("#modalApproveFormCriteria").show();
	getData();
});

var fillInputDetails = (types, values = undefined) => {
	let typeForCreate = types === "dayType" ? ".dyn.dayType" : types === "productType" ? ".dyn.productType" : types === "weight" ? ".dyn.productWeight" : types === "distance" ? ".dyn.productDistance" : types === "city" ? ".dyn.productCity" : null;
	let placeHolder = types === "dayType" ? "... 80/120/150 ..." : types === "productType" ? "... 80/120/150 ..." : types === "weight" ? "... 80/120/150 ..." : types === "distance" ? "... 80/120/150 ..." : types === "city" ? "... 80/120/150 ..." : null;
	let classesName = types === "dayType" ? "qdc" : types === "productType" ? "qtc" : types === "weight" ? "qwc" : types === "distance" ? "qdsc" : types === "city" ? "qcc" : null;
	let increment = types === "dayType" ? day : types === "productType" ? type : types === "weight" ? weight : types === "distance" ? distance : types === "city" ? city : null;

	let div = document.querySelector(`${typeForCreate}`);

	let dummyDivFlex = document.createElement("div");
	dummyDivFlex.className = `${classesName}${increment} flexIt2`;

	let identifier = document.createElement("span");
	identifier.innerHTML = values !== undefined ? `${values.replace(/ /g, "")}:` : "";
	identifier.style.cssText = "color: #0066b3; margin:1rem 0; width: 40%;";

	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeHolder;
	// identidier.value = values !== undefined ? values : "";
	input.style.cssText = "color: #0066b3;";
	input.className = `form-control ${typeForCreate.substr(5)}${values.replace(/ /g, "")}`;
	input.addEventListener("keyup", blockInputs.bind(this, `${typeForCreate.substr(5)}`));

	types === "dayType" ? day++ : types === "productType" ? type++ : types === "weight" ? weight++ : types === "distance" ? distance++ : types === "city" ? city++ : null;
	dummyDivFlex.append(identifier, input);

	div.append(dummyDivFlex);
}

function lockElse(classNameInput, event) {
	Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input:not(input[class*=${classNameInput}])`))
		.map(item => {
			if (event.target.classList.item(1).includes("dayType") || event.target.classList.item(1).includes("productCity")) {
				if (item.classList.item(1).includes("productCity") || item.classList.item(1).includes("dayType")) {
					return;
				}
			}
			item.disabled = true;
			item.placeholder = "You're Not Allowed To Set This";
			item.value = "";
		});
}

function unlockAll(classNameInput) {
	let dis = false;
	Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input`))
		.map(item => {
			if (item.value) {
				dis = true;
			}
		});
	if (dis === false) {
		Array.from(document.querySelectorAll(`#setCriteriaDetails .flexIt2 input:not(input[class*=${classNameInput}])`))
			.map(item => {
				item.disabled = false;
				item.placeholder = "";
				item.value = "";
			});
	}
}

document.querySelector("#criteriaReset").addEventListener("click", function (e) {
	e.preventDefault();
	document.querySelectorAll(`.flexIt2`) ?
		Array.from(document.querySelectorAll(`.flexIt2 input`))
			.map(item => {
				item.disabled = false;
				item.placeholder = "";
				item.value = "";
			}) : null;
});

function blockInputs(classNameInput, event) {
	if (event.key === "Backspace" || event.key === "Tab") {
		unlockAll(classNameInput, event);
	}
	else {
		lockElse(classNameInput, event);
	}
}
function getData() {
	Array.from(document.querySelectorAll(".flexIt2 input")).map(item => {
		item.value = "";
	});
	$.ajax
		({
			type: "GET",
			url: urlForAll + "delivery/criteria/active/" + criteriaMer,
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
					if (data.data[item]) {
						Array.from(Object.keys(data.data[item]).map(itemKeys => {

							document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`) ? document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`).value = data.data[item][itemKeys] : null;
							console.log(document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`), `.${item}${itemKeys}`, `.${item}${itemKeys.replace(/ /g, "")}`);
						}));
					}
				});
			},
			error: function (data) {
				criteriaEnabledMer = false;
			}
		});
}
function fillupFields() {
	if (flag) {
		let typesArray = ["dayType", "productType", "productWeight", "productDistance", "productCity"];
		let array = [], flagger = 1;
		for (const [index, item] of Object.keys(fillData).entries()) {
			console.log(index, item);
			let obj = {};
			for (const i of fillData[item]) {
				if (document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value) {
					console.log(i, typesArray[index] + i.replace(/ /g, ""), item, index, document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`));
					let testingNumber = /^\d+$/.test(document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value);
					if (!testingNumber) {
						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
						$("#errorFix").html(`"${i}" Must Be A Number!`);
						// $('#myModalMerUpdateCriteria').modal('hide');
						$('#myModal2XYZ').modal('show');


						document.getElementById('error').innerHTML = message;
						document.getElementById('errorButton').innerHTML = "Correct It";
						$('#myModalError').modal('show');
						flagger = 0;
						document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).focus();
						break;
					}

					let testingNumberLength = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value.match(/\d/g);
					if (testingNumberLength.length > 5) {

						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelModCriteria').prop('disabled', false);

						$("#errorFix").html(`"${i}" Must Be Less Than 5 Digits!`);
						// $('#myModalMerUpdateCriteria').modal('hide');
						$('#myModal2XYZ').modal('show');

						flagger = 0;
						document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).focus();
						break;
					}
				}
				obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;
			}
			if (!flagger) {
				document.getElementById("myModalMerUpdateCriteria").style.overflowY = "auto";
				break;
			}
			array.push(obj);
		}

		// Object.keys(fillData).map((item, index) => {
		// 	let obj = {};
		// 	fillData[item].map(i => {
		// 		console.log(i, typesArray[index] + i.replace(/ /g, ""), item, index, document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`))

		// 		obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;
		// 		// console.log(i, document.querySelector(`input[class*='${i.replace(/ /g, "")}']`));
		// 	});
		// 	array.push(obj);
		// });
		console.log(array);
		if (flagger) {
			document.getElementById('modalApproveCriteria').disabled = true;
			document.getElementById('modalCancelCriteria').disabled = true;
			$('.btn-ok-updateCriteria').attr('disabled', true);
			$('.cancelModCriteria').prop('disabled', true);
			$("#formUpdateCriteria").hide();
			$(".circle-loader").removeClass("load-complete");
			$(".circle-loader").show();
			$("#sure3Criteria").html("Please wait!");
			$("#sure3Criteria").show();
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
						"productWeightMap": array[2],
						"productCityMap": array[4]
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
}

function modalButtonHide() {
	$('#modalYesButton').hide();
	$('#modalApprove1').hide();
	$('#modalApprove1Activate').hide();
	$('#modalApprove1Disable').hide();
	$('#modalApprove1Activate2').hide();
	$('#modalApprove1Activate3').hide();
}

function modalStart() {
	$('#tick').hide();
	$(".circle-loader").removeClass("load-complete");
	$("#sure").html("Are you sure?");
	$("#myModalForAll").modal('show');
	document.getElementById('modalCancelButton').disabled = false;
}

function modalTickDone(message) {
	$("#sure").html("Please wait!");
	setTimeout(function () {
		$(".circle-loader").addClass("load-complete");
		$('#tick').show();
		$("#sure").html(message);
	}, 900);
}
function modalError(data) {
	document.getElementById('modalCancelButton').disabled = false;
	var ob = Object.keys(data);
	if (ob[17] == "responseJSON") {
		document.getElementById('error').innerHTML = data.responseJSON.errorMessage;
	}
	else {
		document.getElementById('error').innerHTML = "Something Went Wrong!";
	}
	$('#myModalForAll').modal('hide');
	document.getElementById('errorButton').innerHTML = "Sorry";
	$('#myModalError').modal('show');
}

$('#dtBasicExampleActivate').on('click', '.btn-Disable', function () {
	modalButtonHide();

	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('.btn-okActivate').show();

	$("#modalForAllHeader").html("Disable Merchant?");

	modalStart();

});
$('.btn-okActivate').click(function () {

	$("#sure").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalApprove1Activate').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "orgHead/disable/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Merchant Disabled!");
				setTimeout(function () {
					$("#myModalForAll").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw();
					document.getElementById('four').innerHTML = 'Activated Merchant: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancelButton').disabled = false;
					document.getElementById('modalApprove1Activate').disabled = false;
				}, 2000);
			},
			error: function (data) {
				document.getElementById('modalApprove1Activate').disabled = false;
				modalError(data);
			}
		});
});

$('#dtBasicExampleDisable').on('click', '.btn-Activate', function () {
	modalButtonHide();

	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('.btn-okDisable').show();

	$("#modalForAllHeader").html("Activate Merchant?");

	modalStart();
});
$('.btn-okDisable').click(function () {

	$("#sureDisable").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalApprove1Disable').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "orgHead/activate/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Merchant Activated!");

				setTimeout(function () {
					$("#myModalForAll").modal('hide');
					var table = $('#dtBasicExampleDisable').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw();
					document.getElementById('five').innerHTML = 'Disabled Merchant: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancelButton').disabled = true;
					document.getElementById('modalApprove1Disable').disabled = false;
				}, 2000);
			},
			error: function (data) {
				document.getElementById('modalApprove1Disable').disabled = false;
				modalError(data);
			}
		});
});

$('#dtBasicExample2').on('click', '.approveIT', function () {
	modalButtonHide();
	merId = $(this).attr('id');
	orgId = $(this).attr('name');
	$t = $(this);

	$('.btn-ok').show();

	$("#modalForAllHeader").html("Approve Merchant?");

	modalStart();
});
$('.btn-ok').click(function () {

	$("#sure").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalApprove1').disabled = true;
	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/merchant/" + merId + "/" + orgId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Merchant Approved!");

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

					document.getElementById('modalCancelButton').disabled = false;
					document.getElementById('modalApprove1').disabled = false;
				}, 2000);
			},
			error: function (data) {

				document.getElementById('modalApprove1').disabled = false;
				modalError(data);
			}
		});
});

// Complete Payment
var orgx, merx;
$('#dtBasicExampleActivate').on('click', '.btn-taka', function () {
	modalButtonHide();

	orgx = $(this).attr('id');
	merx = $(this).attr('name');
	$t = $(this);

	$('.btn-okPayment').show();

	$("#modalForAllHeader").html("Complete Payment?");

	modalStart();
});
$('.btn-okPayment').click(function () {

	$("#sure").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalYesButton').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "orgHead/payment/comlete/" + orgx + "/" + merx,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Payment Completed!");
				setTimeout(function () {
					$("#myModalForAll").modal('hide');
					document.getElementById('modalCancelButton').disabled = false;
					document.getElementById('modalYesButton').disabled = false;
				}, 2000);
			},
			error: function (data) {
				document.getElementById('modalYesButton').disabled = false;
				modalError(data);
			}
		});
});

$('#dtBasicExampleActivate').on('click', '.btn-DisableOTP', function () {
	modalButtonHide();
	merId = $(this).attr('id');
	$t = $(this);
	$('.btn-okActivate2').show();

	$("#modalForAllHeader").html("Disable OTP?");

	modalStart();
});
$('.btn-okActivate2').click(function () {
	$("#sure").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalApprove1Activate2').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "otp/disable/disable/" + merId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Merchant's OTP Disabled!");
				setTimeout(function () {
					$("#myModalForAll").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					var btn11 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-DisableOTP" disabled>Disable OTP</button>';
					var btn22 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-EnableOTP">Enable OTP</button>';

					table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(btn22);
					table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(btn11);

					document.getElementById('modalCancelButton').disabled = false;
					document.getElementById('modalApprove1Activate2').disabled = false;
				}, 2000);
			},
			error: function (data) {
				document.getElementById('modalApprove1Activate2').disabled = false;
				modalError(data);
			}
		});
});

$('#dtBasicExampleActivate').on('click', '.btn-EnableOTP', function () {
	merId = $(this).attr('id');
	$t = $(this);

	modalButtonHide();
	$('.btn-okActivate3').show();

	$("#modalForAllHeader").html("Enable OTP?");

	modalStart();
});
$('.btn-okActivate3').click(function () {

	$("#sureActivate").html("Please wait!");
	document.getElementById('modalCancelButton').disabled = true;
	document.getElementById('modalApprove1Activate3').disabled = true;
	$.ajax
		({
			type: "POST",
			url: urlForAll + "otp/enable/client/" + merId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				modalTickDone("Merchant's OTP Enabled!");
				setTimeout(function () {
					$("#myModalForAll").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					var btnn11 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-DisableOTP">Disable OTP</button>';
					var btnn22 = '<button id="' + merId + '" class="btn-round btn-outline btn btn-EnableOTP" disabled>Enable OTP</button>';
					table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(btnn11);
					table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(btnn22);

					document.getElementById('modalCancelButton').disabled = false;
					document.getElementById('modalApprove1Activate3').disabled = false;
				}, 2000);
			},
			error: function (data) {
				document.getElementById('modalApprove1Activate3').disabled = false;
				modalError(data);
			}
		});
});