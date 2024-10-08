var comp, incomp;
var myMap = [];
var myMap2 = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

$(function () {
	$('#settings').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	totalIncome();
	if (interVal) {
		setTimeout(() => {
			clearTimeout(interVal);
		}, 1000);
	}
	// today = dd + '/' + mm + '/' + yyyy;
	// document.getElementById("date1").innerHTML = today;
	// //document.getElementById("date2").innerHTML = today;
	// document.getElementById("date3").innerHTML = today;
	// document.getElementById("date4").innerHTML = today;
	// document.getElementById("date5").innerHTML = today;
	// document.getElementById("date6").innerHTML = today;
	// document.getElementById("date64").innerHTML = today;
	// document.getElementById("date65").innerHTML = today;
	// document.getElementById("date66").innerHTML = today;
	// document.getElementById("date67").innerHTML = today;
	// document.getElementById("date68").innerHTML = today;
	// document.getElementById("date69").innerHTML = today;
	// document.getElementById("date7").innerHTML = today;
	// document.getElementById("date7Package").innerHTML = today;
});

document.querySelector("#datewiseIncome").addEventListener("change", function () {
	dailyIncome(this.value);
});

document.querySelector("#monthwiseIncome").addEventListener("change", function () {
	monthlyIncome(this.value);
});

var beforeOne = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "package/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("packageName").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data) {
					document.getElementById("packageName").innerHTML = data.data;
				}
				else {
					document.getElementById("packageName").innerHTML = "None";
				}
				ten();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		})
}
var one = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/sms/count/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("messageCount").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("messageCount").innerHTML = data.data;
				}
				else {
					document.getElementById("messageCount").innerHTML = "0";
				}
				five();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}
var two = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "user/total/deliveryMan/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("totalDeliveryMan").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalDeliveryMan").innerHTML = data.data;
				}
				else {
					document.getElementById("totalDeliveryMan").innerHTML = "0";
				}
				three();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}

var totalIncome = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/total/income/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("deliveryTotalIncome").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data) {
					document.getElementById("deliveryTotalIncome").innerHTML = data.data + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("deliveryTotalIncome").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				document.querySelector("#datewiseIncome").value = yyyy + "-" + mm + "-" + dd;
				dailyIncome(yyyy + "-" + mm + "-" + dd);
				document.querySelector("#monthwiseIncome").value = yyyy + "-" + mm;
				monthlyIncome(yyyy + "-" + mm);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		})
}

var invoiceForTotalIncome = () => {
	window.open(urlForAll + "reports/org/income/" + localStorage.getItem('userID') + "/all/?typeValue=anyvalue", "_blank");
}

var invoiceForDailyIncome = () => {
	window.open(urlForAll + "reports/org/income/" + localStorage.getItem('userID') + "/daily/?typeValue=" + document.querySelector("#datewiseIncome").value, "_blank");
}

var invoiceForMonthlyIncome = () => {
	window.open(urlForAll + "reports/org/income/" + localStorage.getItem('userID') + "/monthly/?typeValue=" + document.querySelector("#monthwiseIncome").value, "_blank");
}

var dailyIncome = (date) => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/total/income/daily/" + localStorage.getItem('userID') + "?" + "date=" + date,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("perDayIncome").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data) {
					document.getElementById("perDayIncome").innerHTML = data.data + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("perDayIncome").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				// one();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		})
}

var monthlyIncome = (date) => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/total/income/monthly/" + localStorage.getItem('userID') + "?" + "year_month=" + date,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function (xhr) {
				document.getElementById("perMonthIncome").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data) {
					document.getElementById("perMonthIncome").innerHTML = data.data + '<sup>&#2547;</sup>';
				}
				else {
					document.getElementById("perMonthIncome").innerHTML = "0" + '<sup>&#2547;</sup>';
				}
				one();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		})

}

var three = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/merchant/count/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("approvedMer").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				bool = false;
				if (data.data > 0) {
					document.getElementById("approvedMer").innerHTML = data.data;
				}
				else {
					document.getElementById("approvedMer").innerHTML = "0";
				}
				four();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

			}
		});
}
var four = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/merchant/unapprove/count/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("unApprovedMer").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("unApprovedMer").innerHTML = data.data;
				}
				else {
					document.getElementById("unApprovedMer").innerHTML = "0";
				}
				beforeOne();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

			}
		});
}
var five = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "orgHead/total/complete/delivery/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("totalCompletedDeliveries").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalCompletedDeliveries").innerHTML = data.data;
				}
				else {
					document.getElementById("totalCompletedDeliveries").innerHTML = "0";
				}
				six();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

			}
		});
}

