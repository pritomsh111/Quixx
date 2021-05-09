var merchant_ID = localStorage.getItem('userID');
var dataIncom, dataCom;

$.ajax
	({
		type: "GET",
		url: urlForAll + "merchant/cod/charge/" + merchant_ID,
		headers:
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function (data) {
			percentage = data.data;
		}
	})
var incompleteDeliveries = () => {
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('onea').disabled = true;
	document.getElementById('twoa').disabled = false;
	document.getElementById('onea').style.fontSize = '14.5px';
	document.getElementById('twoa').style.fontSize = '13px';
	document.getElementById('twoa').innerHTML = 'Due From Completed Deliveries';
	$('#dtBasicExample').hide();
	//$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	//$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();


	var table = $('#dtBasicExampled').DataTable({
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
			'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "merchant/deliveryData/basedOnDate/incomplete/" + merchant_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExampled_processing").style.display = "block";
			},
			success: function (data) {
				dataIncom = data.data;
				document.getElementById('onea').innerHTML = 'Due From Incomplete Deliveries: ' + data.data.length;

				var trHTML = '';
				$.each(data.data, function (i, item) {
					var keys = Object.keys(item);

					//console.log(keys[0]);
					//console.log(item[keys[0]][i]);
					//console.log(data.data[i][keys[0]]);
					var sum = 0, sum2 = 0, sum3 = 0;

					for (var j = 0; j < data.data[i][keys[0]].length; j++) {
						if (data.data[i][keys[0]][j].payment_method == "Cash on Delivery") {
							var b = parseInt(data.data[i][keys[0]][j].delivery_charge);
							var g = (parseInt(data.data[i][keys[0]][j].product_cost) * parseInt(data.data[i][keys[0]][j].product_qty));
							sum += g - ((g * percentage) / 100);;
							sum2 += g;
							sum3 += ((g * percentage) / 100);
						}
					}
					var table_rows =
						'<tr><td>' + keys[0] + '</td><td>'
						//+data.data[i].assigned_delivery_man_name+'</td><td>'
						+ data.data[i][keys[0]].length + '</td><td>'
						+ sum2 + '</td><td>'
						+ `${percentage}%` + '</td><td>'
						+ sum3 + '</td><td>'
						+ sum + '</td><td>'
						+ '<button id="' + keys[0] + '" name="' + i + '" class="btn-round btn-outline btn" onclick="show(this)">Details</button>'
						+ '</td></tr>';

					table.rows.add($(table_rows)).draw();
				});
			},
			complete: function (data) {
				document.getElementById('body').style.pointerEvents = "auto";
				document.getElementById("dtBasicExampled_processing").style.display = "none";
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
	$('.d').show();
	$('#dtBasicExampled').show();
}
//New
var completeDeliveries = () => {
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('twoa').disabled = true;
	document.getElementById('onea').disabled = false;
	document.getElementById('twoa').style.fontSize = '14.5px';
	document.getElementById('onea').style.fontSize = '13px';
	document.getElementById('onea').innerHTML = 'Due From Incomplete Deliveries';

	$('#dtBasicExample').hide();
	//$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	//$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();

	var table = $('#dtBasicExampleNew').DataTable({
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
			'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "merchant/deliveryData/basedOnDate/complete/" + merchant_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function () {
				document.getElementById("dtBasicExampleNew_processing").style.display = "block";
			},
			success: function (data) {
				dataCom = data.data;
				document.getElementById('twoa').innerHTML = 'Due From Completed Deliveries: ' + data.data.length;
				var trHTML = '';
				$.each(data.data, function (i, item) {
					var keys = Object.keys(item);
					//console.log(data.data[i][keys[0]][4].hasOwnProperty("transaction_complete"));
					//console.log(keys[0]);
					//console.log(item[keys[0]][i]);
					//console.log(data.data[i][keys[0]]);
					var sum = 0, sum2 = 0, sum3 = 0, deliveryIDz = "", comma = 0;
					for (var j = 0; j < data.data[i][keys[0]].length; j++) {
						if (data.data[i][keys[0]][j].payment_method == "Cash on Delivery" && data.data[i][keys[0]][j].hasOwnProperty("transaction_complete") == true) {
							if (data.data[i][keys[0]][j].transaction_complete == false) {
								if (comma > 0) {
									deliveryIDz += ", ";
								}
								deliveryIDz += `${data.data[i][keys[0]][j].delivery_Id}`
								var b = parseInt(data.data[i][keys[0]][j].delivery_charge);
								var g = (parseInt(data.data[i][keys[0]][j].product_cost) * parseInt(data.data[i][keys[0]][j].product_qty));
								sum += g - ((g * percentage) / 100);;
								sum2 += g;
								sum3 += ((g * percentage) / 100);
								comma += 1;
							}
						}
					}
					var table_rows =
						'<tr><td>' + keys[0] + '</td><td>'
						//+data.data[i].assigned_delivery_man_name+'</td><td>'
						+ data.data[i][keys[0]].length + '</td><td>'
						+ sum2 + '</td><td>'
						+ `${percentage}%` + '</td><td>'
						+ sum3 + '</td><td>'
						+ sum + '</td><td>'
						+ deliveryIDz + '</td><td>'
						+ '<button id="' + keys[0] + '" name="' + i + '" class="btn-round btn-outline btn" onclick="show2(this)">Details</button>'
						+ '</td></tr>';

					table.rows.add($(table_rows)).draw();
				});

				//document.getElementById("modifyButton").disabled = document.getElementById("modifyButton").value;
			},
			complete: function (data) {
				document.getElementById('body').style.pointerEvents = "auto";
				document.getElementById("dtBasicExampleNew_processing").style.display = "none";
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

	$('#dtBasicExampleNew').show();
	$('.e').show();
}
var save = (id) => {
	localStorage.setItem("'Accept': 'application/json'", id.id);
	localStorage.setItem("'Accept': 'application/jsonN'", id.name);
	window.open('addDeliverToDeliveryMan.html', '_blank');
};
var show = (id) => {
	var date = id.id;
	var index = id.name;
	var table = $('#dtBasicExampled12').DataTable({
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
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();

	var trHTML = '';
	//console.log(dataIncom[index][date]);
	var trHTML = '';
	function checkCriteria(val, msg, ex = "") {
		let a = val;
		if (a) {
			a = a?.includes(`${msg}`) ? "NOT_SELECTED" : a + ex;
			return a;
		}
		return "---";
	}
	$.each(dataIncom[index][date], function (i, item) {

		let delivery_product_type = checkCriteria(dataIncom[index][date][i].delivery_product_type, "delivery_product_type_na");
		let delivery_weight = checkCriteria(dataIncom[index][date][i].delivery_weight, "delivery_weight_na", " KG");
		let delivery_day_type = checkCriteria(dataIncom[index][date][i].delivery_day_type, "delivery_day_type_na");
		let delivery_distance = checkCriteria(dataIncom[index][date][i].delivery_distance, "delivery_distance_na", " KM");
		let delivery_city_criteria = checkCriteria(dataIncom[index][date][i].delivery_city_criteria, "delivery_city_criteria_na");
		let delivery_city = dataIncom[index][date][i].delivery_city || "";
		var table_rows =
			'<tr><td>' + dataIncom[index][date][i].delivery_Id + '</td><td>'
			+ dataIncom[index][date][i].delivery_status + '</td><td>'
			+ dataIncom[index][date][i].product_name + '</td><td>'
			+ dataIncom[index][date][i].product_qty + '</td><td>'
			+ dataIncom[index][date][i].product_cost + '</td><td>'
			+ dataIncom[index][date][i].delivery_charge + '</td><td>'
			+ dataIncom[index][date][i].payment_method + '</td><td>'
			+ dataIncom[index][date][i].receiver_name + '</td><td>'
			+ dataIncom[index][date][i].receiver_phone_number + '</td><td>'
			+ delivery_city + '</td><td>'
			+ dataIncom[index][date][i].delivery_area + '</td><td>'
			+ dataIncom[index][date][i].receiver_address + '</td><td>'
			+ delivery_product_type + '</td><td>'
			+ delivery_weight + '</td><td>'
			+ delivery_day_type + '</td><td>'
			+ delivery_distance + '</td><td>'
			+ delivery_city_criteria + '</td><td>'
			+ dataIncom[index][date][i].delivery_type + '</td><td>'
			+ dataIncom[index][date][i].delivery_note + '</td><td>'
			+ dataIncom[index][date][i].sender_name + '</td><td>'
			+ dataIncom[index][date][i].sender_phone_number + '</td><td>'
			+ dataIncom[index][date][i].sender_address + '</td></tr>';
		//+data.data[i].track_id+'</td><td>'
		table.rows.add($(table_rows)).draw();
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

	$("#myModal").modal('show');
}
var show2 = (id) => {
	var date = id.id;
	var index = id.name;
	var table = $('#dtBasicExampled123').DataTable({
		"processing": true,
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true }
	});
	table.clear().draw();

	var trHTML = '';
	//console.log(dataCom[index][date]);

	var trHTML = '';

	$.each(dataCom[index][date], function (i, item) {
		var table_rows =
			'<tr><td>' + dataCom[index][date][i].delivery_Id + '</td><td>'
			+ dataCom[index][date][i].delivery_created_date + '</td><td>'
			+ dataCom[index][date][i].delivery_status + '</td><td>'
			//+data.data[i].assigned_delivery_man_name+'</td><td>'
			+ dataCom[index][date][i].delivery_complete_date + '</td><td>'
			+ dataCom[index][date][i].sender_name + '</td><td>'
			+ dataCom[index][date][i].sender_phone_number + '</td><td>'
			+ dataCom[index][date][i].sender_address + '</td><td>'
			+ dataCom[index][date][i].receiver_name + '</td><td>'
			+ dataCom[index][date][i].receiver_phone_number + '</td><td>'
			+ dataCom[index][date][i].receiver_address + '</td><td>'
			+ dataCom[index][date][i].product_name + '</td><td>'
			+ dataCom[index][date][i].product_qty + '</td><td>'
			+ dataCom[index][date][i].product_cost + '</td><td>'
			+ dataCom[index][date][i].delivery_charge + '</td><td>'
			+ dataCom[index][date][i].payment_method + '</td><td>'
			+ dataCom[index][date][i].delivery_type + '</td><td>'
			+ dataCom[index][date][i].delivery_note + '</td></tr>';

		table.rows.add($(table_rows)).draw();
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

	$("#myModal12").modal('show');
}