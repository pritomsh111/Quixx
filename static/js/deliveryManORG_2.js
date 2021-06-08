var org_ID = localStorage.getItem('userID');
var abtn = document.querySelector('#btn');
abtn.onclick = checkAll;

function btnsActive() {
	document.getElementById('twoa').style.fontSize = '13px';
	document.getElementById('twoa').disabled = false;
	document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
	document.getElementById('four').style.fontSize = '13px';
	document.getElementById('four').disabled = false;
	document.getElementById('threea').style.fontSize = '13px';
	document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
	document.getElementById('threea').disabled = false;

	document.getElementById('foura').style.fontSize = '13px';
	document.getElementById('foura').disabled = false;
	document.getElementById('foura').innerHTML = 'Activated Delivery Man';
	document.getElementById('fivea').style.fontSize = '13px';
	document.getElementById('fivea').disabled = false;
	document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#deliveryManCreate').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
}

function dTStyle() {
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '220px', 'display': 'inline-block', 'color': '#0066b3', 'background': '#FFFFFF' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#0066b3', 'background': '#FFFFFF' });
}

var createDeliveryMan = () => {
	btnsActive();
	document.getElementById('four').disabled = true;
	$('#deliveryManCreate').show();
};

function formatApproved(d) {
	return '<table id="innerRowTable" style="border-spacing: 5rem; text-align: left">' +
		'<tr>' +
		'<td>Delivery Man\'s ID:</td > ' +
		'<td>' + d.delivery_man_id + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Man\'s Email:</td > ' +
		'<td>' + d.email + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Area:</td>' +
		'<td>' + d.delivery_area.replace(/,/g, ", ") + '</td>' +
		'</tr>' +
		'</table>';
}

function uncheckAll(event) {
	event.preventDefault();
	check(false);
	// reassign click event handler
	this.onclick = checkAll;
}

function checkAll(event) {
	event.preventDefault();
	check();
	// reassign click event handler
	this.onclick = uncheckAll;
}

function check(checked = true) {
	const cbs = document.querySelectorAll('input[name="mycheckboxes"]');
	cbs.forEach((cb) => {
		cb.checked = checked;
	});
}

var thisInvoice = (id) => {
	window.open(urlForAll + "reports/individual/deliveryMan/report/" + org_ID + "/" + id.id);
}

// var registeredDeliveryMan = () => {
// 	document.getElementById('onea').disabled = true;
// 	document.getElementById('twoa').disabled = false;
// 	document.getElementById('threea').disabled = false;
// 	document.getElementById('four').disabled = false;
// 	document.getElementById('onea').style.fontSize = '13px';
// 	document.getElementById('twoa').style.fontSize = '13px';
// 	document.getElementById('threea').style.fontSize = '13px';
// 	document.getElementById('four').style.fontSize = '13px';
// 	document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
// 	document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
// 	document.getElementById('foura').style.fontSize = '13px';
// 	document.getElementById('fivea').style.fontSize = '13px';
// 	document.getElementById('foura').innerHTML = 'Activated Delivery Man';
// 	document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

// 	document.getElementById('foura').disabled = false;
// 	document.getElementById('fivea').disabled = false;
// 	$('#dtBasicExampleActivate').hide();
// 	$('#dtBasicExampleDisable').hide();
// 	$('.c').hide();
// 	$('.d').hide();
// 	$('#deliveryManCreate').hide();
// 	$('#dtBasicExample2').hide();
// 	$('.b').hide();
// 	$('#dtBasicExample').hide();
// 	$('.a').hide();

// 	var table = $('#dtBasicExample').DataTable({
// 		"processing": true,
// 		'language': {
// 			'loadingRecords': '&nbsp;',
// 			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
// 		},
// 		"destroy": true,
// 		"oSearch": { "bSmart": false, "bRegex": true }
// 	});
// 	table.clear().draw();
// 	$.ajax
// 		({
// 			type: "GET",
// 			url: urlForAll + "deliveryMan/getDeliveryManByUserId/" + org_ID,
// 			headers:
// 			{
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
// 				"Authorization": 'Bearer ' + localStorage.getItem('token')
// 			},
// 			beforeSend: function () {
// 				document.getElementById("dtBasicExample_processing").style.display = "block";
// 			},
// 			success: function (data) {
// 				document.getElementById('onea').innerHTML = 'Registered Delivery Man: ' + data.data.length;
// 				var trHTML = '';
// 				$.each(data.data, function (i, item) {
// 					var table_rows = '<tr><td>'
// 						+ data.data[i].delivery_man_id + '</td><td>'
// 						+ data.data[i].name + '</td><td>'
// 						+ data.data[i].email + '</td><td>'
// 						+ data.data[i].phone_number + '</td><td>'
// 						+ data.data[i].delivery_area + '</td><td>'
// 						+ data.data[i].reporting_boss_email + '</td><td>'
// 						+ '<button class="btn-round btn-outline btn" disabled>Invoice</button></td></tr>';

