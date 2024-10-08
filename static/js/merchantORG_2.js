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
	document.getElementById('one').style.fontSize = '13px';
	$('#merchantCreate').show();
};
function tdColspan() {
	if (window.innerWidth <= 500) {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "2");
	}
	else if (window.innerWidth <= 800) {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "4");
	}
	else {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "10");
	}
}

function merchantOrgDatatableStyle() {
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '220px', 'display': 'inline-block', 'color': '#0066b3', 'background': '#fff' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#0066b3', 'background': '#fff' });
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
				modalError(data);
			}
		});
};

function formatApproved(d) {

	var payment_method_mobile = d.payment_method_mobile && d.payment_method_mobile !== "no" ? d.payment_method_mobile : "";
	var payment_method_mobile_number = d.payment_method_mobile_number ? d.payment_method_mobile_number : "";
	var payment_method_bank_name = d.payment_method_bank_name ? d.payment_method_bank_name : "";
	var payment_method_bank_branch = d.payment_method_bank_branch ? d.payment_method_bank_branch : "";
	var payment_method_bank_account = d.payment_method_bank_account ? d.payment_method_bank_account : "";

	return '<table id="innerRowTable" style="border-spacing: 2rem; text-align: left">' +
		'<tr>' +
		'<td>Merchant ID:</td>' +
		'<td>' + d.approved_merchant_id + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Owner Name:</td>' +
		'<td>' + d.person_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Business Category:</td>' +
		'<td>' + d.business_filed + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Mobile Banking:</td>' +
		'<td>' + payment_method_mobile + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + payment_method_mobile + ' Number:</td>' +
		'<td>' + payment_method_mobile_number + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Name:</td>' +
		'<td>' + payment_method_bank_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Branch:</td>' +
		'<td>' + payment_method_bank_branch + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Account No:</td>' +
		'<td>' + payment_method_bank_account + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Email:</td>' +
		'<td>' + d.email + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Business Category:</td>' +
		'<td>' + d.business_filed + '</td>' +
		'</tr>' +
		'</table>';
}
function formatUnapproved(d) {

	var payment_method_mobile = d.payment_method_mobile && d.payment_method_mobile !== "no" ? d.payment_method_mobile : "";
	var payment_method_mobile_number = d.payment_method_mobile_number ? d.payment_method_mobile_number : "";
	var payment_method_bank_name = d.payment_method_bank_name ? d.payment_method_bank_name : "";
	var payment_method_bank_branch = d.payment_method_bank_branch ? d.payment_method_bank_branch : "";
	var payment_method_bank_account = d.payment_method_bank_account ? d.payment_method_bank_account : "";

	return '<table id="innerRowTable" style="border-spacing: 2rem; text-align: left">' +
		'<tr>' +
		'<td>Owner Name:</td>' +
		'<td>' + d.person_name + '</td>' +
		'</tr>' +
		'<td>Mobile Banking:</td>' +
		'<td>' + payment_method_mobile + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + payment_method_mobile + ' Number:</td>' +
		'<td>' + payment_method_mobile_number + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Name:</td>' +
		'<td>' + payment_method_bank_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Branch:</td>' +
		'<td>' + payment_method_bank_branch + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Account No:</td>' +
		'<td>' + payment_method_bank_account + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Email:</td>' +
		'<td>' + d.email + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Business Category:</td>' +
		'<td>' + d.business_filed + '</td>' +
		'</tr>' +
		'</table>';
}
function formatActivated(d) {

	var payment_method_mobile = d.payment_method_mobile && d.payment_method_mobile !== "no" ? d.payment_method_mobile : "";
	var payment_method_mobile_number = d.payment_method_mobile_number ? d.payment_method_mobile_number : "";
	var payment_method_bank_name = d.payment_method_bank_name ? d.payment_method_bank_name : "";
	var payment_method_bank_branch = d.payment_method_bank_branch ? d.payment_method_bank_branch : "";
	var payment_method_bank_account = d.payment_method_bank_account ? d.payment_method_bank_account : "";

	return '<table id="innerRowTable" style="border-spacing: 1rem; text-align: left">' +
		'<tr>' +
		'<td>Merchant ID:</td>' +
		'<td>' + d.approved_merchant_id + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Owner Name:</td>' +
		'<td>' + d.person_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Email:</td>' +
		'<td>' + d.email + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Phone Number:</td>' +
		'<td>' + d.phone_number + '</td>' +
		'</tr>' +
		'<td>Mobile Banking:</td>' +
		'<td>' + payment_method_mobile + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + payment_method_mobile + ' Number:</td>' +
		'<td>' + payment_method_mobile_number + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Name:</td>' +
		'<td>' + payment_method_bank_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Branch:</td>' +
		'<td>' + payment_method_bank_branch + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Bank Account No:</td>' +
		'<td>' + payment_method_bank_account + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Per Delivery Cost:</td>' +
		'<td>' + d.per_delivery_cost + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Cash On Delivery Percentage:</td>' +
		'<td>' + d.cod_percentage + "%" + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Business Category:</td>' +
		'<td>' + d.business_filed + '</td>' +
		'</tr>' +
		'</table>';
}
var approvedMer = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();
	document.getElementById('two').disabled = true;
	document.getElementById('two').style.fontSize = '13px';

	var table = $('#dtBasicExample').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "orgHead/merchant/approved/details/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data"
		},
		"columns": [
			{
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>"
			},
			{ "targets": 1, "data": "org_name" },
			{ "targets": 5, "data": "phone_number" },
			{ "targets": 7, "data": "per_delivery_cost" },
			{ "targets": 8, "data": "cod_percentage" },
			{
				"orderable": false, "targets": 9, "data": null, render: function (data, type, row) {
					return '<button id="' + row.merchant_id + '$$' + row.org_name + '$$' + row.person_name + '$$' + row.email + '$$' + row.phone_number + '$$' + row.business_filed + '$$' + row.per_delivery_cost + '$$' + row.cod_percentage + '$$' + row.payment_method_mobile + '$$' + row.payment_method_mobile_number + '$$' + row.payment_method_bank + '$$' + row.payment_method_bank_name + '$$' + row.payment_method_bank_branch + '$$' + row.payment_method_bank_account + '" class="btn-round btn-outline btn updateIT" style="font-size:13px">Update</button>'
				}
			}
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();

		document.getElementById('two').innerHTML = 'Approved Merchant: ' + json.data.length;
	});
	table.clear().draw();
	merchantOrgDatatableStyle();
	$('#dtBasicExample').show();
	$('.a').show();

	$('#dtBasicExample tbody').off('click', 'td.details-control');
	$('#dtBasicExample tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExample').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatApproved(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
}

