var org_ID = localStorage.getItem('userID');
$(function () {
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	var value;
	$("#ccDate").hide();
	$(".aaa").hide();
	$("#settings").hide();
	$("#ar").hide();
	$("#deliveryManList").hide();
	$("#deliveryStatus").hide();
	$("#paymentMethod").hide();
	$("#deliveryDistrict").hide();
	$("#deliveryArea").hide();
	$("#settingsMer").hide();
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
					if (data.data[i].includes("Date")) {
						continue;
					}
					if (data.data[i].includes("District")) {
						data.data[i] = data.data[i].replace("District", "Receiver City");
					}
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
					.append('<option selected="selected" value="">Select Delivery Status</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i] === "ASSIGN") {
						continue;
					}
					if (data.data[i] === "JUST_CREATED") {
						data.data[i] = "ASSIGNED";
					}
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#deliveryStatus").append(option);
				}
			}
		});
	$.ajax
		({
			url: urlForAll + "approved/delivery/district",
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#deliveryDistrict')
					.empty()
					.append('<option selected="selected" value="">Select Receiver City</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#deliveryDistrict").append(option);
				}
			}
		});
	changedArea("None");
	function changedArea(where) {

		$('#managers_2')
			.empty();
		url = urlForAll + "approved/delivery/upazila/" + where;
		if (where === "Dhaka") {
			url = urlForAll + "approved/delivery/thana/Dhaka";
		}
		if (where === "Cox's Bazar") {
			url = urlForAll + "approved/delivery/upazila/Cox'sBazar";
		}
		if (where === "None") {
			$('#deliveryArea')
				.empty()
				.append('<option selected="selected" value="">No City Selected</option>')
				;
			return;
		}
		$.ajax
			({
				url: url,
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
						.append('<option selected="selected" value="">Select Area</option>')
						;
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i]) {
							var option = new Option(data.data[i], data.data[i]);
							$(option).html(data.data[i]);
							$("#deliveryArea").append(option);
						}
					}
				}
			});
	}
	document.querySelector("#deliveryDistrict").addEventListener("change", function () {
		var vari = this.value == "Dhaka" ? "Dhaka" : this.value;
		changedArea(vari);
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
					.append('<option selected="selected" value="">Select Payment Method</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#paymentMethod").append(option);
				}
			}
		});
});


function clearAll() {
	$("#ccString").hide();
	$("#ccDate").hide();
	$("#deliveryManList").hide();
	$("#deliveryStatus").hide();
	$("#paymentMethod").hide();
	$("#deliveryArea").hide();
	$("#deliveryDistrict").hide();
	$("#ar").hide();
	$(".aaa").hide();
}
$("#criterion").on("change", function () {
	$(".aaa").hide();
	value = $(this).val();
	if (value == "Delivery Status") {
		clearAll();
		document.querySelector("#deliveryStatus").selectedIndex = 0;
		document.querySelector("#deliveryStatus option:nth-child(2)").innerHTML = "ASSIGNED";
		$("#deliveryStatus").show();
	}
	else if (value == "Payment Method") {
		clearAll();
		$("#paymentMethod").show();
	}
	else if (value == "Receiver City") {
		clearAll();
		$("#deliveryDistrict").show();
		$("#ar").show();
		$("#deliveryArea").show();
	}
	else {
		clearAll();
		$("#ccString").show();
	}
});