// 					table.rows.add($(table_rows)).draw();
// 				});
// 			},
// 			complete: function (data) {
// 				document.getElementById("dtBasicExample_processing").style.display = "none";
// 			}
// 		});

// 	$('.dataTables_filter input[type="search"]').
// 		attr('placeholder', 'Search anything!').
// 		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

// 	$('.dataTables_filter input[type="search"]').
// 		attr('class', 'btn btn-round').
// 		css({ 'width': '220px', 'display': 'inline-block', 'color': '#0066b3', 'background': '#FFFFFF' });

// 	$('.dataTables_length select').
// 		attr('class', 'btn btn-round').
// 		css({ 'width': '80px', 'background-color': 'white', 'color': '#0066b3', 'background': '#FFFFFF' });
// 	$('#dtBasicExample').show();
// 	$('.a').show();
// };
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
var approvedDeliveryMan = () => {
	btnsActive();
	document.getElementById('twoa').disabled = true;

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
			"url": urlForAll + "deliveryMan/approved/" + org_ID,
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
			{ "targets": 12, "data": "name" },
			{ "targets": 52, "data": "phone_number" },
			{ "targets": 72, "data": "reporting_boss_email" },
			{
				"orderable": false, "targets": 4, "data": "update", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '$$' + row.name + '$$' + row.phone_number + '$$' + row.email + '$$' + row.reporting_boss_email + '$$' + row.delivery_area + '" class="btn-round btn-outline btn updateDM">Update</button>'
				}
			},
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('twoa').innerHTML = 'Approved Delivery Man: ' + json.data.length;
	});

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
	dTStyle();
	$('#dtBasicExample').show();
	$('.a').show();
}