var six = () => {
	$.ajax
		({

			type: "GET",
			url: urlForAll + "delivery/total/incomplete/delivery/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("totalIncompleteDeliveries").innerHTML = "<div class=loader5></div>";
			},
			success: function (data) {
				if (data.data > 0) {
					document.getElementById("totalIncompleteDeliveries").innerHTML = data.data;
				}
				else {
					document.getElementById("totalIncompleteDeliveries").innerHTML = "0";
				}
				seven();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

			}
		});

}

var seven = () => {
	$.ajax
		({

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
				two();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				//alert("Please wait, we are working!");
			}
		});
}
var ten = () => {
	var table = $('#dtBasicExample').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"deferRender": true,
		"paging": true,
		"destroy": true,
		"ajax":
		{
			"url": urlForAll + "orgHead/haveTo/pay/merchant/" + localStorage.getItem('userID'),
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data",

		},
		"columns": [
			{ "targets": 0, "data": "merchant_name" },
			{ "targets": 1, "data": "total_product_cost", render: $.fn.dataTable.render.number(',', '.', 0, '<sup>&#2547;</sup>') },
			{
				"orderable": false, "targets": 2, "data": "null", render: function (data, type, row) {
					myMap[row.merchant_id] = row;
					return '<button id="' + row.merchant_id + '" class="btn-round btn-outline btn" onclick="show(this)">Details</button>'
				}
			},
		]
	});
	table.clear().draw();
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search').
		css({ 'width': '200px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '200px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });

	eleven();
}

var eleven = () => {
	var table2 = $('#dtBasicExample2').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"deferRender": true,
		"paging": true,
		"destroy": true,
		"ajax":
		{
			"url": urlForAll + "orgHead/due/payment/" + localStorage.getItem('userID'),
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
			{ "targets": 0, "data": "merchant_name" },
			{ "targets": 1, "data": "total_product_cost", render: $.fn.dataTable.render.number(',', '.', 0, '<sup>&#2547;</sup>') },
			{
				"orderable": false, "targets": 2, "data": "null", render: function (data, type, row) {
					myMap2[row.merchant_id] = row;
					return '<button id="' + row.merchant_id + '" class="btn-round btn-outline btn" onclick="show2(this)">Details</button>'
				}
			},
		]
	});
	table2.clear().draw();

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search').
		css({ 'width': '200px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '200px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });
}

var show = (id) => {
	var index = id.id;

	document.getElementById("myModalLabelz").innerHTML = "Total Payable [Completed Deliveries]";
	document.getElementById("myModalLabelz").style.color = "#0066b3";
	document.getElementById("myModalLabelzz").innerHTML = "CASH ON DELIVERY";
	var table = $('#dtBasicExampled12').DataTable({
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

	var trHTML = '';

	var trHTML = '';

	$.each(myMap[index].deliveries_ids, function (i, item) {
		var table_rows =
			'<tr><td>'
			+ myMap[index].deliveries_ids[i] + '</td><td>'
			+ myMap[index].product_costs[i] + '<sup>&#2547;</sup>' + '</td><td>'
			+ myMap[index].cod_charges[i] + '<sup>&#2547;</sup>' + '</td></tr>';
		//+data.data[i].track_id+'</td><td>'

		table.rows.add($(table_rows)).draw();
	});

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });

	$("#myModalz").modal('show');
}
var show2 = (id) => {
	var index = id.id;
	document.getElementById("myModalLabelz").innerHTML = "Total Payable [Ongoing Deliveries]";
	document.getElementById("myModalLabelz").style.color = "#BF033B";
	document.getElementById("myModalLabelzz").innerHTML = "CASH ON DELIVERY";
	var table = $('#dtBasicExampled12').DataTable({
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


	var trHTML = '';

	$.each(myMap2[index].deliveries_ids, function (i, item) {
		var table_rows =
			'<tr><td>'
			+ myMap2[index].deliveries_ids[i] + '</td><td>'
			+ myMap2[index].product_costs[i] + '<sup>&#2547;</sup>' + '</td><td>'
			+ myMap2[index].cod_charges[i] + '<sup>&#2547;</sup>' + '</td></tr>';

		table.rows.add($(table_rows)).draw();
	});

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });

	$("#myModalz").modal('show');
}