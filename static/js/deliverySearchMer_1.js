var org_ID = localStorage.getItem('userID');
$(document).ready(function () {
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	var value;
	$("#ccDate").hide();
	$(".aaa").hide();
	$("#settingsMer").hide();
	$("#deliveryStatus").hide();
	$("#paymentMethod").hide();
	$("#deliveryArea").hide();
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
	$.ajax
		({
			url: urlForAll + "search/delivery/search/criteria/merchant",
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#criterion')
					.empty()
					.append('<option selected="selected" value="">Select One</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#criterion").append(option);
				}
			}
		});
	$.ajax
		({
			url: urlForAll + "search/delivery/search/status",
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#deliveryStatus')
					.empty()
					.append('<option selected="selected" value="">Select One</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#deliveryStatus").append(option);
				}
			}
		});
	$.ajax
		({
			url: urlForAll + "approved/delivery/area",
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#deliveryArea')
					.empty()
					.append('<option selected="selected" value="">Select One</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#deliveryArea").append(option);
				}
			}
		});
	$.ajax
		({
			url: urlForAll + "delivery/payment/method/" + localStorage.getItem('token'),
			type: "GET",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$('#paymentMethod')
					.empty()
					.append('<option selected="selected" value="">Select One</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#paymentMethod").append(option);
				}
			}
		});
});

$("#criterion").change(function () {
	$(".aaa").hide();
	value = $(this).val();
	if (value == "Assign Date" || value == "Delivery Created Date" || value == "Delivery Complete Date") {
		$("#ccDate").show();
		$("#ccString").hide();
		$("#deliveryManList").hide();
		$("#deliveryStatus").hide();
		$("#paymentMethod").hide();
		$("#deliveryArea").hide();
	}
	else if (value == "Delivery Status") {
		$("#deliveryStatus").show();
		$("#deliveryManList").hide();
		$("#ccDate").hide();
		$("#ccString").hide();
		$("#paymentMethod").hide();
		$("#deliveryArea").hide();
	}
	else if (value == "Payment Method") {
		$("#paymentMethod").show();
		$("#deliveryStatus").hide();
		$("#deliveryManList").hide();
		$("#ccDate").hide();
		$("#ccString").hide();
		$("#deliveryArea").hide();
	}
	else if (value == "Receiver Area") {
		$("#deliveryStatus").hide();
		$("#deliveryManList").hide();
		$("#ccDate").hide();
		$("#ccString").hide();
		$("#paymentMethod").hide();
		$("#deliveryArea").show();
	}
	else {
		$("#ccString").show();
		$("#deliveryManList").hide();
		$("#deliveryStatus").hide();
		$("#ccDate").hide();
		$("#paymentMethod").hide();
		$("#deliveryArea").hide();
	}
});