var unApprovedDeliveryMan = () => {
	btnsActive();
	document.getElementById('threea').disabled = true;

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
			"url": urlForAll + "deliveryMan/unApproved/" + org_ID,
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
			{ "targets": 12, "data": "name" },
			{ "targets": 52, "data": "phone_number" },
			{ "targets": 72, "data": "reporting_boss_email" },
			{
				"orderable": false, "targets": 7, "data": "update", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '$$' + row.name + '$$' + row.phone_number + '$$' + row.email + '$$' + row.reporting_boss_email + '$$' + row.delivery_area + '" class="btn-round btn-outline btn updateDM">Update</button>'
				}
			},
			{
				"orderable": false, "targets": 4, "data": "approve", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '" class="btn-round btn-outline btn approveIT">Approve</button>'
				}
			},
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('threea').innerHTML = 'Unapproved Delivery Man: ' + json.data.length;
	});

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
			row.child(formatApproved(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
	dTStyle();
	$('#dtBasicExample2').show();
	$('.b').show();
};


var activatedd = () => {
	btnsActive();
	document.getElementById('foura').disabled = true;
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
			"url": urlForAll + "orgHead/all/enable/deliveryMan/" + org_ID,
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
			{ "targets": 12, "data": "name" },
			{ "targets": 52, "data": "phone_number" },
			{ "targets": 72, "data": "reporting_boss_email" },
			{
				"orderable": false, "targets": 4, "data": "invoice", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '" class="btn-round btn-outline btn" onclick="thisInvoice(this)">Invoice</button>'
				}
			},
			{
				"orderable": false, "targets": 44, "data": "disable", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '" class="btn-round btn-outline btn btn-Disable">Disable</button>'
				}
			},
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('foura').innerHTML = 'Activated Delivery Man: ' + json.data.length;
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
			row.child(formatApproved(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
	dTStyle();
	$('#dtBasicExampleActivate').show();
	$('.c').show();
};


var disableddd = () => {
	btnsActive();
	document.getElementById('fivea').disabled = true;

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
			"url": urlForAll + "orgHead/all/disable/deliveryMan/" + org_ID,
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
			{ "targets": 12, "data": "name" },
			{
				"orderable": true, "targets": 4, "data": "enable", render: function (data, type, row) {
					return row.phone_number.substring(0, 11);
				}
			},
			{ "targets": 72, "data": "reporting_boss_email" },
			{
				"orderable": false, "targets": 4, "data": "enable", render: function (data, type, row) {
					return '<button id="' + row.delivery_man_id + '" class="btn-round btn-outline btn btn-Activate">Activate</button>'
				}
			}
		],
		"order": [[1, 'asc']]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('fivea').innerHTML = 'Disabled Delivery Man: ' + json.data.length;
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
	dTStyle();
	$('#dtBasicExampleDisable').show();
	$('.d').show();
};
var addDeliveryMan = () => {
	//$('#deliveryManCreate').hide();
	var deliveryManName = document.getElementById('deliveryManName').value;
	var deliveryManEmail = document.getElementById('deliveryManEmail').value;
	var deliveryManPhone = document.getElementById('deliveryManPhone').value;
	var reportingBossEmail = document.getElementById('managers').value;
	var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
	var s = "";
	var l = checkedBoxes.length, dummy = 0;
	for (var i of checkedBoxes) {
		s += String(i.value);
		dummy++;
		if (dummy < l) {
			s += ",";
		}
	}
	var v1 = () => {
		if (deliveryManName == "" || deliveryManName == null) {
			document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's name cannot be empty!";
			$('#myModalWrongDManCreate').modal('show');
			document.getElementById("deliveryManName").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (deliveryManEmail == "" || deliveryManEmail == null) {
			document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's email cannot be empty!";
			$('#myModalWrongDManCreate').modal('show');
			document.getElementById("deliveryManEmail").focus();
			return 0;
		}
		else if (deliveryManEmail != "" || deliveryManEmail != null) {
			var em = deliveryManEmail.split("@").length - 1;
			var atposition = deliveryManEmail.indexOf("@");
			var dotposition = deliveryManEmail.lastIndexOf(".");
			if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= deliveryManEmail.length || em > 1) {
				document.getElementById('wrongThisDManCreate').innerHTML = "Please enter a valid e-mail address!";
				$('#myModalWrongDManCreate').modal('show');
				document.getElementById("deliveryManEmail").focus();
				return 0;
			}
			else {
				return 1;
			}
		}

	}
	var v4 = () => {
		if (deliveryManPhone == "" || deliveryManPhone == null) {
			document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number cannot be empty!";
			$('#myModalWrongDManCreate').modal('show');
			document.getElementById("deliveryManPhone").focus();
			return 0;
		}
		else if ((deliveryManPhone.length < 11 || deliveryManPhone.length > 11) || /\D/.test(deliveryManPhone) == true) {
			document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number must be of 11 digits!";
			$('#myModalWrongDManCreate').modal('show');
			document.getElementById("deliveryManPhone").focus();
			return 0;
		}
		else if (deliveryManPhone.match(/\d/g).length === 11 && !/\D/.test(deliveryManPhone) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number not valid!";
			$('#myModalWrongDManCreate').modal('show');
			document.getElementById("deliveryManPhone").focus();
			return 0;
		}

	}
	var v5 = () => {
		if (l == 0) {
			document.getElementById('wrongThisDManCreate').innerHTML = "Please select at least one Delivery Area!";
			$('#myModalWrongDManCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	if (v1() == 1 && v3() == 1 && v4() == 1 && v5() == 1) {
		document.getElementById('DeliveryMan_CREATION').disabled = true;
		//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
		//$(".container").show();
		$.ajax
			({
				type: "POST",
				url: urlForAll + "deliveryMan/create/" + org_ID, //loginUserID,
				data: JSON.stringify
					({
						"name": deliveryManName,
						"phone_number": deliveryManPhone,
						"email": deliveryManEmail,
						"delivery_area": s,
						"reporting_boss_email": reportingBossEmail
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					$('#tick').hide();
					$(".circle-loader").removeClass("load-complete");
					$("#sure").html("");
					$("#myModal").modal('show');
					if (data.status == 'OK') {
						$("#sure").html("Please wait!");
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							$('#tick').show();

							$("#sure").html("Delivery man added!");
						}, 500);
						$('input[type=checkbox]').prop('checked', false);
						document.getElementById('deliveryManName').value = "";
						document.getElementById('deliveryManEmail').value = "";
						document.getElementById('deliveryManPhone').value = "";
						setTimeout(function () {

							document.getElementById('DeliveryMan_CREATION').disabled = false;
							$("#myModal").modal('hide');
						}, 1200);
					}
				},
				error: function (data) {
					document.getElementById('DeliveryMan_CREATION').disabled = false;
					document.getElementById('wrong').innerHTML = data.responseJSON.errorMessage + 's';
					$('#myModal2').modal('show');
				}
			})
	}
};

function findReportingBoss() {

}

$('#dtBasicExample').on('click', '.updateDM', function () {
	whichTableD = "#dtBasicExample";
	deliveryManId = $(this).attr('id');
	$('#tickFormD').hide();
	$(".circle-loader").removeClass("load-complete");
	$(".circle-loader").hide();

	$("#sureFormD").hide();
	$('.cancelModD').prop('disabled', false);
	$('.btn-ok-updateD').prop('disabled', false);

	arr = [];
	arr = deliveryManId.split('$$');

	$t = $(this);
	document.getElementById('deliveryManNameU').value = arr[1];
	document.getElementById('deliveryManPhoneU').value = arr[2];
	document.getElementById('deliveryManEmailU').value = arr[3];
	// findReportingBoss();
	// findDeliveryArea();
	document.getElementById('reporting_boss_emailU').value = arr[4];
	document.getElementById('delivery_areaU').value = arr[5];

	document.getElementById('myModalFormHeaderD').innerHTML = `Delivery Man: <strong>${arr[1]}</strong>`;

	$("#myModalFormD").modal('show');
});

$('#dtBasicExample2').on('click', '.approveIT', function () {
	deliveryManId = $(this).attr('id');
	$t = $(this);

	$('#tick2').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure2").html("Are you sure?");
	$("#myModalMer").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok').on("click", function () {

	$("#sure2").html("Please wait!");
	document.getElementById('modalCancelX').disabled = true;
	document.getElementById('modalApproveX').disabled = true;
	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/deliveryMan/" + deliveryManId,

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sure2").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tick2').show();

					$("#sure2").html("Delivery Man Approved!");
				}, 500);

				setTimeout(function () {
					$("#myModalMer").modal('hide');
					var table = $('#dtBasicExample2').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
					document.getElementById('threea').innerHTML = 'Unapproved Delivery Man: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancelX').disabled = false;
					document.getElementById('modalApproveX').disabled = false;

				}, 1200);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				document.getElementById('modalCancelX').disabled = false;
				document.getElementById('modalApproveX').disabled = false;
				$('#myModalMer').modal('hide');
				$('#myModalE').modal('show');
			}
		});
});