$('#criterionSubmit').on('click', function (eventx) {
	eventx.preventDefault();
	$(".aaa").hide();
	var cri = document.getElementById("criterion").value;
	if (cri == "Assign Date" || cri == "Delivery Created Date" || cri == "Delivery Complete Date") {
		var valx = document.getElementById("ccDate").value;
		//console.log(valx);
	}
	else if (cri == "Delivery Status") {
		var valx = document.getElementById("deliveryStatus").value;
		valx = valx === "ASSIGNED" ? "JUST_CREATED" : valx;
	}
	else if (cri == "Receiver City") {
		cri = "District";
		valx = document.getElementById("deliveryDistrict").value;
		if (document.getElementById("deliveryArea").value) {
			disch = 1;
			valx += "__" + document.getElementById("deliveryArea").value;
		}
		else {
			disch = 0;
		}
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
		else if (/\D/.test(valx) == true) {
			document.getElementById('wrongThisMerSetE').innerHTML = "Receiver's Phone Number must be of 11 digits!";
			$('#myModalWrongMerSetE').modal('show');
			$(".aaa").hide();
			return 0;
		}
		else if (!/\D/.test(valx) == true) {
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
			responsive: {
				details: {
					renderer: function (api, rowIdx, columns) {
						var data = $.map(columns, function (col, i) {
							return col.hidden ?
								'<tr style="text-align:left" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
								'<td><strong>' + col.title + ':' + '</strong></td> ' +
								'<td>' + col.data + '</td>' +
								'</tr>' :
								'';
						}).join('');

						return data ?
							$('<table/>').append(data) :
							false;
					}
				}
			},
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
					//console.log(data);
					$(".aaa").hide();
					document.getElementById('wrongThisMerSetE').innerHTML = data.responseJSON.errorMessage;
					$('#myModalWrongMerSetE').modal('show');
				}
			},
			"columns": [
				{ "targets": 100, "data": null, "defaultContent": "" },
				{ "targets": 0, "data": "delivery_Id" },
				{ "targets": 2, "data": "delivery_status" },
				{ "targets": 10, "data": "receiver_name" },
				{ "targets": 11, "data": "receiver_phone_number" },
				{
					"targets": 24, "data": null, render: function (data, type, row) {
						let a = row.delivery_city;
						return a ? row.delivery_city : "";
					}
				},
				{ "targets": 123, "data": "delivery_area" },
				{ "targets": 13, "data": "receiver_address" },
				{
					"targets": 5, "data": null, render: function (data, type, row) {

						return row.assign_delivery_man_name + ", " + row.assign_delivery_man_phone;
					}
				},
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
				{ "targets": 15, "data": "product_name" },
				{ "targets": 16, "data": "product_qty" },
				{ "targets": 17, "data": "product_cost" },
				{ "targets": 18, "data": "delivery_charge" },
				{ "targets": 19, "data": "payment_method" },
				{ "targets": 1, "data": "delivery_created_date" },
				{ "targets": 19, "data": "delivery_complete_date" },
				{
					"targets": 25, "data": null, render: function (data, type, row) {
						let a = row.delivery_product_type;
						if (a) {
							a = a?.includes("delivery_product_type_na") ? "NOT_SELECTED" : a;
							return a;
						}
						return "---";
					}
				},
				{
					"targets": 27, "data": null, render: function (data, type, row) {
						let a = row.delivery_weight;
						if (a) {
							a = a?.includes("delivery_weight_na") ? "NOT_SELECTED" : a + "KG";
							return a;
						}
						return "---";
					}
				},
				{
					"targets": 26, "data": null, render: function (data, type, row) {
						let a = row.delivery_day_type;
						if (a) {
							a = a?.includes("delivery_day_type_na") ? "NOT_SELECTED" : a;
							return a;
						}
						return "---";
					}
				},
				{
					"targets": 28, "data": null, render: function (data, type, row) {
						let a = row.delivery_distance;
						if (a) {
							a = a?.includes("delivery_distance_na") ? "NOT_SELECTED" : a + "KM";
							return a;
						}
						return "---";
					}
				},
				{
					"targets": 29, "data": null, render: function (data, type, row) {
						let a = row.delivery_city_criteria;
						if (a) {
							a = a?.includes("delivery_city_criteria_na") ? "NOT_SELECTED" : a;
							return a;
						}
						return "---";
					}
				},
				{ "targets": 14, "data": "delivery_type" },
				{ "targets": 5, "data": "pickup_time" },
				{ "targets": 20, "data": "delivery_note" },
				{ "targets": 7, "data": "sender_name" },
				{ "targets": 8, "data": "sender_phone_number" },
				{ "targets": 9, "data": "sender_address" },
			]
		});
		tableX.clear().draw();
		tableX.on('xhr', function () {
			var json = tableX.ajax.json();
			if (json == undefined) {
				return;
			}
			$(".aaa").show();
			if (cri == "District") {
				if (disch) {
					let vv = valx.split("__");
					$("#valOfTable").html(`Receiver City: <strong>${vv[0]}</strong>, Area: <strong>${vv[1]}</strong> [Total Data: <strong>${json.recordsTotal}</strong>]`);
				}
				else {
					$("#valOfTable").html(`Receiver City: <strong>${valx}</strong> [Total Data: <strong>${json.recordsTotal}</strong>]`);
				}
				return;
			}
			if (cri == "Delivery Status") {
				valx = valx === "JUST_CREATED" ? "ASSIGNED" : valx;
			}
			$("#valOfTable").html(`${cri}: <strong>${valx}</strong> [Total Data: <strong>${json.recordsTotal}</strong>]`);
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
	}
	else {
		$("#myModalCreateDD22").modal('show');
	}
});

