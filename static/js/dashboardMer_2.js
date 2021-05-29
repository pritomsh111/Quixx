var dataP;
$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round';
var shouldGet = "", got = "", willGet = "";

var myModalLabelzz = document.getElementById("myModalLabelzz");

var one = (ax = null) => {
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/anyPaymen/available/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("merTaka").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data == true) {
					document.getElementById("merTaka").innerHTML = "Yes";
					$('#invoice').show();
					$('#confirm').show();
				}
				else {
					document.getElementById("merTaka").innerHTML = "No";
					$('#invoice').hide();
					$('#confirm').hide();
				}
				two(ax);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}

var two = (ax) => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/should/get/from/orgHead/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("mer1").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				dataP = data.data;
				shouldGet = data.data;
				if (data.data.total_product_cost > 0) {
					document.getElementById("mer1").innerHTML = data.data.total_product_cost + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("mer1").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				three(ax);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}

var three = (ax) => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/got/from/orgHead/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("mer2").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				got = data.data;
				if (data.data.total_product_cost > 0) {
					document.getElementById("mer2").innerHTML = data.data.total_product_cost + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("mer2").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				four(ax);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}
var four = (ax) => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/due/payment/from/orgHead/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("mer3").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				willGet = data.data;
				if (data.data.total_product_cost > 0) {
					document.getElementById("mer3").innerHTML = data.data.total_product_cost + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("mer3").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				!what ? five() : null;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}
var five = () => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/completed/delivery/count/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("complete").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("complete").innerHTML = data.data;
				}
				else {
					document.getElementById("complete").innerHTML = "0";
				}
				six();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

}
var six = () => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "delivery/total/incomplete/delivery/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("incomplete").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("incomplete").innerHTML = data.data;
				}
				else {
					document.getElementById("incomplete").innerHTML = "0";
				}
				seven();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

}
var seven = () => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/unassign/delivery/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("unassigned").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("unassigned").innerHTML = data.data;
				}
				else {
					document.getElementById("unassigned").innerHTML = "0";
				}
				eight();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

}
var eight = () => {
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "delivery/delivery/status/count/" + localStorage.getItem('userID') + "/RETURNED",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("totalReturnedDeliveries").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalReturnedDeliveries").innerHTML = data.data;
				}
				else {
					document.getElementById("totalReturnedDeliveries").innerHTML = "0";
				}
				nine();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}
var nine = () => {
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "delivery/delivery/status/count/" + localStorage.getItem('userID') + "/CANCELLED",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("totalCancelledDeliveries").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalCancelledDeliveries").innerHTML = data.data;
				}
				else {
					document.getElementById("totalCancelledDeliveries").innerHTML = "0";
				}
				ten();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

}
var ten = () => {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "delivery/delivery/status/count/" + localStorage.getItem('userID') + "/ON_HOLD",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("totalOnHoldDeliveries").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalOnHoldDeliveries").innerHTML = data.data;
				}
				else {
					document.getElementById("totalOnHoldDeliveries").innerHTML = "0";
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

}

function updateAfterSuccess() {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/should/get/from/orgHead/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("mer1").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				dataP = data.data;
				if (data.data.total_product_cost > 0) {
					document.getElementById("mer1").innerHTML = data.data.total_product_cost + '<span style="color:#0066b3;font-size:14px;">&#2547;</span>';
				}
				else {
					document.getElementById("mer1").innerHTML = "0" + '<span style="color:#0066b3;font-size:14px;">&#2547;</span>';
				}

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/got/from/orgHead/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("mer2").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data.total_product_cost > 0) {
					document.getElementById("mer2").innerHTML = data.data.total_product_cost + '<span style="color:#0066b3;font-size:14px;">&#2547;</span>';
				}
				else {
					document.getElementById("mer2").innerHTML = "0" + '<span style="color:#0066b3;font-size:14px;">&#2547;</span>';
				}

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}


function updateAfterSuccess2() {

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/anyPaymen/available/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("merTaka").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data == true) {
					document.getElementById("merTaka").innerHTML = "Yes";
					$('#invoice').show();
					$('#confirm').show();
				}
				else {
					document.getElementById("merTaka").innerHTML = "No";
					$('#invoice').hide();
					$('#confirm').hide();
				}
				updateAfterSuccess();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}

function updateTaka() {

	$('#tick22').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure22").html("Are you sure?");
	$("#myModalMer2").modal('show');
}

function confirmTaka() {

	$('#tick22').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure22").html("Are you sure?");
	$("#myModalMer2").modal('show');
}


$('.btn-ok').on("click", function () {

	$("#sure22").html("Please wait!");
	document.getElementById('modalCancel').disabled = true;
	document.getElementById('modalApprove').disabled = true;
	$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "merchant/updatePaymen/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				one(true);
				$("#sure22").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tick22').show();

					$("#sure22").html("Payment Confirmed!");
				}, 900);

				setTimeout(function () {
					$("#myModalMer2").modal('hide');

				}, 2000);
				document.getElementById('modalCancel').disabled = false;
				document.getElementById('modalApprove').disabled = false;
			},
			error: function (data) {

				document.getElementById('modalCancel').disabled = false;
				document.getElementById('modalApprove').disabled = false;
				$('#myModalMer2').modal('hide');
				var ob = Object.keys(data);
				if (ob[17] == "responseJSON") {
					$('#problem').html(data.responseJSON.errorMessage);
				}
				$('#myModalE2').modal('show');
			}
		});
});
var invoiceTaka = () => {
	window.open(urlForAll + "reports/paymentFormerchant/report/" + localStorage.getItem('userID'), "_blank");
};
one();

function showModal(type) {
	let dataForModal;

	if (type === 1) {
		dataForModal = shouldGet;
		myModalLabelzz.innerHTML = "Due From Completed Deliveries: " + dataForModal.total_product_cost + '<sup>&#2547;</sup>';
	}
	else if (type === 2) {
		dataForModal = got;
		myModalLabelzz.innerHTML = "Transaction Completed: " + dataForModal.total_product_cost + '<sup>&#2547;</sup>';
	}
	else {
		dataForModal = willGet;
		myModalLabelzz.innerHTML = "Due From Incomplete Deliveries: " + dataForModal.total_product_cost + '<sup>&#2547;</sup>';
	}
	table = $('#dtBasicExampled12').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<h4 style='color:#0066b3'>Loading...</h4>"
		},
		"oSearch": { "bSmart": false, "bRegex": true },
		"deferRender": true,
		"destroy": true
	});
	table.clear().draw();

	$.each(dataForModal.deliveries_ids, function (i, item) {
		var table_rows =
			'<tr><td>'
			+ dataForModal.deliveries_ids[i] + '</td><td>'
			+ dataForModal.product_costs[i] + '<sup>&#2547;</sup>' + '</td></tr>';

		table.rows.add($(table_rows)).draw();
	});

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$("#myModalz").modal('show');
}
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = dd + '/' + mm + '/' + yyyy;
// document.getElementById("date4").innerHTML = today;
// document.getElementById("date5").innerHTML = today;
// document.getElementById("date6").innerHTML = today;
// document.getElementById("date64").innerHTML = today;
// document.getElementById("date65").innerHTML = today;
// document.getElementById("date66").innerHTML = today;
// document.getElementById("date9").innerHTML = today;
// document.getElementById("date10").innerHTML = today;
// document.getElementById("date11").innerHTML = today;
// document.getElementById("date12").innerHTML = today;