$('#dtBasicExampleActivate').on('click', '.btn-Disable', function () {
	merId = $(this).attr('id');
	$t = $(this);

	$('#tickActivate').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sureActivate").html("Are you sure?");
	$("#myModalMerActivate").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okActivate').on("click", function () {

	$("#sureActivate").html("Please wait!");
	document.getElementById('modalCancel1Activate').disabled = true;
	document.getElementById('modalApprove1Activate').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "orgHead/disable/deliveryMan/" + org_ID + "/" + merId,

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

					$("#sureActivate").html("Delivery Man Disabled!");
				}, 500);

				setTimeout(function () {
					$("#myModalMerActivate").modal('hide');
					var table = $('#dtBasicExampleActivate').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
					document.getElementById('foura').innerHTML = 'Activated Delivery Man: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancel1Activate').disabled = false;
					document.getElementById('modalApprove1Activate').disabled = false;
				}, 1200);
			},
			error: function (data) {

				document.getElementById('modalCancel1Activate').disabled = false;
				document.getElementById('modalApprove1Activate').disabled = false;
				$('#myModalMerActivate').modal('hide');
				$('#myModalE').modal('show');
			}
		});
});

$('#dtBasicExampleDisable').on('click', '.btn-Activate', function () {
	merId = $(this).attr('id');
	$t = $(this);

	$('#tickDisable').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sureDisable").html("Are you sure?");
	$("#myModalMerDisable").modal('show');
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okDisable').on("click", function () {

	$("#sureDisable").html("Please wait!");
	document.getElementById('modalCancel1Disable').disabled = true;
	document.getElementById('modalApprove1Disable').disabled = true;
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "orgHead/enable/deliveryMan/" + org_ID + "/" + merId,

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

					$("#sureDisable").html("Delivery Man Activated!");
				}, 500);

				setTimeout(function () {
					$("#myModalMerDisable").modal('hide');
					var table = $('#dtBasicExampleDisable').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
					document.getElementById('fivea').innerHTML = 'Disabled Delivery Man: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancel1Disable').disabled = false;
					document.getElementById('modalApprove1Disable').disabled = false;
				}, 1200);
			},
			error: function (data) {

				document.getElementById('modalCancel1Disable').disabled = false;
				document.getElementById('modalApprove1Disable').disabled = false;
				$('#myModalMerDisable').modal('hide');
				$('#myModalE').modal('show');
			}
		});
});