var unApprovedMer = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();

	document.getElementById('three').disabled = true;
	document.getElementById('three').style.fontSize = '13px';

	var table = $('#dtBasicExample2').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "orgHead/merchant/unapproved/details/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data"
		},
		"columns": [
			{
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>"
			},
			{ "targets": 12, "data": "org_name" },
			{ "targets": 52, "data": "phone_number" },
			{ "targets": 72, "data": "per_delivery_cost" },
			{
				"orderable": false, "targets": 92, "data": "update", render: function (data, type, row) {
					return '<button id="' + row.merchant_id + '$$' + row.org_name + '$$' + row.person_name + '$$' + row.email + '$$' + row.phone_number + '$$' + row.business_filed + '$$' + row.per_delivery_cost + '$$' + row.cod_percentage + '$$' + row.payment_method_mobile + '$$' + row.payment_method_mobile_number + '$$' + row.payment_method_bank + '$$' + row.payment_method_bank_name + '$$' + row.payment_method_bank_branch + '$$' + row.payment_method_bank_account + '" class="btn-round btn-outline btn updateIT" style="font-size:13px">Update</button>'
				}
			},
			{
				"orderable": false, "targets": 92, "data": "approve", render: function (data, type, row) {
					return '<button id="' + row.merchant_id + '" name="' + row.user_id + '" class="btn-round btn-outline btn approveIT">Approve</button>'
				}
			}
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('three').innerHTML = 'Unapproved Merchant: ' + json.data.length;
	});
	table.clear().draw();
	merchantOrgDatatableStyle();
	$('#dtBasicExample2').show();
	$('.b').show();

	$('#dtBasicExample2 tbody').off('click', 'td.details-control');
	$('#dtBasicExample2 tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExample2').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnapproved(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
};