$('#criterionSubmit').on('click', function (eventx) {
	eventx.preventDefault();
	$(".aaa").hide();
	var cri = document.getElementById("criterion").value;
	if (cri == "Assign Date" || cri == "Delivery Created Date" || cri == "Delivery Complete Date") {
		var valx = document.getElementById("ccDate").value;
		console.log(valx);
	}
	else if (cri == "Delivery Status") {
		var valx = document.getElementById("deliveryStatus").value;
	}
	else if (cri == "Receiver Area") {
		var valx = document.getElementById("deliveryArea").value;
	}
	else if (cri == "Payment Method") {
		var valx = document.getElementById("paymentMethod").value;
	}
	else if (cri == "Delivery ID") {
		var valx = document.getElementById("ccString").value;
		if (parseInt(valx) <= 0 || valx.charAt(0) == 0) {
			document.getElementById('wrongThisMerSetE').innerHTML = `Deliver ID must be greater than 0!`;
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
		else if (isNaN(valx) == true || valx == "" || !/\D/.test(valx) == false) {
			document.getElementById('wrongThisMerSetE').innerHTML = `Deliver ID must be a number!`;
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
		else if (!/\D/.test(valx) == true) {
		}
	}
	else if (cri == "Receiver Phone Number") {
		var valx = document.getElementById("ccString").value;
		if (valx == "" || valx == null) {
			document.getElementById('wrongThisMerSetE').innerHTML = "Receiver's Phone Number cannot be empty!";
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
		else if ((valx.length < 11 || valx.length > 11) && !/\D/.test(valx) == true) {
			document.getElementById('wrongThisMerSetE').innerHTML = "Receiver's Phone Number must be of 11 digits!";
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
		else if (valx.match(/\d/g).length === 11 && !/\D/.test(valx) == true) {
		}
		else {
			document.getElementById('wrongThisMerSetE').innerHTML = "Receiver's Phone Number not valid!";
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
	}
	else {
		var valx = document.getElementById("ccString").value;
	}
	if (cri != "") {
		var tableX = $('#dtBasicExampledC').DataTable({
			"processing": true,
			'language': {
				'loadingRecords': '&nbsp;',
				'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
			},
			"paging": true,
			"pageLength": 100,
			"searching": false,
			"ordering": false,
			"deferRender": true,
			"pagingType": "full_numbers",
			"lengthMenu": [[100, 200, 300, 400], [100, 200, 300, 400]],
			"serverSide": true,
			"destroy": true,
			"ajax":
			{
				"url": urlForAll + "search/delivery/" + org_ID + "?criteria=" + cri + "&value=" + valx,
				"type": "GET",
				"headers":
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				"dataSrc": "data",
				"error": function (data) {
					console.log(data);
					$(".aaa").hide();
					document.getElementById('wrongThisMerSetE').innerHTML = data.responseJSON.errorMessage;
					$('#myModalWrongMerSetE').modal('show');
				}
			},
			"columns": [
				{ "targets": 1, "data": "delivery_Id" },
				{ "targets": 1, "data": "delivery_created_date" },
				{ "targets": 3, "data": "delivery_created_by_name" },
				{ "targets": 4, "data": "delivery_created_by_role" },
				{ "targets": 2, "data": "pickup_time" },
				{ "targets": 7, "data": "sender_name" },
				{ "targets": 8, "data": "sender_phone_number" },
				{ "targets": 9, "data": "sender_address" },
				{ "targets": 10, "data": "receiver_name" },
				{ "targets": 11, "data": "receiver_phone_number" },
				{ "targets": 12, "data": "delivery_area" },
				{ "targets": 13, "data": "receiver_address" },
				{ "targets": 14, "data": "delivery_type" },
				{ "targets": 15, "data": "product_name" },
				{ "targets": 16, "data": "product_qty" },
				{ "targets": 17, "data": "product_cost" },
				{ "targets": 18, "data": "delivery_charge" },
				{ "targets": 19, "data": "payment_method" },
				{ "targets": 19, "data": "assign_delivery_man_id" },
				{ "targets": 19, "data": "assign_delivery_man_name" },
				{ "targets": 19, "data": "assign_delivery_man_phone" },
				{ "targets": 19, "data": "delivery_complete_date" },
				{
					"targets": 19, "data": "transaction_complete", render: function (data, type, row) {
						if (row.transaction_complete == false) {
							return "No";
						}
						else if (row.transaction_complete == true) {
							return "Yes";
						}
						else if (row.transaction_complete == '') {
							return "";
						}
					}
				},
				{ "targets": 19, "data": "transaction_complete_date" },
				{ "targets": 23, "data": "delivery_note" }
			]
		});
		tableX.clear().draw();
		tableX.on('xhr', function () {
			var json = tableX.ajax.json();
			if (json == undefined) {
				return;
			}
			$(".aaa").show();
			$("#valOfTable").html(`${cri}: ${valx} [Total Data: ${json.recordsTotal}]`);
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
	}
	else {
		$("#myModalCreateDD22").modal('show');
	}
});