var activated = () => {

	merchantOrgButtonActive();
	merchantOrgTableHide();
	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').disabled = true;

	var table = $('#dtBasicExampleActivate').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "orgHead/enable/merchant/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data"
		},
		"columns": [
			{
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>"
			},
			{ "targets": 1, "data": "org_name" },
			{
				"orderable": false, "targets": 7, "data": "update", render: function (data, type, row) {

					return '<button id="' + row.approved_merchant_id + '"  class="btn-round btn-outline btn btn-EditCriteria">Edit</button>'
				}
			},
			{
				"orderable": false, "targets": 2, "data": "enable_otp", render: function (data, type, row) {

					return '<button id="' + row.approved_merchant_id + 'AenaOTP"  class="btn-round btn-outline btn btn-EnableOTP">Enable OTP</button>'
				}
			},
			{
				"orderable": false, "targets": 3, "data": "disable_otp", render: function (data, type, row) {

					return '<button id="' + row.approved_merchant_id + 'AdisOTP"  class="btn-round btn-outline btn btn-DisableOTP">Disable OTP</button>'
				}
			},
			{
				"orderable": false, "targets": 4, "data": "invoice", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.approved_merchant_id + '" class="btn-round btn-outline btn" onclick=invoice(this)>Invoice</button>'
				}
			},
			{
				"orderable": false, "targets": 5, "data": "complete_payment", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.approved_merchant_id + '" class="btn-round btn-outline btn btn-taka">Complete</button>'
				}
			},
			{
				"orderable": false, "targets": 6, "data": "disable", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.approved_merchant_id + '" class="btn-round btn-outline btn btn-Disable">Disable</button>'
				}
			}
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
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
					//console.log(dataOTP);
					table.rows().every(function (index, element) {

						var row = $(this.node());
						row.find('td').eq(3)[0].children[0].disabled = dataOTP.data.indexOf(json.data[index].approved_merchant_id) !== -1 ? true : false;
						row.find('td').eq(4)[0].children[0].disabled = !row.find('td').eq(3)[0].children[0].disabled;

						row.find('td').eq(2)[0].children[0].disabled = flag ? false : true;

						// console.log(element, row, statusElement, row.find('td'));
						// var isChecked = statusElement.prop('checked');
						// /* ... etc ... */
					});
				}
			});
		document.getElementById('four').innerHTML = 'Activated Merchant: ' + json.data.length;
	});
	$('#dtBasicExampleActivate tbody').off('click', 'td.details-control');
	$('#dtBasicExampleActivate tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleActivate').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatActivated(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});

	merchantOrgDatatableStyle();
	$('#dtBasicExampleActivate').show();
	$('.c').show();
};

var disabledd = () => {
	merchantOrgButtonActive();
	merchantOrgTableHide();

	document.getElementById('five').style.fontSize = '13px';
	document.getElementById('five').disabled = true;

	var table = $('#dtBasicExampleDisable').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "orgHead/disable/merchant/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data"
		},
		"columns": [
			{
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>"
			},
			{ "targets": 1, "data": "org_name" },
			{ "targets": 5, "data": "phone_number" },
			{ "targets": 7, "data": "per_delivery_cost" },
			{ "targets": 8, "data": "cod_percentage" },
			{
				"orderable": false, "targets": 9, "data": "Activate", render: function (data, type, row) {
					return '<button id="' + org_ID + '" name="' + row.approved_merchant_id + '" class="btn-round btn-outline btn btn-Activate">Activate</button>'
				}
			}
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('five').innerHTML = 'Disabled Merchant: ' + json.data.length;
	});

	$('#dtBasicExampleDisable tbody').off('click', 'td.details-control');
	$('#dtBasicExampleDisable tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleDisable').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatApproved(row.data())).show();
			tr.addClass('shown');
			tdColspan();
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
	var mbank = document.querySelector("#mobileBank").checked;
	var bbank = document.querySelector("#phyBank").checked;
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
		else if ((phone.length < 11 || phone.length > 11) || /\D/.test(phone) == true) {
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
			modalErrorShowForCreateUpdateMerchant("Business Category cannot be empty!", "business_filed");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if ((parseInt(per_delivery_cost) < 0) || (per_delivery_cost.length > 1 && per_delivery_cost.charAt(0) == "0")) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be greater than or equal to 0!", "per_delivery_cost");
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
	var mselect, minput;
	var v7 = () => {
		if (mbank) {
			mselect = document.querySelector("#brb").value;
			minput = document.querySelector("#brbInput").value;
			if (minput == "" || minput == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number cannot be empty!`, "brbInput");
				return 0;
			}
			else if ((minput.length < 11 || minput.length > 11) || /\D/.test(minput) == true) {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number must be of 11 digits!`, "brbInput");
				return 0;
			}
			else if (minput.match(/\d/g).length === 11 && !/\D/.test(minput) == true) {
				return 1;
			}
			else {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number not valid!`, "brbInput");
				return 0;
			}
		}
		else {
			mselect = "";
			minput = "";
			return 1;
		}
	}
	var bselect, bName, branchName, accountNo;
	var v8 = () => {
		if (bbank) {
			bselect = "yes";
			bName = document.querySelector("#bName").value;
			branchName = document.querySelector("#branchName").value;
			accountNo = document.querySelector("#accountNo").value;
			if (bName == "" || bName == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Bank Name</strong> cannot be empty!`, "bName");
				return 0;
			}
			else if (branchName == "" || branchName == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Branch Name</strong> cannot be empty!`, "branchName");
				return 0;
			}
			else if (accountNo == "" || accountNo == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Account No</strong> cannot be empty!`, "accountNo");
				return 0;
			}
			else {
				return 1
			}
		}
		else {
			bselect = "no";
			bName = branchName = accountNo = "";
			return 1;
		}
	}
	if (v2() == 1 && v1() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1 && v7() == 1 && v8() == 1) {
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
						"per_delivery_cost": per_delivery_cost,
						"payment_method_mobile_number": minput,
						"payment_method_mobile": mselect,
						"payment_method_bank": bselect,
						"payment_method_bank_name": bName,
						"payment_method_bank_branch": branchName,
						"payment_method_bank_account": accountNo
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

var arr, id_merchant_update, whichTable;
$('#dtBasicExample').on('click', '.updateIT', function () {
	whichTable = "dtBasicExample";
	$(".cod_per_w").show();
	merId = $(this).attr('id');
	id_merchant_update = $(this).attr('id');
	arr = [];
	arr = merId.split('$$');

	$t = $(this);

	document.getElementById('org_name2').value = arr[1];
	document.getElementById('person_name2').value = arr[2];
	document.getElementById('email2').value = arr[3];
	document.getElementById('phone_number2').value = arr[4];
	document.getElementById('business_filed2').value = arr[5];
	document.getElementById('per_cost').value = arr[6];
	document.getElementById('cod_per').value = arr[7];

	if (arr[8] && arr[8] != "no" && arr[8] !== "undefined") {
		document.querySelector("#mobileBank2").checked = true;
		document.querySelector("#brb2").selectedIndex = arr[8].toUpperCase() === "BKASH" ? 0 : 1;
		document.querySelector("#brbInput2").value = arr[9];
		document.querySelector(".bankUpdate").classList.add("paddForm2");
	}
	else {
		document.querySelector("#mobileBank2").checked = false;
		document.querySelector("#brb2").selectedIndex = 0;
		document.querySelector("#brbInput2").value = '';
		document.querySelector(".bankUpdate").classList.remove("paddForm2");
	}

	if (arr[10] === "yes") {
		document.querySelector("#phyBank2").checked = true;
		document.querySelector("#bName2").value = arr[11];
		document.querySelector("#branchName2").value = arr[12];
		document.querySelector("#accountNo2").value = arr[13];
		document.querySelector(".bankUpdate").classList.add("paddForm2BankPhy");
	}
	else {
		document.querySelector("#phyBank2").checked = false;
		document.querySelector("#bName2").value = "";
		document.querySelector("#branchName2").value = "";
		document.querySelector("#accountNo2").value = "";
		document.querySelector(".bankUpdate").classList.remove("paddForm2BankPhy");
	}

	modalForm();
	document.getElementById('myModalFormHeader').innerHTML = `Merchant: <strong>${arr[1]}</strong>`;

	$('.cancelMod').prop('disabled', false);
	$('.btn-ok-update').prop('disabled', false);

	$("#formUpdate").show();
	$("#modalApproveForm").show();
});

$('#dtBasicExample2').on('click', '.updateIT', function () {
	whichTable = "dtBasicExample2";
	$(".cod_per_w").hide();

	merId = $(this).attr('id');
	id_merchant_update = $(this).attr('id');
	arr = [];
	arr = merId.split('$$');

	$t = $(this);
	if (arr[7]) {
		arr[7] = 0;
	}
	document.getElementById('org_name2').value = arr[1];
	document.getElementById('person_name2').value = arr[2];
	document.getElementById('email2').value = arr[3];
	document.getElementById('phone_number2').value = arr[4];
	document.getElementById('business_filed2').value = arr[5];
	document.getElementById('per_cost').value = arr[6];
	document.getElementById('cod_per').value = arr[7];

	if (arr[8] && arr[8] != "no" && arr[8] !== "undefined") {
		document.querySelector("#mobileBank2").checked = true;
		document.querySelector("#brb2").selectedIndex = arr[8].toUpperCase() === "BKASH" ? 0 : 1;
		document.querySelector("#brbInput2").value = arr[9];
		document.querySelector(".bankUpdate").classList.add("paddForm2");
	}
	else {
		document.querySelector("#mobileBank2").checked = false;
		document.querySelector("#brb2").selectedIndex = 0;
		document.querySelector("#brbInput2").value = '';
		document.querySelector(".bankUpdate").classList.remove("paddForm2");
	}

	if (arr[10] === "yes") {
		document.querySelector("#phyBank2").checked = true;
		document.querySelector("#bName2").value = arr[11];
		document.querySelector("#branchName2").value = arr[12];
		document.querySelector("#accountNo2").value = arr[13];
		document.querySelector(".bankUpdate").classList.add("paddForm2BankPhy");
	}
	else {
		document.querySelector("#phyBank2").checked = false;
		document.querySelector("#bName2").value = "";
		document.querySelector("#branchName2").value = "";
		document.querySelector("#accountNo2").value = "";
		document.querySelector(".bankUpdate").classList.remove("paddForm2BankPhy");
	}

	modalForm();
	document.getElementById('myModalFormHeader').innerHTML = `Merchant: <strong>${arr[1]}</strong>`;

	$('.cancelMod').prop('disabled', false);
	$('.btn-ok-update').prop('disabled', false);

	$("#formUpdate").show();
	$("#modalApproveForm").show();
});

function modalErrorShowForCreateUpdateMerchant(message, focusWehere) {
	document.getElementById('error').innerHTML = message;
	document.getElementById('errorButton').innerHTML = "Correct It";
	$('#myModalError').modal('show');
	document.getElementById(focusWehere).focus();
	document.getElementById("myModalForm").style.overflowY = "auto";
}
$('.btn-ok-update').on("click", function (e) {
	e.preventDefault();
	console.log("HEllo");
	var org_name = document.getElementById('org_name2').value;
	var person_name = document.getElementById('person_name2').value;
	var phone_number = document.getElementById('phone_number2').value;
	var email = document.getElementById('email2').value;
	var business_filed = document.getElementById('business_filed2').value;
	var per_delivery_cost = document.getElementById('per_cost').value;
	var cod_per = document.getElementById('cod_per').value;
	var bselect, bName, branchName, accountNo;
	var mselect, minput;
	var mbank = document.querySelector("#mobileBank2").checked;
	var bbank = document.querySelector("#phyBank2").checked;

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
		else if ((phone_number.length < 11 || phone_number.length > 11) || /\D/.test(phone_number) == true) {
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
			modalErrorShowForCreateUpdateMerchant("Business Category cannot be empty!", "business_filed2");
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if ((parseInt(per_delivery_cost) < 0) || (per_delivery_cost.length > 1 && per_delivery_cost.charAt(0) == "0")) {
			modalErrorShowForCreateUpdateMerchant("Per Delivery Cost must be greater than or equal to 0!", "per_cost");
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

	var v8 = () => {
		if (mbank) {
			mselect = document.querySelector("#brb2").value;
			minput = document.querySelector("#brbInput2").value;
			if (minput == "" || minput == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number cannot be empty!`, "brbInput2");
				return 0;
			}
			else if ((minput.length < 11 || minput.length > 11) || /\D/.test(minput) == true) {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number must be of 11 digits!`, "brbInput2");
				return 0;
			}
			else if (minput.match(/\d/g).length === 11 && !/\D/.test(minput) == true) {
				return 1;
			}
			else {
				modalErrorShowForCreateUpdateMerchant(`<strong>${mselect}</strong>: Phone Number not valid!`, "brbInput2");
				return 0;
			}
		}
		else {
			mselect = "no";
			minput = "";
			return 1;
		}
	}
	var v9 = () => {
		if (bbank) {
			bselect = "yes";
			bName = document.querySelector("#bName2").value;
			branchName = document.querySelector("#branchName2").value;
			accountNo = document.querySelector("#accountNo2").value;
			if (bName == "" || bName == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Bank Name</strong> cannot be empty!`, "bName2");
				return 0;
			}
			else if (branchName == "" || branchName == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Branch Name</strong> cannot be empty!`, "branchName2");
				return 0;
			}
			else if (accountNo == "" || accountNo == null) {
				modalErrorShowForCreateUpdateMerchant(`<strong>Account No</strong> cannot be empty!`, "accountNo2");
				return 0;
			}
			else {
				return 1
			}
		}
		else {
			bselect = "no";
			bName = branchName = accountNo = "";
			return 1;
		}
	}
	if (v1() == 1 && v2() == 1 && v3() == 1 && v4() == 1 && v5() == 1 && v6() == 1 && v7() == 1 && v8() == 1 && v9() == 1) {
		modalFormBeforeSuccess();
		var trimmer = cod_per.trim();
		trimmer = parseInt(trimmer);
		var datap = JSON.stringify
			({
				"merchant_id": arr[0],
				"user_id": org_ID,
				"org_name": org_name,
				"person_name": person_name,
				"phone_number": phone_number,
				"email": email,
				"business_filed": business_filed,
				"per_delivery_cost": per_delivery_cost,
				"cod_percentage": trimmer,
				"payment_method_mobile": mselect,
				"payment_method_mobile_number": minput,
				"payment_method_bank": bselect,
				"payment_method_bank_name": bName,
				"payment_method_bank_branch": branchName,
				"payment_method_bank_account": accountNo
			});
		console.log(datap);
		$.ajax
			({
				type: "PUT",
				url: urlForAll + "orgHead/merchant/update",
				// url: urlForAll + "orgHead/merchant",
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
						"cod_percentage": trimmer,
						"payment_method_mobile": mselect,
						"payment_method_mobile_number": minput,
						"payment_method_bank": bselect,
						"payment_method_bank_name": bName,
						"payment_method_bank_branch": branchName,
						"payment_method_bank_account": accountNo
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					// var newArr;
					// newArr = [
					// 	data.data.merchant_id,
					// 	data.data.org_name,
					// 	data.data.person_name,
					// 	data.data.email,
					// 	data.data.phone_number,
					// 	data.data.business_filed,
					// 	data.data.per_delivery_cost,
					// 	data.data.cod_percentage,
					// 	'<button id="' + data.data.merchant_id + '$$' + data.data.org_name + '$$' + data.data.person_name + '$$' + data.data.email + '$$' + data.data.phone_number + '$$' + data.data.business_filed + '$$' + data.data.per_delivery_cost + '$$' + data.data.cod_percentage + '" class="btn-round btn-outline btn updateIT">Update</button>'
					// ];
					var table = $(`#${whichTable}`).DataTable();
					try {
						table.row($t.closest('tr')).data(data.data);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 1 }).data(data.data.org_name);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 2 }).data(data.data.phone_number);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 3 }).data(data.data.per_delivery_cost);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 4 }).data(data.data.cod_percentage);
						// document.getElementById(`${id_merchant_update}`).id = data.data.merchant_id + '$$' + data.data.org_name + '$$' + data.data.person_name + '$$' + data.data.email + '$$' + data.data.phone_number + '$$' + data.data.business_filed + '$$' + data.data.per_delivery_cost + '$$' + data.data.cod_percentage;
					}
					catch (e) {
						//console.log(e);
					}
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tickForm').show();

						$("#sureForm").html("Merchant Updated!");
					}, 1000);

					setTimeout(function () {
						$("#myModalForm").modal('hide');
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

function profileGetter(id) {
	$.ajax
		({
			type: "GET",
			url: urlForAll + "profile/get/profile/" + id,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				document.getElementById('myModalFormHeader').innerHTML = `Update <strong>${data.data.sender_name}</strong>'s Criteria?`;
			},
			error: function (data) {
				document.getElementById('myModalFormHeader').innerHTML = `Update Criteria?`;
			}
		})
};

var criteriaMer, criteriaEnabledMer;
$('#dtBasicExampleActivate').on('click', '.btn-EditCriteria', function () {
	criteriaMer = $(this).attr('id');
	profileGetter($(this).attr('id'));
	$t = $(this);

	modalForm();
	Array.from(document.querySelectorAll(".flexIt2 input")).map(item => {
		item.value = "";
		item.disabled = false;
		item.placeholder = "";
	});
	$("#formUpdateCriteria").show();
	$("#modalApproveCriteria").show();
	$('.cancelMod').prop('disabled', false);
	$('.btn-ok-updateCriteria').prop('disabled', false);
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
	identifier.style.cssText = "color: #0066b3; margin:1rem 0; width: 50%;";

	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeHolder;
	// identidier.value = values !== undefined ? values : "";
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

// document.querySelector("#criteriaReset").addEventListener("click", function (e) {
// 	e.preventDefault();
// 	document.querySelectorAll(`.flexIt2`) ?
// 		Array.from(document.querySelectorAll(`.flexIt2 input`))
// 			.map(item => {
// 				item.disabled = false;
// 				item.placeholder = "";
// 				item.value = "";
// 			}) : null;
// });

function blockInputs(classNameInput, event) {
	if (event.key === "Backspace" || event.key === "Tab") {
		unlockAll(classNameInput, event);
	}
	else {
		lockElse(classNameInput, event);
	}
}
function getData() {
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
							//console.log(document.querySelector(`.${item}${itemKeys.replace(/ /g, "")}`), `.${item}${itemKeys}`, `.${item}${itemKeys.replace(/ /g, "")}`);
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
			//console.log(index, item);
			let obj = {};
			for (const i of fillData[item]) {
				if (document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value) {
					//console.log(i, typesArray[index] + i.replace(/ /g, ""), item, index, document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`));
					let testingNumber = /^\d+$/.test(document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value);
					if (!testingNumber) {
						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
						document.getElementById('error').innerHTML = `"${i}" Must Be A Number!`;
						document.getElementById('errorButton').innerHTML = "Correct It";
						$('#myModalError').modal('show');
						flagger = 0;
						document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).focus();
						break;
					}
					let testingNumberLength = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value.match(/\d/g);
					if (testingNumberLength.length > 5) {
						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelMod').prop('disabled', false);
						document.getElementById('error').innerHTML = `"${i}" Must Be Less Than 5 Digits!`;
						document.getElementById('errorButton').innerHTML = "Correct It";
						$('#myModalError').modal('show');
						flagger = 0;
						document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).focus();
						break;
					}
				}
				obj[i] = document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value ? document.querySelector(`input[class$='${typesArray[index] + i.replace(/ /g, "")}']`).value : 0;
			}
			if (!flagger) {
				document.getElementById("myModalForm").style.overflowY = "auto";
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
		// console.log(array);
		if (flagger) {
			modalFormBeforeSuccess();
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
						// console.log(data);
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							$('#tickForm').show();

							$("#sureForm").html("Merchant's Criteria Updated!");
						}, 1000);

						setTimeout(function () {
							$("#myModalForm").modal('hide');
							$('.btn-ok-updateCriteria').attr('disabled', false);
							$('.cancelModCriteria').prop('disabled', false);
						}, 2000);
					},
					error: function (data) {
						$('.btn-ok-updateCriteria').attr('disabled', false);
						$('.cancelModCriteria').prop('disabled', false);
						$('#myModalForm').modal('hide');
						modalError(data);
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
	$('#myModalForAll').modal('hide');
	document.getElementById('modalCancelButton').disabled = false;
	var ob = Object.keys(data);
	if (ob[17] == "responseJSON") {
		document.getElementById('error').innerHTML = data.responseJSON.errorMessage + 's';
	}
	else {
		document.getElementById('error').innerHTML = "Something Went Wrong!";
	}
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
$('.btn-okActivate').on("click", function (e) {
	e.preventDefault();
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
						.draw(false);
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
$('.btn-okDisable').on("click", function (e) {
	e.preventDefault();
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
						.draw(false);
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
$('.btn-ok').on("click", function (e) {
	e.preventDefault();
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
					$("#myModalForAll").modal('hide');
					var table = $('#dtBasicExample2').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
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
$('.btn-okPayment').on("click", function (e) {
	e.preventDefault();
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
	merId = $(this).attr('id').split("A")[0];
	$t = $(this);
	$('.btn-okActivate2').show();

	$("#modalForAllHeader").html("Disable OTP?");

	modalStart();
});
$('.btn-okActivate2').on("click", function (e) {
	e.preventDefault();
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

					document.getElementById(`${merId}AenaOTP`).disabled = false;
					document.getElementById(`${merId}AdisOTP`).disabled = true;

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
	merId = $(this).attr('id').split("A")[0];
	$t = $(this);

	modalButtonHide();
	$('.btn-okActivate3').show();

	$("#modalForAllHeader").html("Enable OTP?");

	modalStart();
});
$('.btn-okActivate3').on("click", function (e) {
	e.preventDefault();
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

					document.getElementById(`${merId}AenaOTP`).disabled = true;
					document.getElementById(`${merId}AdisOTP`).disabled = false;

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