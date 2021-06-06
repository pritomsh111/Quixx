var org_ID = localStorage.getItem('userID');
var dataInfo, excelData, flag = false;
var this_select_content = "";
var criteriaEnabledDelivery = false;
var mapMerchant = new Map();

var createBulkDelivery = () => {
	buttonActive();
	document.getElementById('bulkX').disabled = true;
	document.getElementById('bulkX').style.fontSize = '13px';
	if (mapMerchant.size) {
		mapMerchant.clear();
	}
	var table = $('#dtBasicExampleMerchant').DataTable({
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
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "orgHead/get/merchants/info/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data.merchants_info"
		},
		"columns": [
			{
				"orderable": true, "targets": 201, "data": null, render: function (data, type, row) {
					mapMerchant.set(row.profileDto.user_id, { ...row.profileDto });
					return row.profileDto.user_id;
				}
			},
			{ "targets": 0, "data": "merchantName" },
			{
				"targets": 202, "data": null, render: function (data, type, row) {
					return row.profileDto.per_delivery_cost;
				}
			},
			{
				"targets": 203, "data": null, render: function (data, type, row) {
					return row.profileDto.sender_phone_number;
				}
			}
		]
	});
	table.on('xhr', function () {
		// var json = table.ajax.json();
		// document.getElementById('oneb').innerHTML = 'Unassigned Deliveries: ' + json.recordsTotal;
		// document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	dataTableStyle();
	$("#bulkD").show();
}
var createDelivery = () => {
	buttonActive();
	document.getElementById('threeb').disabled = true;
	document.getElementById('threeb').style.fontSize = '13px';
	$('.c').show();
	$("#deliveryCreate").show();
}
var createDeliveryQ = () => {
	buttonActive();
	document.getElementById('quiccD').disabled = true;
	document.getElementById('quiccD').style.fontSize = '13px';
	$("#deliveryCreateQ").show();
}

function buttonActive() {
	document.getElementById('oneb').disabled = false;
	document.getElementById('oneb').innerHTML = 'Unassigned Deliveries';
	document.getElementById('oneb').style.fontSize = '13px';
	document.getElementById('twob').disabled = false;
	document.getElementById('twob').innerHTML = 'Assigned Deliveries';
	document.getElementById('twob').style.fontSize = '13px';
	document.getElementById('threeb').disabled = false;
	document.getElementById('threeb').style.fontSize = '13px';

	document.getElementById('quiccD').disabled = false;
	document.getElementById('quiccD').style.fontSize = '13px';
	document.getElementById('bulkX').disabled = false;
	document.getElementById('bulkX').style.fontSize = '13px';
	document.getElementById('sixb').disabled = false;
	document.getElementById('sixb').innerHTML = 'On Hold Deliveries';
	document.getElementById('sixb').style.fontSize = '13px';
	document.getElementById('sevenb').disabled = false;
	document.getElementById('sevenb').innerHTML = 'Ongoing Deliveries';
	document.getElementById('sevenb').style.fontSize = '13px';
	document.getElementById('eightb').disabled = false;
	document.getElementById('eightb').style.fontSize = '13px';
	document.getElementById('eightb').innerHTML = 'Completed Deliveries';

	document.getElementById('nineb').disabled = false;
	document.getElementById('nineb').style.fontSize = '13px';
	document.getElementById('nineb').innerHTML = 'Canceled Deliveries';

	document.getElementById('tenb').disabled = false;
	document.getElementById('tenb').style.fontSize = '13px';
	document.getElementById('tenb').innerHTML = 'Returned Deliveries';
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();

	$('#dtBasicExampleNewf').hide();
	$('#dtBasicExampleNewg').hide();
	$('#dtBasicExampleNewh').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$("#bulkD").hide();
	$('#dtBasicExampleNewi').hide();
	$('.i').hide();
	$('#dtBasicExampleNewj').hide();
	$('.j').hide();
	$("#deliveryCreate").hide();
	$("#deliveryCreateQ").hide();
}

var goToDelivery = () => {
	window.open('addDeliverToDeliveryMan.html', '_blank');
}
var ExcelToJSON = function () {
	this.parseExcel = function (file) {
		var reader = new FileReader();

		reader.onload = function (e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {
				type: 'binary'
			});
			workbook.SheetNames.forEach(function (sheetName) {
				// Here is your object
				var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				var json_object = JSON.stringify(XL_row_object);
				var excelAsJson = JSON.parse(json_object);
				flag = true;
				excelData = excelAsJson;
				////console.log(excelAsJson[0].Sender_Name);
				//jQuery( '#xlx_json' ).val( json_object );
			})
		};

		reader.onerror = function (ex) {
			////console.log(ex);
		};

		reader.readAsBinaryString(file);
	};
};

function handleFileSelect(evt) {
	evt.preventDefault();
	if (evt.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		document.getElementById("fileName").innerHTML = evt.target.files[0].name;
		var files = evt.target.files; // FileList object
		var xl2json = new ExcelToJSON();
		xl2json.parseExcel(files[0]);
	}
	else {
		document.getElementById('wrongThisUpload').innerHTML = "Invalid File";
		$('#myModalWrongUpload').modal('show');
	}
}
document.getElementById('upload').addEventListener('change', handleFileSelect, false);
document.getElementById('cancelUpload').addEventListener('click', function (e) {

	e.preventDefault();
	document.getElementById("fileName").innerHTML = "";
	document.getElementById("upload").value = "";
	flag = false;

});

var merchantPerDeliveryCost;
naValuesType.map(item => {
	document.querySelector(`select#${item}`).addEventListener('change', function (e) {
		if (item !== "dayType" && item !== "productCity") {
			let obj = criteriaMap.get(item);
			// //console.log(obj[e.target.value]);
			if (/^\d+$/.test(obj[e.target.value])) {
				document.getElementById('delivery_charge').value = obj[e.target.value];
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
				document.getElementById('delivery_charge').disabled = true;
			}
			else {
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (This is Merchant's delivery charge. It can be modified)";
				document.getElementById('delivery_charge').disabled = false;
				document.getElementById('delivery_charge').value = merchantPerDeliveryCost;
			}
		}
		else {
			//console.log("Hello");
			let objDayType = criteriaMap.get("dayType");
			let objProductCity = criteriaMap.get("productCity");
			let dayType = document.querySelector(`select#dayType`).value;
			let productCity = document.querySelector(`select#productCity`).value;
			//console.log(dayType, productCity);

			//console.log(objDayType?.[dayType], objProductCity?.[productCity]);

			//console.log((/^\d+$/.test(objDayType?.[dayType])));
			//console.log((/^\d+$/.test(objProductCity?.[productCity])));

			if (/^\d+$/.test(objDayType?.[dayType]) && /^\d+$/.test(objProductCity?.[productCity])) {
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
				document.getElementById('delivery_charge').value = Math.max(objDayType?.[dayType], objProductCity?.[productCity]);
				document.getElementById('delivery_charge').disabled = true;
			}
			else {
				if (objDayType?.[dayType] || objDayType?.[dayType] === 0) {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
					document.getElementById('delivery_charge').disabled = true;
					document.getElementById('delivery_charge').value = objDayType[dayType];
				}
				else if (objProductCity?.[productCity] || objProductCity?.[productCity] === 0) {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
					document.getElementById('delivery_charge').disabled = true;
					document.getElementById('delivery_charge').value = objProductCity[productCity];
				}
				else {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
					document.getElementById('delivery_charge').disabled = false;
					document.getElementById('delivery_charge').value = merchantPerDeliveryCost;
				}
			}
		}
	});
});

// $("#senderListExcel").on("change",function () {
// 	var value = $(this).val();
// 	if (value) {
// 		$.ajax
// 			({
// 				type: "GET",
// 				url: urlForAll + "profile/get/profile/" + value,
// 				headers:
// 				{
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json',
// 					"Authorization": 'Bearer ' + localStorage.getItem('token')
// 				},
// 				success: function (data) {
// 					if (data.status == 'OK') {
// 						document.getElementById('senderInfo').innerHTML = "Sender's Information For Excel:";
// 						document.getElementById('senLatLong').innerHTML =
// 							`Sender's Address: ${data.data.sender_address}<br>
// 						Sender's Name: ${data.data.sender_name}<br>
// 						Sender's Phone Number: ${data.data.sender_phone_number}<br>
// 						Sender's Lattitude: ${data.data.sender_lat}<br>
// 						Sender's Longitude: ${data.data.sender_longi}<br>`;

// 					}
// 				},
// 				error: function (XMLHttpRequest, textStatus, errorThrown) {

// 					$('#myModal2').modal('show');
// 				}
// 			})
// 	}
// 	else {
// 		document.getElementById('senLatLong').innerHTML = "";
// 		document.getElementById('senderInfo').innerHTML = "";
// 	}
// });

$("#senderList").on("change", async function () {
	var value = $(this).val();
	if (value) {
		await $.ajax
			({

				type: "GET",
				url: urlForAll + "profile/get/profile/" + value,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					if (data.status == 'OK') {
						document.getElementById('pac-input').value = data.data.sender_address;
						document.getElementById('s_name').value = data.data.sender_name;
						document.getElementById('s_number').value = data.data.sender_phone_number;
						document.getElementById('lat').value = data.data.sender_lat;
						document.getElementById('longi').value = data.data.sender_longi;
						if (data.data.per_delivery_cost > 0) {
							merchantPerDeliveryCost = data.data.per_delivery_cost;
							document.getElementById('delivery_charge').value = data.data.per_delivery_cost;
							document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (This is Merchant's delivery charge. It can be modified)";
						}
						else {
							merchantPerDeliveryCost = 0;
							$("#delivery_charge").attr('placeholder', "80");
							document.getElementById('delivery_charge').value = "";
							document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
						}
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {

					$('#myModal2').modal('show');
				}
			})
		criteriaInfo(value);
	}
	else {
		// var map = new google.maps.Map(document.getElementById('map'), {
		// 	center: { lat: 0, lng: 0 },
		// 	zoom: 10,
		// 	mapTypeId: 'roadmap',
		// 	mapTypeControl: false,
		// 	fullscreenControl: false
		// });
		document.getElementById('pac-input').value = "";
		document.getElementById('s_name').value = "";
		document.getElementById('s_number').value = "";
		document.getElementById('lat').value = "";
		document.getElementById('longi').value = "";
		$("#delivery_charge").attr('placeholder', "80");
		document.getElementById('delivery_charge').value = "";
		document.getElementById('delivery_charge').disabled = false;
		document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
		$('.criteria')
			.hide();
	}
});
$("#quiccSender").on("change", async function () {
	var value = $(this).val();
	if (value) {
		await $.ajax
			({

				type: "GET",
				url: urlForAll + "profile/get/profile/" + value,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					if (data.status == 'OK') {
						document.getElementById('addQ').value = data.data.sender_address;
						document.getElementById('s_nameQ').value = data.data.sender_name;
						document.getElementById('s_numberQ').value = data.data.sender_phone_number;
						document.getElementById('latQ').value = data.data.sender_lat;
						document.getElementById('longiQ').value = data.data.sender_longi;
						if (data.data.per_delivery_cost > 0) {
							document.getElementById('delivery_chargeQ').value = data.data.per_delivery_cost;
							document.getElementById('D_chargeQ').innerHTML = "Delivery Charge [BDT]: (This is Merchant's delivery charge. It can be modified)";
						}
						else {
							$("#delivery_chargeQ").attr('placeholder', "80");
							document.getElementById('delivery_chargeQ').value = "";
							document.getElementById('D_chargeQ').innerHTML = "Delivery Charge [BDT]:";
						}
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {

					$('#myModal2').modal('show');
				}
			})
	}
	else {
		// var map = new google.maps.Map(document.getElementById('map'), {
		// 	center: { lat: 0, lng: 0 },
		// 	zoom: 10,
		// 	mapTypeId: 'roadmap',
		// 	mapTypeControl: false,
		// 	fullscreenControl: false
		// });
		document.getElementById('addQ').value = "";
		document.getElementById('s_nameQ').value = "";
		document.getElementById('s_numberQ').value = "";
		document.getElementById('latQ').value = "";
		document.getElementById('longiQ').value = "";
		$("#delivery_chargeQ").attr('placeholder', "80");
		document.getElementById('delivery_chargeQ').value = "";
		document.getElementById('D_chargeQ').innerHTML = "Delivery Charge [BDT]:";
	}
});

function checkCriteria(val, msg, ex = "") {
	let a = val;
	if (a) {
		a = a?.includes(`${msg}`) ? "NOT_SELECTED" : a + ex;
		return a;
	}
	return "---";
}

function dataTableStyle() {
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

function formatUnassigned(d) {
	//Delivery Info
	let delivery_created_date = d.delivery_created_date || "";
	let pickup_time = d.pickup_time || "";
	let delivery_status = d.delivery_status || "";
	// let delivery_created_by_name = d.delivery_created_by_name || "";
	// let delivery_created_by_role = d.delivery_created_by_role || "";
	let delivery_created_by_name_role = d.delivery_created_by_name + ", " + d.delivery_created_by_role;
	let delivery_type = d.delivery_type || "";
	let delivery_note = d.delivery_note || "";

	//Sender's Info
	let sender_name = d.sender_name || "";
	let sender_phone_number = d.sender_phone_number || "";
	let sender_address = d.sender_address || "";

	//Receiver's Info
	let receiver_name = d.receiver_name || "";
	let receiver_phone_number = d.receiver_phone_number || "";
	let delivery_city = d.delivery_city || "";
	let delivery_area = d.delivery_area || "";
	let receiver_address = d.receiver_address || "";

	//Criteria Info
	let delivery_product_type = checkCriteria(d.delivery_product_type, "delivery_product_type_na");
	let delivery_weight = checkCriteria(d.delivery_weight, "delivery_weight_na", " KG");
	let delivery_day_type = checkCriteria(d.delivery_day_type, "delivery_day_type_na");
	let delivery_distance = checkCriteria(d.delivery_distance, "delivery_distance_na", " KM");
	let delivery_city_criteria = checkCriteria(d.delivery_city_criteria, "delivery_city_criteria_na");

	//Product Info

	//Payment Info
	let payment_method = d.payment_method || "";

	return '<table id="innerRowTable">' +
		'<thead>' +
		"<tr colspan='2'>" +
		"<th colspan='2' style='text-align:center;'>Sender\'s Info</th>" +
		"</tr ></thead >" +
		'<tr>' +
		'<td>Sender\'s Name:</td>' +
		'<td>' + sender_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Sender\'s Phone:</td>' +
		'<td>' + sender_phone_number + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Sender\'s Address:</td>' +
		'<td>' + sender_address + '</td>' +
		'</tr>' +
		'</table>' + '<table id="innerRowTable">' +
		'<thead>' +
		"<tr colspan='2'>" +
		"<th colspan='2' style='text-align:center;'>Receiver\'s Info</th>" +
		"</tr ></thead >" +
		'<tr>' +
		'<td>Receiver\'s Name:</td>' +
		'<td>' + receiver_name + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Receiver\'s Phone:</td>' +
		'<td>' + receiver_phone_number + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Receiver\'s City:</td>' +
		'<td>' + delivery_city + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Receiver\'s Area:</td>' +
		'<td>' + delivery_area + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Receiver\'s Address:</td>' +
		'<td>' + receiver_address + '</td>' +
		'</tr>' +
		'</table>' +
		'<table id="innerRowTable">' +
		'<thead>' +
		"<tr colspan='2'>" +
		"<th colspan='2' style='text-align:center;'>Delivery Info</th>" +
		"</tr ></thead >" +
		'<tr>' +
		'<td>Delivery Status:</td>' +
		'<td>' + delivery_status + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Payment Method:</td>' +
		'<td>' + payment_method + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Creation Date and Time:</td>' +
		'<td>' + delivery_created_date + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Pickup Time:</td>' +
		'<td>' + pickup_time + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Company Name &amp Designation:</td>' +
		'<td>' + delivery_created_by_name_role + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Type:</td>' +
		'<td>' + delivery_type + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Note:</td>' +
		'<td>' + delivery_note + '</td>' +
		'</tr>' +
		'</table>' +
		'<table id="innerRowTable">' +
		'<thead>' +
		"<tr colspan='2'>" +
		"<th colspan='2' style='text-align:center;'>Criteria Info</th>" +
		"</tr ></thead >" +
		'<tr>' +
		'<td>Product Type:</td>' +
		'<td>' + delivery_product_type + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Product Weight [KG]</td>' +
		'<td>' + delivery_weight + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Day Type:</td>' +
		'<td>' + delivery_day_type + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Distance Type [KM]:</td>' +
		'<td>' + delivery_distance + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>City Type:</td>' +
		'<td>' + delivery_city_criteria + '</td>' +
		'</tr>' +
		'</table>';
}

function tdColspan() {
	if (window.innerWidth < 1293 && window.innerWidth > 1193) {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "8");
	}
	else if (window.innerWidth <= 600) {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "3");
	}
	else if (window.innerWidth <= 1193) {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "5");
	}
	else {
		Array.from(document.querySelectorAll('td[colspan]')).map(item => item.colSpan = "10");
	}
}
var unassignedDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('oneb').disabled = true;
	document.getElementById('oneb').style.fontSize = '13px';
	this_select_content = "";
	$.ajax
		({
			url: urlForAll + "deliveryMan/approved/" + org_ID,
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#deliveryManList')
					.empty()
					.append('<option selected="selected" value="">Delivery Man List</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i].delivery_man_id, data.data[i].delivery_man_id);
					$(option).html(data.data[i].name);
					$("#deliveryManList").append(option);
					this_select_content += '<option value="' + data.data[i].delivery_man_id + '">' + data.data[i].name + '</option>';
				}
			}
		});

	var table = $('#dtBasicExampled').DataTable({
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
			"url": urlForAll + "manager/all/unAssign/delivery/" + org_ID,
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
			{ "targets": 0, "data": "delivery_Id" },
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 20, "data": "assign", render: function (data, type, row) {

					return '<button id="' + row.delivery_Id + '" class="btn-round btn-outline btn assignIt" style="font-size:13px;">Assign</button>'
				}
			},
			{
				"targets": 21, "data": "update", render: function (data, type, row) {

					return '<button id="' + row.delivery_Id + '$$' + row.creator_id + '$$' + row.delivery_charge + '$$' + row.pickup_time + '$$' + row.receiver_name + '$$' + row.receiver_phone_number + '$$' + row.product_name + '$$' + row.product_qty + '$$' + row.payment_method + '$$' + row.product_cost + '$$' + row.delivery_note + '$$' + row.delivery_area + '$$' + row.receiver_address + '$$' + row.receiver_lat + '$$' + row.receiver_longi + '$$' + row.sender_name + '$$' + row.sender_phone_number + '$$' + row.sender_address + '$$' + row.delivery_type + '$$' + row.sender_lat + '$$' + row.sender_longi + '$$' + row.delivery_created_date + '$$' + row.delivery_created_by_name + '$$' + row.delivery_created_by_role + '$$' + row.collection_name + '$$' + row.delivery_status + '$$' + row.delivery_city + '$$' + row.delivery_product_type + '$$' + row.delivery_weight + '$$' + row.delivery_day_type + '$$' + row.delivery_distance + "$$" + row.delivery_city_criteria + '" class="btn-round btn-outline btn updateCh" style="font-size:13px;">Update</button>'
				}
			},
			{
				"targets": 22, "data": "invoice", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoiceUnass(this)"; style="font-size: 13px">Invoice</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('oneb').innerHTML = 'Unassigned Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	$('#dtBasicExampled tbody').off('click', 'td.details-control');
	$('#dtBasicExampled tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampled').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
	dataTableStyle();
	$('.d').show();
	$('#dtBasicExampled').show();

}
//New
var assignedDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('twob').disabled = true;
	document.getElementById('twob').style.fontSize = '13px';

	var table = $('#dtBasicExampleNew').DataTable({
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
			"url": urlForAll + "delivery/assigned/" + org_ID,
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
			{ "targets": 0, "data": "delivery_Id" },
			{ "targets": 1, "data": "delivery_status" },
			{
				"targets": 5, "data": "assign_delivery_man_phone", render: function (data, type, row) {

					return row.assign_delivery_man_name + ", " + row.assign_delivery_man_phone;
				}
			},
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 20, "data": "invoice", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoice(this)" style="font-size:13px">Invoice</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('body').style.pointerEvents = "auto";
		document.getElementById('twob').innerHTML = 'Assigned Deliveries: ' + json.recordsTotal;
	});
	table.clear().draw();
	$('#dtBasicExampleNew tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNew tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNew').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();

		}
	});
	dataTableStyle();
	$('#dtBasicExampleNew').show();
	$('.e').show();
}

var onHoldDeliveries = () => {
	buttonActive();
	document.getElementById('sixb').disabled = true;
	document.getElementById('sixb').style.fontSize = '13px';

	var table = $('#dtBasicExampleNewf').DataTable({
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
			"url": urlForAll + "delivery/onHold/" + org_ID,
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
			{ "targets": 0, "data": "delivery_Id" },
			{
				"targets": 5, "data": "assign_delivery_man_phone", render: function (data, type, row) {

					return row.assign_delivery_man_name + ", " + row.assign_delivery_man_phone;
				}
			},
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" }
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('sixb').innerHTML = 'On Hold Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	$('#dtBasicExampleNewf tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNewf tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNewf').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();

		}
	});
	dataTableStyle();
	$('#dtBasicExampleNewf').show();
	$('.f').show();
}


var onGoingDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('sevenb').disabled = true;
	document.getElementById('sevenb').style.fontSize = '13px';
	var table = $('#dtBasicExampleNewg').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"paging": true,
		"pageLength": 100,
		"autoWidth": false,
		"searching": false,
		"ordering": false,
		"deferRender": true,
		"pagingType": "full_numbers",
		"lengthMenu": [[100, 200, 300, 400], [100, 200, 300, 400]],
		"serverSide": true,
		"destroy": true,
		"ajax":
		{
			"url": urlForAll + "delivery/onProcess/" + org_ID,
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
				"targets": 0,
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>",
			},
			{
				"targets": 5, "data": "delivery_Id", render: function (data, type, row) {
					return `${row.delivery_Id}` + '<button id="' + row.assign_delivery_man_name + '$$' + row.delivery_Id + '$$' + row.sender_lat + '$$' + row.sender_longi + '$$' + row.sender_address + '$$' + row.receiver_lat + '$$' + row.receiver_longi + '$$' + row.receiver_address + '" class="btn-round btn-outline btn mapInfos" style="font-size:13px;">Watch</button>'
				}
			},
			{ "targets": 2, "data": "delivery_status" },
			{
				"targets": 5, "data": "assign_delivery_man_phone", render: function (data, type, row) {
					return `${row.assign_delivery_man_name}, ${row.assign_delivery_man_phone}`;
				}
			},
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{
				"targets": 20, "data": "invoice", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoice(this)" style="font-size:13px">Invoice</button>'
				}
			},
			{
				"targets": 21, "data": "re-assign", render: function (data, type, row) {

					return '<button id="' + row.delivery_Id + '" class="btn-round btn-outline btn reassignIt" style="font-size:13px">Re-Assign</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();

		document.getElementById('sevenb').innerHTML = 'Ongoing Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	$('#dtBasicExampleNewg tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNewg tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNewg').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
	dataTableStyle();
	$('#dtBasicExampleNewg').show();
	$('.g').show();
}


$('#dtBasicExampleNewg').on('click', '.mapInfos', function () {
	let data = $(this).attr('id');
	console.log(data);
	data = data.split("$$");
	$("#myModalInfoWatch").modal();
	document.querySelector("#infoFull").innerHTML = `Delivery Man: <strong>${data[0]}</strong>, Delivery ID: <strong>${data[1]}</strong>`
	mapSender = new SlidingMarker({
		position: new google.maps.LatLng(data[2], data[3]),
		map: mapWatch,
		title: `${data[4]}`,
		icon: {
			path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "#0066b3",
			fillOpacity: 0.9,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(15, 30),
		}
	});
	if (data.receiver_lat) {
		mapReceiver = new SlidingMarker({
			position: new google.maps.LatLng(data[5], data[6]),
			map: mapWatch,
			title: `${data[7]}`,
			icon: {
				path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
				fillColor: "#ffcf5c",
				fillOpacity: 0.9,
				strokeWeight: 0,
				rotation: 0,
				scale: 2,
				anchor: new google.maps.Point(15, 30),
			}
		});
	}
	//delivery man info
	mapInfoMarker = new SlidingMarker({
		position: new google.maps.LatLng(23.74146, 90.40941),
		map: mapWatch,
		title: data[0],
		duration: 2000
	});
	const center = new google.maps.LatLng(23.74146, 90.40941);
	mapWatch.setZoom(16);
	mapWatch.panTo(center);
	setTimeout(() => {
		mapInfoMarker.setPosition(new google.maps.LatLng(23.74346, 90.41241));
		mapWatch.panTo(new google.maps.LatLng(23.74346, 90.41241));
	}, 10000);
});


var completedDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('eightb').disabled = true;
	document.getElementById('eightb').style.fontSize = '13px';

	var table = $('#dtBasicExampleNewh').DataTable({
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
			"url": urlForAll + "delivery/complete/" + org_ID,
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
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>",
				"width": "2%"
			},
			{ "targets": 0, "data": "delivery_Id" },
			{ "targets": 5, "data": "delivery_complete_date" },
			{
				"targets": 7, "data": "assign_delivery_man_phone", render: function (data, type, row) {

					return `${row.assign_delivery_man_name}, ${row.assign_delivery_man_phone}`;
				}
			},
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 20, "data": "invoice", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoice(this)">Invoice</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('eightb').innerHTML = 'Completed Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	$('#dtBasicExampleNewh tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNewh tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNewh').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();

		}
	});
	table.clear().draw();
	dataTableStyle();
	$('#dtBasicExampleNewh').show();
	$('.h').show();
}

var canceledDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('nineb').disabled = true;
	document.getElementById('nineb').style.fontSize = '13px';
	var table = $('#dtBasicExampleNewi').DataTable({
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
			"url": urlForAll + "orgHead/get/canceled/deliveries/" + org_ID,
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
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>",
				"width": "2%"
			},
			{ "targets": 0, "data": "delivery_Id" },
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 20, "data": "recreate", render: function (data, type, row) {
					return '<button id="' + row.creator_id + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn recreateIt" style="font-size:13px">Recreate</button>'
				}
			},
			{
				"targets": 21, "data": "delete", render: function (data, type, row) {

					return '<button id="' + org_ID + '" name="' + row.delivery_Id + '" class="btn-round btn-outline btn deleteIt" style="font-size:13px">Delete</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('nineb').innerHTML = 'Canceled Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	$('#dtBasicExampleNewi tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNewi tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNewi').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();

		}
	});
	dataTableStyle();
	$('#dtBasicExampleNewi').show();
	$('.i').show();
}

var returnedDeliveries = () => {
	buttonActive();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('tenb').disabled = true;
	document.getElementById('tenb').style.fontSize = '13px';
	var table = $('#dtBasicExampleNewj').DataTable({
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
			"url": urlForAll + "orgHead/get/return/deliveries/" + org_ID,
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
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>",
				"width": "2%"
			},
			{ "targets": 0, "data": "delivery_Id" },
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 20, "data": "update_d", render: function (data, type, row) {
					return '<button id="' + row.delivery_Id + '$$' + row.creator_id + '$$' + row.delivery_charge + '$$' + row.product_name + '$$' + row.product_qty + '$$' + row.product_cost + '" class="btn-round btn-outline btn returnIt" style="font-size:13px">Update</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('tenb').innerHTML = 'Returned Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	$('#dtBasicExampleNewj tbody').off('click', 'td.details-control');
	$('#dtBasicExampleNewj tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampleNewj').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();

		}
	});
	dataTableStyle();
	$('#dtBasicExampleNewj').show();
	$('.j').show();
}

var save = (id) => {
	localStorage.setItem("'Accept': 'application/json'", id.id);
	localStorage.setItem("'Accept': 'application/jsonN'", id.name);
	window.open('addDeliverToDeliveryMan.html', '_blank');
};

var orgid;
var deliveryManId;
var $t;
$('#dtBasicExampled').on('click', '.assignIt', function () {
	orgid = $(this).attr('id'); //delivery ID
	$t = $(this);
	deliveryManId = document.getElementById("deliveryManList").value;

	$('#tick').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure").html("Are you sure?");
	$("#myModal").modal();
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok').on("click", function () {

	$("#sure").html("Please wait!");
	document.getElementById('modalCancelG').disabled = true;
	document.getElementById('modalApproveG').disabled = true;
	if (deliveryManId) {
		$.ajax
			({

				type: "PUT",
				url: urlForAll + "delivery/assign/" + org_ID + "/" + orgid + "/" + deliveryManId,

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

						$("#sure").html("Delivery man assigned!");
					}, 900);

					setTimeout(function () {
						$("#myModal").modal('hide');
						var table = $('#dtBasicExampled').DataTable();
						table
							.row($t.parents('tr'))
							.remove()
							.draw(false);
						document.getElementById('oneb').innerHTML = 'Unassigned Deliveries: ' + table
							.column(0)
							.data()
							.length;

						document.getElementById('modalCancelG').disabled = false;
						document.getElementById('modalApproveG').disabled = false;
					}, 2000);
				},
				error: function (data) {
					////console.log(data);
					document.getElementById('modalCancelG').disabled = false;
					document.getElementById('modalApproveG').disabled = false;
					var ob = Object.keys(data);
					if (ob[17] == "responseJSON") {
						$('#wrongSMS').html(data.responseJSON.errorMessage);
						$('#myModalWrongSMS').modal();
						setTimeout(function () {
							$('#myModal').modal('hide');
						}, 500);
					}
					else {

						$('#myModal').modal('hide');
						$('#myModal2').modal();
					}
				}
			});
	}
	else {
		document.getElementById('modalCancelG').disabled = false;
		document.getElementById('modalApproveG').disabled = false;
		$('#myModal').modal('hide');
		$('#myModal23').modal();
	}

});
var tablexxx;
// $('#dtBasicExampleNew').on('click', '.reassignIt', function () {
// 	tablexxx = "#dtBasicExampleNew";
// 	$("#dml").show();
// 	$("#deliveryManList2").show();
// 	$.ajax
// 		({
// 			url: urlForAll + "deliveryMan/approved/" + org_ID,
// 			type: "GET",

// 			headers:
// 			{
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
// 				"Authorization": 'Bearer ' + localStorage.getItem('token')
// 			},

// 			success: function (data) {
// 				$('#deliveryManList2')
// 					.empty()
// 					.append('<option selected="selected" value="">Select Delivery Man</option>')
// 					;
// 				for (var i = 0; i < data.data.length; i++) {
// 					var option = new Option(data.data[i].delivery_man_id, data.data[i].delivery_man_id);
// 					$(option).html(data.data[i].name);
// 					$("#deliveryManList2").append(option);
// 				}
// 			}
// 		});
// 	orgid = $(this).attr('id'); //delivery ID
// 	$t = $(this);

// 	$('#tickReassign').hide();
// 	$(".circle-loader").hide();
// 	$("#sureReassign").hide();
// 	$(".circle-loader").removeClass("load-complete");
// 	//$("#sureReassign").html("Are you sure?");
// 	$("#myModalReassign").modal();
// 	//$(".container").show();
// 	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
// });

$('#dtBasicExampleNewg').on('click', '.reassignIt', function () {
	tablexxx = "#dtBasicExampleNewg";
	$("#dml").show();
	$("#deliveryManList2").show();
	$.ajax
		({
			url: urlForAll + "deliveryMan/approved/" + org_ID,
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				$('#deliveryManList2')
					.empty()
					.append('<option selected="selected" value="">Select Delivery Man</option>')
					;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i].delivery_man_id, data.data[i].delivery_man_id);
					$(option).html(data.data[i].name);
					$("#deliveryManList2").append(option);
				}
			}
		});
	orgid = $(this).attr('id'); //delivery ID
	$t = $(this);
	document.querySelector("#reassignID").innerHTML = `Delivery ID: <strong>${orgid}</strong>`;
	$('#tickReassign').hide();
	$(".circle-loader").hide();
	$("#sureReassign").hide();
	$(".circle-loader").removeClass("load-complete");
	//$("#sureReassign").html("Are you sure?");
	$("#myModalReassign").modal();
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okReassign').on("click", function () {
	$("#dml").hide();
	$("#deliveryManList2").hide();
	$("#sureReassign").html("Please wait!");
	//$('#tickReassign').show();
	$(".circle-loader").show();
	$("#sureReassign").show();
	document.getElementById('modalCancelGReassign').disabled = true;
	document.getElementById('modalApproveGReassign').disabled = true;
	deliveryManId = document.getElementById("deliveryManList2").value;
	if (deliveryManId) {
		$.ajax
			({

				type: "PUT",
				url: urlForAll + "delivery/assign/" + org_ID + "/" + orgid + "/" + deliveryManId,

				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					var table = $("#dtBasicExampleNewg").DataTable();
					let datapp = table.row($t.closest('tr')).data();
					table.cell({ row: table.row($t.closest('tr')).index(), column: 3 }).data(data.assign_delivery_man_phone);
					table.rows().every(function (index, element) {
						var row = $(this.node());
						if (row.find('td').eq(3)[0].innerHTML === `${datapp.assign_delivery_man_name}, ${datapp.assign_delivery_man_phone}`) {
							row.find('td').eq(3)[0].innerHTML = `${data.assign_delivery_man_name}, ${data.assign_delivery_man_phone}`;
						}
					});

					$("#sureReassign").html("Please wait!");
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tickReassign').show();

						$("#sureReassign").html("Delivery man re-assigned!");
					}, 900);

					setTimeout(function () {
						$("#myModalReassign").modal('hide');

						document.getElementById('modalCancelGReassign').disabled = false;
						document.getElementById('modalApproveGReassign').disabled = false;
					}, 2000);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {

					document.getElementById('modalCancelGReassign').disabled = false;
					document.getElementById('modalApproveGReassign').disabled = false;
					$('#myModalReassign').modal('hide');
					$('#myModal2').modal();
				}
			});
	}
	else {
		document.getElementById('modalCancelGReassign').disabled = false;
		document.getElementById('modalApproveGReassign').disabled = false;
		$('#myModalReassign').modal('hide');
		$('#myModal23').modal();
	}

});


var invoiceUnass = (id) => {
	/*document.getElementById("invoiceDelivery").href = urlForAll + "reports/individual/report/preAssign/" + id.id + "/" + id.name; 
	document.getElementById("invoiceDeliveryy").src = urlForAll + "reports/individual/report/preAssign/" + id.id + "/" + id.name;
	var downloadStartTime = setTimeout(function () {
	   document.getElementById('invoiceDelivery').click();
	}, 1200);*/
	window.open(urlForAll + "reports/individual/report/preAssign/" + id.id + "/" + id.name);
};

var mapxx = () => {
	/*document.getElementById("invoiceDelivery").href = urlForAll + "reports/individual/report/" + id.id + "/" + id.name; 
	document.getElementById("invoiceDeliveryy").src = urlForAll + "reports/individual/report/" + id.id + "/" + id.name;
	var downloadStartTime = setTimeout(function () {
	   document.getElementById('invoiceDelivery').click();
	}, 1200);*/
	window.open("locationFinder.html", "_blank");
};
var invoice = (id) => {
	/*document.getElementById("invoiceDelivery").href = urlForAll + "reports/individual/report/" + id.id + "/" + id.name; 
	document.getElementById("invoiceDeliveryy").src = urlForAll + "reports/individual/report/" + id.id + "/" + id.name;
	var downloadStartTime = setTimeout(function () {
	   document.getElementById('invoiceDelivery').click();
	}, 1200);*/
	window.open(urlForAll + "reports/individual/report/" + id.id + "/" + id.name);
};

$("#managers2").on("change", function () {
	var value = $(this).val();
	if (value == 'Cash on Delivery') {
		$("#cod").show();
	}
	else {
		$("#cod").hide();
	}
});


//EKEBARE NEW
$('#dtBasicExampleNewi').on('click', '.recreateIt', function () {
	orgid = $(this).attr('id');
	deliveryId = $(this).attr('name');
	$t = $(this);

	$('#modalRecDelV').show();
	$('#modalRecDelV2').hide();
	$('#tickRD').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#recreateDelete").html(`Recreate Delivery ID: <strong>${deliveryId}</strong>`);
	$("#modalRecDelV").html("Recreate");
	$("#sureRD").html("Are you sure?");
	$("#myModalRecreateDelete").modal();
	document.getElementById('modalCancelV').disabled = false;
	document.getElementById('modalRecDelV').disabled = false;
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okRD').on("click", function () {

	$("#sureRD").html("Please wait!");
	document.getElementById('modalCancelV').disabled = true;
	document.getElementById('modalRecDelV').disabled = true;

	$.ajax
		({

			type: "PUT",
			url: urlForAll + "orgHead/approve/cancel/delivery/" + org_ID + "/" + orgid + "/" + deliveryId + "/" + "yes",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureRD").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickRD').show();

					$("#sureRD").html("Delivery Recreated! Please Check Unassigned Deliveries!");
				}, 900);

				setTimeout(function () {
					$("#myModalRecreateDelete").modal('hide');
					var table = $('#dtBasicExampleNewi').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
					document.getElementById('nineb').innerHTML = 'Canceled Deliveries: ' + table
						.column(0)
						.data()
						.length;

					document.getElementById('modalCancelG').disabled = false;
					document.getElementById('modalRecDelV').disabled = false;
				}, 3600);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				document.getElementById('modalCancelG').disabled = false;
				document.getElementById('modalRecDelV').disabled = false;
				$('#myModalRecreateDelete').modal('hide');
				$('#myModal2').modal();
			}
		});
});
$('#dtBasicExampleNewi').on('click', '.deleteIt', function () {
	orgid = $(this).attr('id');
	deliveryId = $(this).attr('name');
	$t = $(this);

	$('#modalRecDelV2').show();
	$('#modalRecDelV').hide();
	$('#tickRD').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#recreateDelete").html(`Delete Delivery ID: <strong>${deliveryId}</strong>`);
	$("#modalRecDelV2").html("Delete");
	$("#sureRD").html("Are you sure?");
	$("#myModalRecreateDelete").modal();

	document.getElementById('modalCancelV').disabled = false;
	document.getElementById('modalRecDelV2').disabled = false;
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okRD2').on("click", function () {
	$("#sureRD").html("Please wait!");
	document.getElementById('modalCancelV').disabled = true;
	document.getElementById('modalRecDelV2').disabled = true;
	$.ajax
		({

			type: "PUT",
			url: urlForAll + "orgHead/approve/cancel/delivery/" + org_ID + "/" + orgid + "/" + deliveryId + "/" + "no",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				$("#sureRD").html("Please wait!");
				setTimeout(function () {
					$(".circle-loader").addClass("load-complete");

					$('#tickRD').show();

					$("#sureRD").html("This Delivery Has Been Deleted!");
				}, 900);

				setTimeout(function () {
					$("#myModalRecreateDelete").modal('hide');
					var table = $('#dtBasicExampleNewi').DataTable();
					table
						.row($t.parents('tr'))
						.remove()
						.draw(false);
					document.getElementById('nineb').innerHTML = 'Canceled Deliveries: ' + table
						.column(0)
						.data()
						.length;
					document.getElementById('modalCancelG').disabled = false;
					document.getElementById('modalRecDelV2').disabled = false;
				}, 3000);
			},
			error: function (data) {
				document.getElementById('modalCancelG').disabled = false;
				document.getElementById('modalRecDelV2').disabled = false;
				$('#myModalRecreateDelete').modal('hide');
				$('#myModal2').modal();
			}
		});
});


function recall() {

	var senderGuy = document.getElementById('senderList').value;
	document.getElementById('r_name').value = "";
	document.getElementById('r_number').value = "";
	document.getElementById('rec_address').value = "";
	document.getElementById('pac-input2').value = "";
	document.getElementById('DELIVERY_NOTE').value = "";
	document.getElementById('product_cost').value = "";
	document.getElementById('des_lat').value = "";
	document.getElementById('des_longi').value = "";
	document.getElementById('product_name').value = "";
	document.getElementById('product_qty').value = "";
	$.ajax
		({

			type: "GET",
			url: urlForAll + "profile/get/profile/" + senderGuy,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				document.getElementById('pac-input').value = data.data.sender_address;
				document.getElementById('s_name').value = data.data.sender_name;
				document.getElementById('s_number').value = data.data.sender_phone_number;
				document.getElementById('lat').value = data.data.sender_lat;
				document.getElementById('longi').value = data.data.sender_longi;
			}
		})
}
function recallQ() {
	document.getElementById('r_nameQ').value = "";
	document.getElementById('r_numberQ').value = "";
	document.getElementById('rec_addressQ').value = "";
	document.getElementById('product_costQ').value = "";
	document.getElementById('product_nameQ').value = "";
}

document.getElementById("createDeliveryQ").addEventListener("click", function (event) {
	// var pickup_time = document.getElementById('timepicker-12-hr').value;
	divElement.innerHTML = "";
	var s_name = document.getElementById('s_nameQ').value;
	var s_number = document.getElementById('s_numberQ').value;
	var s_address = document.getElementById('addQ').value;

	var pickup_lat = String(document.getElementById('latQ').value);
	var pickup_longi = String(document.getElementById('longiQ').value);

	var quiccSender = document.getElementById('quiccSender').value;

	var r_name = document.getElementById('r_nameQ').value;
	var r_number = document.getElementById('r_numberQ').value;
	// var r_address = document.getElementById('pac-input2').value;
	var rec_address = document.getElementById('rec_addressQ').value;
	var payment_method = document.getElementById('managers2Q').value;
	// var delivery_note = document.getElementById('DELIVERY_NOTE').value;
	// var delivery_type = document.getElementById('deliveryType').value;
	// var area = String(document.getElementById('managers_2').value);
	// var delivery_lat = String(document.getElementById('des_lat').value);
	// var delivery_longi = String(document.getElementById('des_longi').value);
	var product_name = String(document.getElementById('product_nameQ').value);
	// var product_qty = String(document.getElementById('product_qty').value);
	var product_cost = document.getElementById('product_costQ').value;
	var delivery_charge = document.getElementById('delivery_chargeQ').value;
	// var deliveryCity = String(document.getElementById('managers').value);
	// var dayType = document.getElementById('dayType').value;
	// var productType = document.getElementById('productType').value;
	// var distance = document.getElementById('productDistance')?.value;
	// var weight = document.getElementById('productWeight').value;
	// var cityType = document.getElementById('productCity').value;
	// var v1 = () => {
	// 	if (pickup_time == "" || pickup_time == null) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please give a Pickup Time!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		document.getElementById("timepicker-12-hr").focus();
	// 		return 0;
	// 	}
	// 	else {
	// 		return 1;
	// 	}
	// }
	// var v2 = () => {
	// 	if (s_name == "" || s_name == null) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender Name cannot be empty!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// 	else {
	// 		return 1;
	// 	}
	// }
	// var v3 = () => {
	// 	if (s_number == "" || s_number == null) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number cannot be empty!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// 	else if ((s_number.length < 11 || s_number.length > 11) && !/\D/.test(s_number) == true) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number must be of 11 digits!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// 	else if (s_number.match(/\d/g).length === 11 && !/\D/.test(s_number) == true) {
	// 		return 1;
	// 	}
	// 	else {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number not valid!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// }
	// var v4 = () => {
	// 	if (s_address == "" || s_address == null) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Address cannot be empty!!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// 	else {
	// 		return 1;
	// 	}
	// }
	var v5 = () => {
		if (r_name == "" || r_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Name cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_nameQ").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (r_number == "" || r_number == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_numberQ").focus();
			return 0;
		}
		else if ((r_number.length < 11 || r_number.length > 11) && !/\D/.test(r_number) == true) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number must be of 11 digits!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_numberQ").focus();
			return 0;
		}
		else if (r_number.match(/\d/g).length === 11 && !/\D/.test(r_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number not valid!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_numberQ").focus();
			return 0;
		}
	}
	// var v7 = () => {
	// 	if (r_address == "" || r_address == null) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Address cannot be empty on map!!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		document.getElementById("pac-input2").focus();
	// 		return 0;
	// 	}
	// 	else {
	// 		return 1;
	// 	}
	// }
	var v9 = () => {
		if (product_name == "" || product_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Details cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_nameQ").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	// var v10 = () => {
	// 	if (parseInt(product_qty) <= 0 || product_qty.charAt(0) == 0) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Quantity must be greater than 0!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		document.getElementById("product_qty").focus();
	// 		return 0;
	// 	}
	// 	else if (isNaN(product_qty) == true || product_qty == "" || !/\D/.test(product_qty) == false) {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Quantity must be a number!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		document.getElementById("product_qty").focus();
	// 		return 0;
	// 	}
	// 	else if (!/\D/.test(product_qty) == true) {
	// 		return 1;
	// 	}
	// }
	var v11 = () => {
		if (parseInt(product_cost) < 0) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Cost must be greater than or equal to 0!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_costQ").focus();
			return 0;
		}
		else if (isNaN(product_cost) == true || product_cost == "" || !/\D/.test(product_cost) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Cost must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_costQ").focus();
			return 0;
		}
		else if (!/\D/.test(product_cost) == true) {
			return 1;
		}
	}
	// var v13 = () => {
	// 	if (delivery_lat == "" || delivery_longi == "") {
	// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please select Receiver's Address on map!";
	// 		$('#myModalWrongDeliveryCreate').modal('show');
	// 		return 0;
	// 	}
	// 	else {
	// 		return 1;
	// 	}
	// }
	var v12 = () => {
		if (rec_address == "" || rec_address == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please give Receiver's Address!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("rec_addressQ").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var vDC = () => {
		if (parseInt(delivery_charge) < 0) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be greater than or equal to 0!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_chargeQ").focus();
			return 0;
		}
		else if (isNaN(delivery_charge) == true || delivery_charge == "" || !/\D/.test(delivery_charge) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_chargeQ").focus();
			return 0;
		}
		else if (!/\D/.test(delivery_charge) == true) {
			return 1;
		}
	}
	var datap;

	if (v5() == 1 && v6() == 1 && v9() == 1 && v11() == 1 && v12() == 1 && vDC() == 1) {
		document.getElementById('createDeliveryQ').disabled = true;
		$(".circle-loader").show();
		datap = JSON.stringify
			({
				"delivery_status": "",
				"delivery_type": "CUSTOMER",
				"sender_name": s_name,
				"sender_phone_number": s_number,
				"sender_address": s_address,
				"sender_lat": pickup_lat,
				"sender_longi": pickup_longi,
				"receiver_name": r_name,
				"receiver_phone_number": r_number,
				"receiver_address": rec_address,
				"product_name": product_name,
				"product_qty": "NA",
				"product_cost": product_cost,
				"payment_method": payment_method,
				"delivery_charge": delivery_charge,
				"receiver_lat": "",
				"receiver_longi": "",
				"pickup_time": "",
				"delivery_note": "",
				"delivery_area": "",
				"delivery_city": "",
				"delivery_day_type": "delivery_day_type_na",
				"delivery_product_type": "delivery_product_type_na",
				"delivery_weight": "delivery_weight_na",
				"delivery_distance": "delivery_distance_na",
				"delivery_city_criteria": "delivery_city_criteria_na"
			});
		console.log(datap);
		$.ajax
			({
				type: "POST",
				url: urlForAll + "delivery/create/quick/" + quiccSender + "/no",
				data: datap,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					//console.log(data);
					$('#tickD2').hide();
					$(".circle-loader").removeClass("load-complete");
					$("#sureD2").html("");
					$("#myModalCreateD1").modal('show');
					$("#sureD2").html("Please wait!");
					if (data.status == 'OK') {
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							$('#tickD2').show();

							$("#sureD2").html(`Delivery ID: <strong>${data.data.delivery_Id}</strong> added! Thank You!`);
						}, 500);
						setTimeout(function () {

							document.getElementById('createDeliveryQ').disabled = false;
							$("#myModalCreateD1").modal('hide');
						}, 2000);
						recallQ();
					}
				},
				error: function (data) {
					document.getElementById('createDeliveryQ').disabled = false;
					////console.log(data.responseJSON.errorMessage);
					////console.log(data);
					var ob = Object.keys(data);
					$("#myModalCreateD1").modal('show');
					if (ob[17] == "responseJSON") {
						$(".circle-loader").hide();
						$("#sureD2").html("");
						$("#sureD2ZZ").html("");
						divElement.innerHTML += `Oops! Looks like you are not able to create delivery!<br>Please Contact Your Organization!<br>`;
						//$('#wrongSMS').html(data.responseJSON.errorMessage);
						//$('#myModalWrongSMS').modal();
						return;
					}
					else {
						$(".circle-loader").hide();
						$("#sureD2").html("");
						$("#sureD2ZZ").html("");
						divElement.innerHTML += `Something went wrong!<br>Please Wait A Bit?<br>`;
						return;
					}
				}
			})
	}
});

document.getElementById("createDelivery").addEventListener("click", function (event) {
	divElement.innerHTML = "";
	document.getElementById('CLOSEIT').disabled = false;
	var pickup_time = document.getElementById('timepicker-12-hr').value;
	var s_name = document.getElementById('s_name').value;
	var s_number = document.getElementById('s_number').value;
	var s_address = document.getElementById('pac-input').value;
	var r_name = document.getElementById('r_name').value;
	var r_number = document.getElementById('r_number').value;
	var r_address = document.getElementById('pac-input2').value;
	var rec_address = document.getElementById('rec_address').value;
	var payment_method = document.getElementById('managers2').value;
	var delivery_note = document.getElementById('DELIVERY_NOTE').value;
	var delivery_type = document.getElementById('deliveryType').value;
	var delivery_charge = document.getElementById('delivery_charge').value;
	var deliveryCity = String(document.getElementById('managers').value);
	var area = String(document.getElementById('managers_2').value);
	var pickup_lat = String(document.getElementById('lat').value);
	var pickup_longi = String(document.getElementById('longi').value);
	var delivery_lat = String(document.getElementById('des_lat').value);
	var delivery_longi = String(document.getElementById('des_longi').value);
	var product_name = String(document.getElementById('product_name').value);
	var product_qty = String(document.getElementById('product_qty').value.toUpperCase());
	var dayType = document.getElementById('dayType').value;
	var productType = document.getElementById('productType').value;
	var distance = document.getElementById('productDistance')?.value;
	var weight = document.getElementById('productWeight').value;
	var cityType = document.getElementById('productCity').value;
	var senderGuy = document.getElementById('senderList').value;
	var product_cost = document.getElementById('product_cost').value;
	var yesno = document.getElementById('autoAss').value;
	var v0 = () => {
		if (!senderGuy) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please select a sender from list!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("senderList").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v1 = () => {
		// if (pickup_time == "" || pickup_time == null) {
		// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please give a Pickup Time!";
		// 	$('#myModalWrongDeliveryCreate').modal('show');
		// 	document.getElementById("timepicker-12-hr").focus();
		// 	return 0;
		// }
		// else {
		// 	return 1;
		// }
		return 1;
	}
	var v2 = () => {
		if (s_name == "" || s_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender Name cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (s_number == "" || s_number == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else if ((s_number.length < 11 || s_number.length > 11) && !/\D/.test(s_number) == true) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number must be of 11 digits!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else if (s_number.match(/\d/g).length === 11 && !/\D/.test(s_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number not valid!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
	}
	var v4 = () => {
		if (s_address == "" || s_address == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Address cannot be empty!!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v5 = () => {
		if (r_name == "" || r_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Name cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_name").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (r_number == "" || r_number == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_number").focus();
			return 0;
		}
		else if ((r_number.length < 11 || r_number.length > 11) && !/\D/.test(r_number) == true) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number must be of 11 digits!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_number").focus();
			return 0;
		}
		else if (r_number.match(/\d/g).length === 11 && !/\D/.test(r_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Phone Number not valid!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("r_number").focus();
			return 0;
		}
	}
	var v7 = () => {
		if (r_address == "" || r_address == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Address on map cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("pac-input2").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v8 = () => {

		if (parseInt(delivery_charge) < 0) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be greater than or equal to 0!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_charge").focus();
			return 0;
		}
		else if (isNaN(delivery_charge) == true || delivery_charge == "" || !/\D/.test(delivery_charge) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_charge").focus();
			return 0;
		}
		else if (!/\D/.test(delivery_charge) == true) {
			return 1;
		}
	}
	var v9 = () => {
		if (product_name == "" || product_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Details cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_name").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v10 = () => {
		if (product_qty.toUpperCase() === "NA") {
			return 1;
		}
		else if (parseInt(product_qty) <= 0) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Quantity must be greater than 0!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_qty").focus();
			return 0;
		}
		else if (isNaN(product_qty) == true || product_qty == "" || !/\D/.test(product_qty) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Quantity must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_qty").focus();
			return 0;
		}
		else if (!/\D/.test(product_qty) == true) {
			return 1;
		}
	}
	var v11 = () => {
		if (parseInt(product_cost) < 0) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Cost must be greater than or equal to 0!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_cost").focus();
			return 0;
		}
		else if (isNaN(product_cost) == true || product_cost == "" || !/\D/.test(product_cost) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Cost must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("product_cost").focus();
			return 0;
		}
		else if (!/\D/.test(product_cost) == true) {
			return 1;
		}
	}
	var v13 = () => {
		if (delivery_lat == "" || delivery_longi == "") {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please select Receiver's Address on map!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v12 = () => {
		if (rec_address == "" || rec_address == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please give Receiver's Address!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("rec_address").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v15 = () => {
		if (yesno == "" || yesno == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please Select Auto Assign Delivery To Delivery Man!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("autoAss").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var datap;

	if (v0() == 1 && v1() == 1 && v2() == 1 && v3() == 1 && v5() == 1 && v6() == 1 && v9() == 1 && v10() == 1 && v11() == 1 && v8() == 1 && v4() == 1 && v12() == 1 && v15() == 1) {
		document.getElementById('createDelivery').disabled = true;
		datap = JSON.stringify
			({
				"delivery_status": "",
				"delivery_type": delivery_type,
				"sender_address": s_address,
				"receiver_address": rec_address,
				"sender_phone_number": s_number,
				"receiver_phone_number": r_number,
				"sender_name": s_name,
				"receiver_name": r_name,
				"payment_method": payment_method,
				"delivery_charge": delivery_charge,
				"product_cost": product_cost,
				"sender_lat": pickup_lat,
				"sender_longi": pickup_longi,
				"receiver_lat": delivery_lat,
				"receiver_longi": delivery_longi,
				"product_name": product_name,
				"product_qty": product_qty,
				"pickup_time": pickup_time,
				"delivery_note": delivery_note,
				"delivery_city": deliveryCity,
				"delivery_area": area,
				"delivery_day_type": dayType ? dayType : "delivery_day_type_na",
				"delivery_product_type": productType ? productType : "delivery_product_type_na",
				"delivery_weight": weight ? weight : "delivery_weight_na",
				"delivery_distance": distance ? distance : "delivery_distance_na",
				"delivery_city_criteria": cityType ? cityType : "delivery_city_criteria_na"
			});
		//console.log(datap);
		$('#tickD2').hide();
		$(".circle-loader").show();
		$(".circle-loader").removeClass("load-complete");
		$("#sureD2X").html("");
		$("#sureD2Y").html("");
		$("#sureD2Z").html("");
		$("#sureD2").html("");
		$("#sureD22").html("");
		$.ajax
			({
				type: "POST",
				url: urlForAll + "delivery/create/" + senderGuy + '/' + yesno,
				data: datap,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					$("#myModalCreateD1").modal('show');
					$("#sureD2").html("Please wait!");
					if (data.status == 'OK') {
						//console.log(data);
						setTimeout(function () {
							removeMarkers2();
							$(".circle-loader").addClass("load-complete");
							var keys = Object.keys(data.data);
							$('#tickD2').show();
							$("#sureD2").html("Delivery Created!");
							$("#sureD22").html(`Delivery ID: <strong>${data.data.delivery_Id}</strong>`);
							if (keys[1] == 'auto_assign_done') {
								if (data.data.auto_assign_done) {
									$("#sureD2Z").html("This Delivery Has Been Auto Assigned To A Delivery Man Based On Receiver's Area and Delivery Man's Selected Area and His Availability!");
									$("#sureD2X").html(`Assigned Delivery Man Name: <strong>${data.data.assign_delivery_man_name}</strong>`);
									$("#sureD2Y").html(`Assigned Delivery Man Phone Number: <strong>${data.data.assign_delivery_man_phone}</strong>`);
									$("#sureD2X").show();
									$("#sureD2Y").show();
								}
								else {
									$("#sureD2Z").html("Sorry! No Delivery Man Found Based On Delivery Man's Selected Area and Receiver's Area!");
									$("#sureD2X").hide();
									$("#sureD2Y").hide();
								}
							}
						}, 1000);
						setTimeout(function () {

							document.getElementById('createDelivery').disabled = false;
							//$("#myModalCreateD1").modal('hide');
						}, 1000);

						recall();
					}
				},
				error: function (data) {
					document.getElementById('createDelivery').disabled = false;
					////console.log(data.responseJSON.errorMessage);
					//$('#myModal2').modal('show');
					var ob = Object.keys(data);

					$(".circle-loader").hide();
					$("#myModalCreateD1").modal('show');
					if (ob[17] == "responseJSON") {

						if (data.responseJSON.errorMessage?.includes('You can not create delivery now.')) {

							divElement.innerHTML += `You can not create delivery now. Please contact with Quixx!<br>`;
						}
						else {
							divElement.innerHTML += `${data.responseJSON.errorMessage}<br>`;
						}
						$(".circle-loader").hide();
						$("#sureD2").html("");
						$("#sureD2ZZ").html("");
						//$('#wrongSMS').html(data.responseJSON.errorMessage);
						//$('#myModalWrongSMS').modal();
						return;

					}
					else {
						$(".circle-loader").hide();
						$("#sureD2").html("");
						$("#sureD2ZZ").html("");
						divElement.innerHTML += `Something went wrong!<br>Please Wait A Bit?<br>`;
						return;
					}
				}
			})
	}
});

function convertTime24to12(time24) {
	var tmpArr = time24.split(':'), time12;
	if (+tmpArr[0] == 12) {
		time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
	}
	else {
		if (+tmpArr[0] == 00) {
			time12 = '12:' + tmpArr[1] + ' AM';
		}
		else {
			if (+tmpArr[0] > 12) {
				time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' PM';
			}
			else {
				time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
			}
		}
	}
	return time12;
}
//testing function
/*var assignKor = (del_idx) =>{
	$.ajax
	({
		async: false,
		type: "PUT",
		url: urlForAll + "delivery/assign/" + org_ID + "/" + del_idx + "/" + 15,
		
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			//console.log(`${del_idx} assigned!`);
		},
		error: function(data) {
			//console.log("Error: " + data);
		}
	});
}*/

var hello = () => {
	document.getElementById('body').style.pointerEvents = "auto";
}
var divElement = document.getElementById('sureD2Z');
var keysx = [];
var extrax1 = [];
var extrax2 = [];
var deliveryList = [];
var assignedDeliveryMan = [];
var assignedDeliveryManPhone = [];
function doIt(i, lengx) {
	setTimeout(function () {
		var senderGuyExcel = parseInt(excelData[i].Sender_ID);
		// console.log(mapMerchant.get(senderGuyExcel)?.sender_name, mapMerchant.get(senderGuyExcel), senderGuyExcel);

		if (mapMerchant.size === 0 || !mapMerchant.get(senderGuyExcel)) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender Not Available!`;
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById('CLOSEIT').disabled = false;
			hello();
			setTimeout(function () {
				$('#myModalCreateD1').modal('hide');
			}, 2500);
			return 0;
		}

		var s_name = mapMerchant.get(senderGuyExcel).sender_name;
		var s_number = mapMerchant.get(senderGuyExcel).sender_phone_number;
		var s_address = mapMerchant.get(senderGuyExcel).sender_address;
		var pickup_lat = mapMerchant.get(senderGuyExcel).sender_lat;
		var pickup_longi = mapMerchant.get(senderGuyExcel).sender_longi;
		var delivery_charge = mapMerchant.get(senderGuyExcel).per_delivery_cost;

		var r_name = excelData[i].Receiver_Name;
		var r_number = excelData[i].Receiver_Phone_Number;
		var rec_city = excelData[i].Receiver_City;
		var area = excelData[i].Receiver_Area;
		var rec_address = excelData[i].Receiver_Address;

		var product_name = excelData[i].Product_Name;
		var product_qty = excelData[i].Product_Quantity_Pieces.toUpperCase();
		var product_cost = excelData[i].Product_Cost;
		var payment_method = excelData[i].Payment_Method;
		var delivery_charge = excelData[i].Delivery_Charge;

		var autoAssDExcel = excelData[i].Auto_Assign_Delivery.toLowerCase();
		var delivery_note = excelData[i].Optional_Delivery_Note;
		var delivery_lat = "";
		var delivery_longi = "";
		var pickup_time = "";
		var delivery_type = "CUSTOMER";
		var v1 = () => {
			// if (pickup_time == "" || pickup_time == null || pickup_time == undefined) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Please give a Pickup Time!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else {
			// 	return 1;
			// }
			return 1;
		}
		var v2 = () => {
			// if (s_name == "" || s_name == null || s_name == undefined) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender Name cannot be empty!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else {
			// 	return 1;
			// }
			return 1;
		}
		var v3 = () => {
			// if (s_number == "" || s_number == null || s_number == undefined) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender's Phone Number cannot be empty!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if ((s_number.length < 11 || s_number.length > 11) && !/\D/.test(s_number) == true) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender's Phone Number must be of 11 digits!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if (s_number.match(/\d/g).length === 11 && !/\D/.test(s_number) == true) {
			// 	return 1;
			// }
			// else {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender's Phone Number not valid!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			return 1;
		}
		var v4 = () => {
			// if (s_address == "" || s_address == null || s_address == undefined) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Sender's Address cannot be empty!!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else {
			// 	return 1;
			// }
			return 1;
		}
		var v5 = () => {
			if (r_name == "" || r_name == null || r_name == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's Name cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v6 = () => {
			if (r_number == "" || r_number == null || r_number == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's Phone Number cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if ((r_number.length < 11 || r_number.length > 11) && !/\D/.test(r_number) == true) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's Phone Number must be of 11 digits!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (r_number.match(/\d/g).length === 11 && !/\D/.test(r_number) == true) {
				return 1;
			}
			else {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's Phone Number not valid!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
		}
		var v8 = () => {
			// if (parseInt(delivery_charge) < 0) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Delivery Charge must be greater than or equal to 0!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if (isNaN(delivery_charge) == true || delivery_charge == "" || delivery_charge == undefined || !/\D/.test(delivery_charge) == false) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Delivery Charge must be a number!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if (!/\D/.test(delivery_charge) == true) {
			// 	return 1;
			// }
			return 1;
		}
		var v9 = () => {
			if (product_name == "" || product_name == null || product_name == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Product Details cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v10 = () => {
			if (product_qty.toUpperCase() === "NA") {
				return 1;
			}
			else if (parseInt(product_qty) <= 0) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Product Quantity must be greater than 0!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (isNaN(product_qty) == true || product_qty == "" || product_qty == undefined || !/\D/.test(product_qty) == false) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Product Quantity must be a number!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (!/\D/.test(product_qty) == true) {
				return 1;
			}
		}
		var v11 = () => {
			if (parseInt(product_cost) < 0) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Product Cost must be greater than or equal to 0!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (isNaN(product_cost) == true || product_cost == "" || product_cost == undefined || !/\D/.test(product_cost) == false) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Product Cost must be a number!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (!/\D/.test(product_cost) == true) {
				return 1;
			}
		}
		var v22 = () => {
			if (area == "" || area == null || area == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's Area cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v12 = () => {
			if (rec_address == "" || rec_address == null || rec_address == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Please give Receiver's Address!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v17 = () => {
			if (delivery_lat == "" || delivery_longi == "" || delivery_longi == undefined || delivery_lat == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Please give Receiver's Lattitude/Longitude!!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v16 = () => {
			if (pickup_lat == "" || pickup_longi == "" || pickup_lat == undefined || pickup_longi == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Please give Sender's Lattitude/Longitude!!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var v23X = () => {
			if (rec_city == "" || rec_city == null || rec_city == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Receiver's City cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var vXPayment = () => {
			if (payment_method == "" || payment_method == null || payment_method == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Delivery No: ${i + 1} - Payment Method cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else {
				return 1;
			}
		}
		var datap;

		if (v1() == 1 && v2() == 1 && v3() == 1 && v5() == 1 && v6() == 1 && v9() == 1 && v10() == 1 && v11() == 1 && v8() == 1 && v4() == 1 && v22() == 1 && v12() == 1 && v23X() == 1 && vXPayment() == 1) {
			if (delivery_note == undefined) {
				delivery_note = "";
			}
			// if (pickup_lat == undefined) {
			// 	pickup_lat = "";
			// 	pickup_longi = "";
			// }
			// if (delivery_lat == undefined) {
			// 	delivery_lat = "";
			// 	delivery_longi = "";
			// }
			// if (pickup_time == undefined) {
			// 	pickup_time = "";
			// }
			datap = JSON.stringify
				({
					"delivery_status": "",
					"delivery_type": delivery_type,
					"sender_name": s_name,
					"sender_phone_number": s_number,
					"sender_address": s_address,
					"sender_lat": pickup_lat,
					"sender_longi": pickup_longi,
					"receiver_name": r_name,
					"receiver_phone_number": r_number,
					"delivery_city": rec_city,
					"delivery_area": area,
					"receiver_address": rec_address,
					"product_name": product_name,
					"product_qty": product_qty,
					"product_cost": product_cost,
					"payment_method": payment_method,
					"delivery_charge": delivery_charge,
					"delivery_note": delivery_note,
					"pickup_time": "",
					"receiver_lat": "",
					"receiver_longi": "",
					"delivery_day_type": "delivery_day_type_na",
					"delivery_product_type": "delivery_product_type_na",
					"delivery_weight": "delivery_weight_na",
					"delivery_distance": "delivery_distance_na",
					"delivery_city_criteria": "delivery_city_criteria_na"
				});
			// //console.log(datap);
			$.ajax
				({

					type: "POST",
					url: urlForAll + "delivery/create/" + senderGuyExcel + '/' + autoAssDExcel,
					data: datap,
					headers:
					{
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						"Authorization": 'Bearer ' + localStorage.getItem('token')
					},
					success: function (data) {
						if (i === 0) {
							document.getElementById("sureD2ZZ").innerHTML = `<br><strong style="vertical-align: text-top;">${i + 1}</strong> Delivery Created!<br>`;
						}
						else {
							document.getElementById("sureD2ZZ").innerHTML = `<br><strong style="vertical-align: text-top;">${i + 1}</strong> Deliveries Created!<br>`;
						}
						keysx[i] = Object.keys(data.data);
						extrax1[i] = data.data;
						deliveryList[i] = data.data.delivery_Id;
						var stringx = "";
						if (keysx[i][2] == 'auto_assign_done') {
							if (extrax1[i].auto_assign_done) {
								assignedDeliveryMan[i] = data.data.assign_delivery_man_name;
								assignedDeliveryManPhone[i] = data.data.assign_delivery_man_phone;
								stringx += `Delivery ID: <strong>${deliveryList[i]}</strong><br>`;
								stringx += `Assigned Delivery Man Name: <strong>${assignedDeliveryMan[i]}</strong><br>`;
								stringx += `Assigned Delivery Man Phone: <strong>${assignedDeliveryManPhone[i]}</strong><hr><br>`;
							}
							else {
								stringx += `<hr>Delivery ID: <strong>${deliveryList[i]}</strong><br>`;
								stringx += `No Delivery Man Found For Given Area!<br>`;
							}
						}
						else {
							stringx += `Delivery ID: <strong>${deliveryList[i]}</strong><br>`;
						}
						divElement.innerHTML += stringx;

						if (data.status == 'OK') {
							if (i == lengx - 1) {
								setTimeout(function () {
									document.getElementById("sureD2ZZ").innerHTML = "";
									if (i === 0) {
										$("#sureD2").html(`<strong style="vertical-align: text-top;">${i + 1}</strong> Delivery Created!`);
									}
									else {
										$("#sureD2").html(`<strong style="vertical-align: text-top;">${i + 1}</strong> Deliveries Created!`);
									}

									$(".circle-loader").addClass("load-complete");

									$('#tickD2').show();

								}, 1000);
								setTimeout(function () {

									document.getElementById('createDeliverywithExcel').disabled = false;
									//$("#myModalCreateD1").modal('hide');
								}, 3000);
								document.getElementById('CLOSEIT').disabled = false;
								document.getElementById('body').style.pointerEvents = "auto";
								hello();
							}
							else {
								doIt(++i, lengx);
							}
						}
					},
					error: function (data) {

						document.getElementById('body').style.pointerEvents = "auto";
						document.getElementById('createDeliverywithExcel').disabled = false;
						document.getElementById('CLOSEIT').disabled = false;
						////console.log(data.responseJSON.errorMessage);
						////console.log(data);
						var ob = Object.keys(data);
						if (ob[17] == "responseJSON") {

							if (data.responseJSON.errorMessage?.includes('You can not create delivery now.')) {

								divElement.innerHTML += `You can not create delivery now. Please contact with Quixx!<br>`;
							}
							else {
								divElement.innerHTML += `${data.responseJSON.errorMessage}<br>`;
							}
							$(".circle-loader").hide();
							$("#sureD2").html("");
							$("#sureD2ZZ").html("");
							//$('#wrongSMS').html(data.responseJSON.errorMessage);
							//$('#myModalWrongSMS').modal();
							return;

						}
						else {
							$(".circle-loader").hide();
							$("#sureD2").html("");
							$("#sureD2ZZ").html("");
							divElement.innerHTML += `Something went wrong!<br>Please Wait A Bit?<br>`;
							return;
						}
					}
				})
		}
	}, 100);
}
document.getElementById("createDeliverywithExcel").addEventListener("click", function (event) {
	divElement.innerHTML = "";
	if (flag == true) {
		$('#tickD2').hide();
		$(".circle-loader").show();
		$(".circle-loader").removeClass("load-complete");
		$("#sureD2").html("");
		$("#myModalCreateD1").modal('show');
		$("#sureD2").html("Please wait!");
		$("#sureD2Z").html("");
		document.getElementById("CLOSEIT").disabled = true;
		//document.getElementById('body').style.pointerEvents = "none";

		var lengx = excelData.length;
		setTimeout(function () {
			doIt(0, lengx);
		}, 1000);
	}
	else {
		document.getElementById('wrongThisUpload2').innerHTML = "Please Upload An Excel File!";
		$('#myModalWrongUpload2').modal('show');
	}
});

//Auto Assign - Unassigned Delivery!!!!!
function getSelectOptions(value) {
	var select = $(`<select>${this_select_content}</select>`);
	if (value) {
		select.val(value).find(':selected').attr('selected', true);
	}
	return select.html();
}

var counterChecked;
var tableForAuto;
document.getElementById("assignAllDeliveries").addEventListener("click", function (event) {
	counterChecked = 0;
	document.getElementById('modalAssignAll').disabled = false;
	$("#circleHide").hide();
	$("#tickAssignAll").hide();
	$("#sureAssignAllAssigned2").hide();
	$("#sureAssignAll").hide();
	$("#sureAssignAllAssigned").hide();
	$("#hideAUTO").show();
	tableForAuto = $('#dtBasicExampledAuto').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"paging": true,
		"deferRender": true,
		"pagingType": "full_numbers",
		"paging": false,
		"destroy": true,
		"ajax":
		{
			"url": urlForAll + "delivery/auto/assign/all/" + org_ID,
			"type": "GET",
			"headers":
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			"dataSrc": "data"
		},
		"infoCallback": function (settings, start, end, max, total, pre) {

			return "";
		},
		"columns": [
			{
				"class": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": "<i class='fa fa fa-chevron-circle-right'></i>"
			},
			{

				"orderable": false, "targets": 15, "data": "select",
				"render": function (data, type, row, meta) {
					return `<input class="checks" type="checkbox" name="mycheckboxesAuto" value=${row.delivery_Id}>`;
				}
			},
			{ "targets": 16, "data": "delivery_Id" },
			{

				"orderable": false, "targets": 1, "data": "update",
				"render": function (data, type, row, meta) {
					return `<select class='browser-default custom-select2' id=auto${row.delivery_Id} style='text-align-last:center;' data-col=${meta.col}>
							${getSelectOptions(row.assign_delivery_man_id)}</select>`;
				}
			},
			{ "targets": 11, "data": "product_name" },
			{ "targets": 12, "data": "product_qty" },
			{ "targets": 13, "data": "product_cost" },
			{ "targets": 14, "data": "delivery_charge" },
			{ "targets": 15, "data": "payment_method" }
		],
		"order": [[2, 'asc']]
	});
	tableForAuto.on('xhr', function () {
		//var json = table.ajax.json();
		//document.getElementById('oneb').innerHTML = 'Unassigned Deliveries: ' + json.recordsTotal;
		//document.getElementById('body').style.pointerEvents = "auto";
	});
	tableForAuto.clear().draw();
	$('#dtBasicExampledAuto tbody').off('click', 'td.details-control');
	$('#dtBasicExampledAuto tbody').on('click', 'td.details-control', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var table = $('#dtBasicExampledAuto').DataTable();
		var row = table.row(tr);
		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(formatUnassigned(row.data())).show();
			tr.addClass('shown');
			tdColspan();
		}
	});
	dataTableStyle();
	$('#modalAssignAll').prop("disabled", true)
	$('#myModalAuto').modal('show');
});

document.getElementById('product_qty').addEventListener("keyup", function (e) {
	if (e.target.value.toUpperCase() === "NA") {
		document.querySelector("#product_cost").offsetParent.childNodes[5].firstChild.textContent = "Total Amount [BDT]:";
	}
	else {
		document.querySelector("#product_cost").offsetParent.childNodes[5].firstChild.textContent = "Per Product Cost [BDT]:";
	}
});

document.getElementById('product_qtyU').addEventListener("keyup", function (e) {
	if (e.target.value.toUpperCase() === "NA") {
		document.querySelector("#product_costU").offsetParent.childNodes[5].firstChild.textContent = "Total Amount [BDT]:";
	}
	else {
		document.querySelector("#product_costU").offsetParent.childNodes[5].firstChild.textContent = "Per Product Cost [BDT]:";
	}
});
document.getElementById('product_qtyUR').addEventListener("keyup", function (e) {
	if (e.target.value.toUpperCase() === "NA") {
		document.querySelector(".pqp").textContent = "Total Amount [BDT]:";
	}
	else {
		document.querySelector(".pqp").textContent = "Per Product Cost [BDT]:";
	}
});

var abtn = document.querySelector('#btnAuto');
abtn.onclick = checkAll;

function uncheckAll(event) {
	event.preventDefault();
	check(false);
	// reassign click event handler
	$('#modalAssignAll').prop("disabled", true);
	this.onclick = checkAll;
}

function checkAll(event) {
	event.preventDefault();
	check();
	$('#modalAssignAll').prop("disabled", false);
	// reassign click event handler
	this.onclick = uncheckAll;
}

function check(checked = true) {
	const cbs = document.querySelectorAll('input[name="mycheckboxesAuto"]');

	cbs.forEach((cb) => {
		cb.checked = checked;
	});
}

$('#dtBasicExampledAuto').on('change', 'input[type="checkbox"]', function () {

	var checkedBoxesA = document.querySelectorAll('input[name=mycheckboxesAuto]:checked');
	var l = checkedBoxesA.length;
	if (l > 0) {
		$('#modalAssignAll').prop("disabled", false);
	}
	else {
		$('#modalAssignAll').prop("disabled", true);
	}

});
var deliveryAutoID = [], deliveryAutoDeliveryMan = [], deliveryAutoIterator = 0;
document.getElementById("modalAssignAll").addEventListener("click", function (event) {

	deliveryAutoID = [];
	deliveryAutoDeliveryMan = [];
	deliveryAutoIterator = 0;

	tableForAuto.rows().nodes().to$().find('input[type="checkbox"]').each(function () {
		if (this.checked) {
			deliveryAutoID[deliveryAutoIterator] = this.value;
			deliveryAutoDeliveryMan[deliveryAutoIterator++] = document.getElementById(`auto${this.value}`).value;
		}
	});
	$("#hideAUTO").hide();
	$("#circleHide").removeClass("load-complete");
	$("#circleHide").show();
	$("#sureAssignAllAssigned2").show();
	$("#sureAssignAllAssigned2").html("");
	$("#sureAssignAll").html("Please wait!");
	$("#sureAssignAllAssigned").html("");
	$("#sureAssignAll").show();
	$("#sureAssignAllAssigned").show();
	document.getElementById('sureAssignAllAssigned2').innerHTML = "";
	document.getElementById('closeModalAssignAll').disabled = true;
	document.getElementById('modalAssignAll').disabled = true;
	setTimeout(function () {
		autoAssignDeliveryManUnassingedTable(0);
	}, 10);
});

function autoAssignDeliveryManUnassingedTable(ddeliveryAutoIterator) {

	setTimeout(function () {
		$.ajax
			({

				type: "PUT",
				url: urlForAll + "delivery/assign/" + org_ID + "/" + deliveryAutoID[ddeliveryAutoIterator] + "/" + deliveryAutoDeliveryMan[ddeliveryAutoIterator],

				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					if (ddeliveryAutoIterator == 0) {
						$("#sureAssignAllAssigned").html(`<strong>${ddeliveryAutoIterator + 1}</strong> Delivery Assigned!`);
					}
					else {
						$("#sureAssignAllAssigned").html(`<strong>${ddeliveryAutoIterator + 1}</strong> Deliveries Assigned!`);
					}
					document.getElementById('sureAssignAllAssigned2').innerHTML += `Delivery ID: <strong>${deliveryAutoID[ddeliveryAutoIterator]}</strong> Assigned<br><hr>`;
					if (ddeliveryAutoIterator == deliveryAutoIterator - 1) {

						setTimeout(function () {
							$("#circleHide").addClass("load-complete");

							$('#tickAssignAll').show();

							$("#sureAssignAll").html("Delivery man assigned to the selected deliveries!");
						}, 900);

						document.getElementById('closeModalAssignAll').disabled = false;
						//document.getElementById('modalAssignAll').disabled = false;
					}
					else {
						autoAssignDeliveryManUnassingedTable(++ddeliveryAutoIterator);
					}
				},
				error: function (data) {
					document.getElementById('closeModalAssignAll').disabled = false;
					//document.getElementById('modalAssignAll').disabled = false;
					var ob = Object.keys(data);
					if (ob[17] == "responseJSON") {

						$('#wrongSMS').html(data.responseJSON.errorMessage);
						$('#myModalWrongSMS').modal();
						$('#myModalAuto').modal('hide');
					}
					else {
						$('#myModal').modal('hide');
						$('#myModal2').modal();
					}
				}
			});
	}, 10);
}

var arr;
var id_delivery_update, del_id, creator_ID;

$("#delivery_cityU").on("change", function () {
	$('#managersU')
		.empty()
		.append('<option value="">---</option>');
	var value = $(this).val();
	url = urlForAll + "approved/delivery/upazila/" + value;
	if (value === "Dhaka") {
		url = urlForAll + "approved/delivery/thana/Dhaka";
	}
	if (value === "Cox's Bazar") {
		url = urlForAll + "approved/delivery/upazila/Cox'sBazar";
	}
	value ? thanaUpazilla(url) : null;
});

async function thanaUpazilla(url, areaa = null) {
	$('#managersU')
		.empty()
		.append('<option value="">---</option>');
	await $.ajax
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
				var j = 0;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					if (areaa == data.data[i]) {
						j = i;
					}
					$("#managersU").append(option);
				}
				document.getElementById('managersU').selectedIndex = j + 1; //area
			}
		});
}

async function cityChange(cityy, areaa) {
	var cityIndex;
	$("#delivery_cityU")
		.empty()
		.append('<option value="">---</option>');
	$('#managersU')
		.empty()
		.append('<option value="">---</option>');
	cityy ? url = urlForAll + "approved/delivery/upazila/" + cityy : null;
	if (cityy === "Dhaka") {
		url = urlForAll + "approved/delivery/thana/Dhaka";
	}
	if (cityy === "Cox's Bazar") {
		url = urlForAll + "approved/delivery/upazila/Cox'sBazar";
	}
	await $.ajax
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
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i] === cityy) {
						cityIndex = i;
					}
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#delivery_cityU").append(option);
				}
				cityy ? document.getElementById('delivery_cityU').selectedIndex = cityIndex + 1 : null;
			}
		});
	cityy ? await thanaUpazilla(url, areaa) : null;
}


var thikKoro = async (method, areaa, cityy) => {

	$('#delivery_cityU')
		.empty();
	await cityChange(cityy, areaa);

	$('#managers2U')
		.empty();
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
				var k;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					if (method == data.data[i]) {
						k = i;
					}
					$("#managers2U").append(option);
				}
				document.getElementById('managers2U').selectedIndex = k; //area
			}
		});
}
var criteriaMapForDeliveryUpdate = new Map();

var thikKoroCriteria = async (creator_ID, ...typeList) => {
	await $.ajax({
		url: urlForAll + "delivery/criteria/enable/" + creator_ID,
		type: "GET",
		headers:
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function (data) {
			criteriaEnabledDelivery = data.data;
		}
	});
	if (criteriaEnabledDelivery) {
		$('.criteriaU')
			.show();
		$('#dayType1U')
			.hide();
		$('#productType1U')
			.hide();
		$('#productWeight1U')
			.hide();
		$('#productDistance1U')
			.hide();
		$('#productCity1U')
			.hide();

		$('#dayTypeU')
			.empty();
		$('#productTypeU')
			.empty();
		$('#productWeightU')
			.empty();
		$('#productDistanceU')
			.empty();
		$('#productCityU')
			.empty();
		$.ajax
			({
				url: urlForAll + "delivery/criteria/active/" + creator_ID,
				type: "GET",

				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					let naValuesType = ["dayType", "productType", "productWeight", "productDistance", "productCity"];
					let naValues = ["delivery_day_type_na", "delivery_product_type_na", "delivery_weight_na", "delivery_distance_na", "delivery_city_criteria_na"];
					if (criteriaMapForDeliveryUpdate.size) {
						criteriaMapForDeliveryUpdate.clear();
					}
					Object.keys(data.data).map((types, index) => {
						//console.log(types);
						let mapObj = {};
						// $(`#${types}1U`).show();
						// $(`#${types}U`)
						// 	.append('<option value="' + naValues[index] + '">---</option>')
						// 	;
						// j = 0;
						// data.data[types].map((value, ind) => {
						// 	if (value === typeList[index]) {
						// 		j = ind;
						// 		j++;
						// 	}
						// 	//console.log(value, typeList[index]);
						// 	var option = new Option(value, value);
						// 	$(option).html(value);
						// 	$(`#${types}U`).append(option);
						// });

						if (types !== "userId") {
							let typ = naValuesType.indexOf(types);
							$(`#${types}1U`).show();
							$(`#${types}U`)
								.empty()
								.append('<option value="' + naValues[typ] + '">---</option>')
								;
							j = 0;
							Object.keys(data.data[types]).map((value, ind) => {
								//console.log(value, typeList[typ]);
								if (value === typeList[typ]) {
									j = ind;
									document.getElementById('delivery_cost_update').disabled = true;
									j++;
								}
								var option = new Option(value, value);
								$(option).html(value);
								$(`#${types}U`).append(option);
							});

							mapObj = { [naValues[typ]]: "", ...data.data[types] };
							criteriaMapForDeliveryUpdate.set(types, mapObj);

							//console.log(mapObj, criteriaMapForDeliveryUpdate);
							document.getElementById(`${types}U`).selectedIndex = j;
						}
					});
					if (Object.keys(data.data).length === 1) {
						$('.criteriaU')
							.hide();
					}
				}
			});
	}
	else {
		$('.criteriaU')
			.hide();
		document.getElementById('delivery_cost_update').disabled = false;

		$('#dayTypeU')
			.empty();
		$('#productTypeU')
			.empty();
		$('#productWeightU')
			.empty();
		$('#productDistanceU')
			.empty();
		$('#productCityU')
			.empty();
	}
}

function setDynSelecChangeForUpdate() {
	naValuesType.map(item => {
		document.querySelector(`select#${item}U`).addEventListener('change', function (e) {
			wrongKeteDao();
			if (item !== "dayType" && item !== "productCity") {
				let obj = criteriaMapForDeliveryUpdate.get(item);
				//console.log(obj[e.target.value]);
				if (/^\d+$/.test(obj[e.target.value])) {
					document.getElementById('delivery_cost_update').value = obj[e.target.value];
					document.getElementById('delivery_cost_update').disabled = true;
					document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
				}
				else {
					document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]:";
					document.getElementById('delivery_cost_update').disabled = false;
					document.getElementById('delivery_cost_update').value = modalCostPerMerchant;
				}
			}
			else {
				//console.log("Hello");
				let objDayType = criteriaMapForDeliveryUpdate.get("dayType");
				let objProductCity = criteriaMapForDeliveryUpdate.get("productCity");
				let dayType = document.querySelector(`select#dayTypeU`).value;
				let productCity = document.querySelector(`select#productCityU`).value;
				//console.log(dayType, productCity);

				//console.log(objDayType?.[dayType], objProductCity?.[productCity]);

				//console.log((/^\d+$/.test(objDayType?.[dayType])));
				//console.log((/^\d+$/.test(objProductCity?.[productCity])));

				if (/^\d+$/.test(objDayType?.[dayType]) && /^\d+$/.test(objProductCity?.[productCity])) {
					document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
					document.getElementById('delivery_cost_update').disabled = true;
					document.getElementById('delivery_cost_update').value = Math.max(objDayType?.[dayType], objProductCity?.[productCity]);
				}
				else {
					if (objDayType?.[dayType] || objDayType?.[dayType] === 0) {
						document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
						document.getElementById('delivery_cost_update').value = objDayType[dayType];
						document.getElementById('delivery_cost_update').disabled = true;
					}
					else if (objProductCity?.[productCity] || objProductCity?.[productCity] === 0) {
						document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
						document.getElementById('delivery_cost_update').value = objProductCity[productCity];
						document.getElementById('delivery_cost_update').disabled = true;
					}
					else {
						document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]:";
						document.getElementById('delivery_cost_update').value = modalCostPerMerchant;
						document.getElementById('delivery_cost_update').disabled = false;
					}
				}
			}
		});
	});
}

var wrongKeteDao = () => {
	$('#wrongmaplocation').hide();
	$('#wrongpercost').hide();
	$('#wrongrpqty').hide();
	$('#wrongpname').hide();
	$('#wrongmaplocation').hide();
	$('#wrongrphone').hide();
	$('#wrongrname').hide();
	$('#wrongTime').hide();
	$('#wrongdcost').hide();
	$('#wrongraddress').hide();
}

var l = 0, modalCostPerMerchant = 0, rowNumber = null;
$('#dtBasicExampled').on('click', '.updateCh', function () {
	id_delivery_update = $(this).attr('id');
	arr = [];
	url = "";
	// rowNumber = $(this).closest('tr').index();
	// //console.log($(this).closest('tr').index(), $(this).closest('tr'), $(this).closest('tr').data(), $(this).closest('tr').hasClass("shown"));
	arr = id_delivery_update.split('$$');
	// if ($(this).closest('tr').hasClass("shown")) {
	// 	document.querySelector(`#dtBasicExampled tbody tr:nth-child(${rowNumber})`).classList.remove("shown");
	// 	document.querySelector(`#dtBasicExampled tbody tr:nth-child(${rowNumber})`).remove();
	// }
	del_id = arr[0];
	document.querySelector("#updateSenId").innerHTML = `Delivery ID: <strong>${arr[0]}</strong> & Sender: <strong>${arr[15]}</strong>`;
	document.querySelector("#updateSenId").style.fontSize = `0.95rem`;
	creator_ID = arr[1];
	thikKoro(arr[8], arr[11], arr[26]);
	document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]:";
	document.getElementById('delivery_cost_update').disabled = false;
	thikKoroCriteria(creator_ID, arr[29], arr[27], arr[28], arr[30], arr[31]);
	////console.log(arr);
	modalCostPerMerchant = arr[2];
	setDynSelecChangeForUpdate();
	document.getElementById('delivery_cost_update').value = arr[2];
	document.getElementById('timeU').value = arr[3];
	document.getElementById('r_nameU').value = arr[4];
	document.getElementById('r_numberU').value = arr[5];
	document.getElementById('product_nameU').value = arr[6];
	document.getElementById('product_qtyU').value = arr[7];

	if (arr[7].toUpperCase() === "NA") {
		document.querySelector("#product_costU").parentElement.childNodes[0].textContent = "Total Amount [BDT]:";
	}
	else {
		document.querySelector("#product_costU").parentElement.childNodes[0].textContent = "Per Product Cost [BDT]:";
	}

	document.getElementById('managers2U').value = arr[8]; //payment method
	document.getElementById('product_costU').value = arr[9];
	document.getElementById('DELIVERY_NOTEU').value = arr[10];
	document.getElementById('managersU').value = arr[11]; //area
	document.getElementById('pac-input3').value = arr[12];
	document.getElementById('rec_addressU').value = arr[12];
	document.getElementById('des_latU').value = arr[13];
	document.getElementById('des_longiU').value = arr[14];
	document.getElementById('delivery_cityU').value = arr[26];
	document.getElementById('productTypeU').value = arr[27];
	document.getElementById('productWeightU').value = arr[28];
	document.getElementById('dayTypeU').value = arr[29];
	document.getElementById('productDistanceU').value = arr[30];
	document.getElementById('productCityU').value = arr[31];

	if (markerx.length > 0) {
		removeMarkers3();
		markerx[1].setMap(null);
	}
	markerx[1] = new google.maps.Marker({
		position: new google.maps.LatLng(arr[13], arr[14]),
		map: window.map,
	});

	const center = new google.maps.LatLng(arr[13], arr[14]);
	window.map.setZoom(16);
	window.map.panTo(center);

	$t = $(this);
	$("#formUpdateDC").show();
	$('#tick3DC').hide();
	$("#circleLoad3DC").hide();
	$("#sure3DC").hide();
	$("#myModalDeliveryCostUpdate").modal('show');
	google.maps.event.trigger(map3, "resize");
	google.maps.event.trigger(window.map, "resize");
	wrongKeteDao();
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok-updateDC').on("click", function () {
	wrongKeteDao();
	var delivery_cost_update = document.getElementById('delivery_cost_update').value;
	var pickup_time = document.getElementById('timeU').value;
	var s_name = arr[15];
	var s_number = arr[16];
	var s_address = arr[17];
	var r_name = document.getElementById('r_nameU').value;
	var r_number = document.getElementById('r_numberU').value;
	var r_address = document.getElementById('pac-input3').value;
	var rec_address = document.getElementById('rec_addressU').value;
	var payment_method = document.getElementById('managers2U').value;
	var delivery_note = document.getElementById('DELIVERY_NOTEU').value;
	var delivery_type = arr[18];
	var area = String(document.getElementById('managersU').value);
	var deliveryCity = String(document.getElementById('delivery_cityU').value);
	var pickup_lat = String(arr[19]);
	var pickup_longi = String(arr[20]);
	var delivery_lat = String(document.getElementById('des_latU').value);
	var delivery_longi = String(document.getElementById('des_longiU').value);
	var product_name = String(document.getElementById('product_nameU').value);
	var product_qty = String(document.getElementById('product_qtyU').value.toUpperCase());
	var product_cost = document.getElementById('product_costU').value;
	var created_date = arr[21];
	var created_by_name = arr[22];
	var created_by_role = arr[23];
	var collection_name = arr[24];
	var delivery_statusx = arr[25];
	var dayType = document.getElementById('dayTypeU').value;
	var productType = document.getElementById('productTypeU').value;
	var distance = document.getElementById('productDistanceU')?.value;
	var weight = document.getElementById('productWeightU').value;
	var cityType = document.getElementById('productCityU').value;
	var v0 = () => {
		if (parseInt(delivery_charge) < 0) {
			document.getElementById('wrongdcost').innerHTML = "Delivery Charge must be greater than or equal to 0!";
			$('#wrongdcost').show();
			document.getElementById("delivery_chargeQ").focus();
			return 0;
		}
		else if (isNaN(delivery_cost_update) == true || delivery_cost_update == "" || !/\D/.test(delivery_cost_update) == false) {
			document.getElementById('wrongdcost').innerHTML = "Delivery Charge must be a number!";
			$('#wrongdcost').show();
			document.getElementById("delivery_cost_update").focus();
			return 0;
		}
		else if (!/\D/.test(delivery_cost_update) == true) {
			return 1;
		}
	}
	var v1 = () => {
		// if (pickup_time == "" || pickup_time == null) {
		// 	document.getElementById('wrongTime').innerHTML = "Please give a Pickup Time!";
		// 	$('#wrongTime').show();
		// 	document.getElementById("timeU").focus();
		// 	return 0;
		// }
		// else {
		// 	return 1;
		// }
		return 1;
	}
	var v2 = () => {
		if (s_name == "" || s_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender Name cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (s_number == "" || s_number == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number cannot be empty!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else if ((s_number.length < 11 || s_number.length > 11) && !/\D/.test(s_number) == true) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number must be of 11 digits!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else if (s_number.match(/\d/g).length === 11 && !/\D/.test(s_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Phone Number not valid!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
	}
	var v4 = () => {
		if (s_address == "" || s_address == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Sender's Address cannot be empty!!";
			$('#myModalWrongDeliveryCreate').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v5 = () => {
		if (r_name == "" || r_name == null) {
			document.getElementById('wrongrname').innerHTML = "Receiver's Name cannot be empty!";
			$('#wrongrname').show();
			document.getElementById("r_nameU").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v6 = () => {
		if (r_number == "" || r_number == null) {
			document.getElementById('wrongrphone').innerHTML = "Receiver's Phone Number cannot be empty!";
			$('#wrongrphone').show();
			document.getElementById("r_numberU").focus();
			return 0;
		}
		else if ((r_number.length < 11 || r_number.length > 11) && !/\D/.test(r_number) == true) {
			document.getElementById('wrongrphone').innerHTML = "Receiver's Phone Number must be of 11 digits!";
			$('#wrongrphone').show();
			document.getElementById("r_numberU").focus();
			return 0;
		}
		else if (r_number.match(/\d/g).length === 11 && !/\D/.test(r_number) == true) {
			return 1;
		}
		else {
			document.getElementById('wrongrphone').innerHTML = "Receiver's Phone Number not valid!";
			$('#wrongrphone').show();
			document.getElementById("r_numberU").focus();
			return 0;
		}
	}
	var v7 = () => {
		if (r_address == "" || r_address == null) {
			document.getElementById('wrongmaplocation').innerHTML = "Receiver's Address on map cannot be empty!";
			$('#wrongmaplocation').show();
			document.getElementById("pac-input3").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v9 = () => {
		if (product_name == "" || product_name == null) {
			document.getElementById('wrongpname').innerHTML = "Product Details cannot be empty!";
			$('#wrongpname').show();
			document.getElementById("product_nameU").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v10 = () => {
		if (product_qty.toUpperCase() === "NA") {
			return 1;
		}
		if (parseInt(product_qty) <= 0) {
			document.getElementById('wrongrpqty').innerHTML = "Product Quantity must be greater than 0!";
			$('#wrongrpqty').show();
			document.getElementById("product_qtyU").focus();
			return 0;
		}
		else if (isNaN(product_qty) == true || product_qty == "" || !/\D/.test(product_qty) == false) {
			document.getElementById('wrongrpqty').innerHTML = "Product Quantity must be a number!";
			$('#wrongrpqty').show();
			document.getElementById("product_qtyU").focus();
			return 0;
		}
		else if (!/\D/.test(product_qty) == true) {
			return 1;
		}
	}
	var v11 = () => {
		if (parseInt(product_cost) < 0) {
			document.getElementById('wrongpercost').innerHTML = "Product Cost must be greater than or equal to 0!";
			$('#wrongpercost').show();
			document.getElementById("product_costU").focus();
			return 0;
		}
		else if (isNaN(product_cost) == true || product_cost == "" || !/\D/.test(product_cost) == false) {
			document.getElementById('wrongpercost').innerHTML = "Product Cost must be a number!";
			$('#wrongpercost').show();
			document.getElementById("product_costU").focus();
			return 0;
		}
		else if (!/\D/.test(product_cost) == true) {
			return 1;
		}
	}
	var v13 = () => {
		if (delivery_lat == "" || delivery_longi == "") {
			document.getElementById('wrongmaplocation').innerHTML = "Please select Receiver's Address on map!";
			$('#wrongmaplocation').show();
			document.getElementById("pac-input3").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v12 = () => {
		if (rec_address == "" || rec_address == null) {
			document.getElementById('wrongraddress').innerHTML = "Please give Receiver's Address!";
			$('#wrongraddress').show();
			document.getElementById("rec_addressU").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var datap = JSON.stringify
		({
			"collection_name": collection_name,
			"creator_id": creator_ID,
			"delivery_charge": delivery_cost_update,
			"delivery_type": delivery_type,
			"sender_address": s_address,
			"receiver_address": rec_address,
			"sender_phone_number": s_number,
			"receiver_phone_number": r_number,
			"sender_name": s_name,
			"receiver_name": r_name,
			"payment_method": payment_method,
			"product_cost": product_cost,
			"sender_lat": pickup_lat,
			"sender_longi": pickup_longi,
			"receiver_lat": delivery_lat,
			"receiver_longi": delivery_longi,
			"product_name": product_name,
			"product_qty": product_qty,
			"pickup_time": pickup_time,
			"delivery_note": delivery_note,
			"delivery_area": area,
			"delivery_created_date": created_date,
			"delivery_created_by_name": created_by_name,
			"delivery_created_by_role": created_by_role,
			"delivery_status": delivery_statusx,
			"delivery_city": deliveryCity,
			"delivery_day_type": dayType ? dayType : "delivery_day_type_na",
			"delivery_product_type": productType ? productType : "delivery_product_type_na",
			"delivery_weight": weight ? weight : "delivery_weight_na",
			"delivery_distance": distance ? distance : "delivery_distance_na",
			"delivery_city_criteria": cityType ? cityType : "delivery_city_criteria_na"
		});
	// console.log(datap);
	if (v1() == 1 && v2() == 1 && v3() == 1 && v5() == 1 && v6() == 1 && v9() == 1 && v10() == 1 && v11() == 1 && v0() == 1 && v4() == 1 && v12() == 1) {

		document.getElementById('modalApproveDC').disabled = true;
		document.getElementById('modalCancelDC').disabled = true;
		$('.btn-ok-updateDC').attr('disabled', true);
		$('.cancelModDC').prop('disabled', true);
		$("#formUpdateDC").hide();
		$(".circle-loader").removeClass("load-complete");
		$(".circle-loader").show();
		$("#sure3DC").html("Please wait!");
		$("#sure3DC").show();
		$.ajax
			({
				type: "PUT",
				url: urlForAll + "delivery/update/full/" + org_ID + "/" + creator_ID + "/" + del_id,
				data: JSON.stringify
					({
						"collection_name": collection_name,
						"creator_id": creator_ID,
						"delivery_charge": delivery_cost_update,
						"delivery_type": delivery_type,
						"sender_address": s_address,
						"receiver_address": rec_address,
						"sender_phone_number": s_number,
						"receiver_phone_number": r_number,
						"sender_name": s_name,
						"receiver_name": r_name,
						"payment_method": payment_method,
						"product_cost": product_cost,
						"sender_lat": pickup_lat,
						"sender_longi": pickup_longi,
						"receiver_lat": delivery_lat,
						"receiver_longi": delivery_longi,
						"product_name": product_name,
						"product_qty": product_qty,
						"pickup_time": pickup_time,
						"delivery_note": delivery_note,
						"delivery_area": area,
						"delivery_city": deliveryCity,
						"delivery_created_date": created_date,
						"delivery_created_by_name": created_by_name,
						"delivery_created_by_role": created_by_role,
						"delivery_status": delivery_statusx,
						"delivery_day_type": dayType ? dayType : "delivery_day_type_na",
						"delivery_product_type": productType ? productType : "delivery_product_type_na",
						"delivery_weight": weight ? weight : "delivery_weight_na",
						"delivery_distance": distance ? distance : "delivery_distance_na",
						"delivery_city_criteria": cityType ? cityType : "delivery_city_criteria_na"
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					//console.log(data);
					var table = $('#dtBasicExampled').DataTable();
					try {
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 4 }).data(data.data.pickup_time);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(data.data.receiver_name);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(data.data.receiver_phone_number);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 10 }).data(data.data.delivery_city);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 11 }).data(data.data.delivery_area);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 12 }).data(data.data.receiver_address);
						//table.cell({ row: table.row($t.closest('tr')).index(), column: 2 }).data(data.data.product_name);
						//table.cell({ row: table.row($t.closest('tr')).index(), column: 3 }).data(data.data.product_qty);
						//table.cell({ row: table.row($t.closest('tr')).index(), column: 4 }).data(data.data.product_cost);

						// if (criteriaEnabledDelivery) {
						// 	data.data.delivery_product_type ? table.cell({ row: table.row($t.closest('tr')).index(), column: 17 }).data(data.data.delivery_product_type) : null;
						// 	data.data.delivery_weight ? table.cell({ row: table.row($t.closest('tr')).index(), column: 18 }).data(data.data.delivery_weight) : null;
						// 	data.data.delivery_day_type ? table.cell({ row: table.row($t.closest('tr')).index(), column: 19 }).data(data.data.delivery_day_type) : null;
						// 	data.data.delivery_distance ? table.cell({ row: table.row($t.closest('tr')).index(), column: 20 }).data(data.data.delivery_distance) : null;
						// 	data.data.delivery_city_criteria ? table.cell({ row: table.row($t.closest('tr')).index(), column: 21 }).data(data.data.delivery_city_criteria) : null;
						// }

						//table.cell({ row: table.row($t.closest('tr')).index(), column: 5 }).data(data.data.delivery_charge);
						//table.cell({ row: table.row($t.closest('tr')).index(), column: 6 }).data(data.data.payment_method);
						table.row($t.closest('tr')).data(data.data);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 24 }).data(data.data.delivery_note);
						//table.cell({row:table.row($t.closest('tr')).index(), column:19}).data('<button id="' + data.data.delivery_Id + '" class="btn-round btn-outline btn assignIt" style="font-size:13px">Assign</button>');
						//table.cell({row:table.row($t.closest('tr')).index(), column:20}).data('<button id="' + data.data.delivery_Id + '$$' + data.data.creator_id + '$$' + data.data.delivery_charge + '$$' + data.data.pickup_time + '$$' + data.data.receiver_name + '$$' + data.data.receiver_phone_number + '$$' + data.data.product_name + '$$' + data.data.product_qty + '$$' + data.data.payment_method + '$$' + data.data.product_cost + '$$' + data.data.delivery_note + '$$' + data.data.delivery_area + '$$' + data.data.receiver_address + '$$' + data.data.receiver_lat + '$$' + data.data.receiver_longi + '$$' + data.data.sender_name + '$$' + data.data.sender_phone_number + '$$' + data.data.sender_address + '$$' + data.data.delivery_type + '$$' + data.data.sender_lat + '$$' + data.data.sender_longi+  '$$' + data.data.delivery_created_date+  '$$' + data.data.delivery_created_by_name+  '$$' + data.data.delivery_created_by_role + '$$' + data.data.collection_name + '$$' + data.data.delivery_status + '" class="btn-round btn-outline btn updateCh" style="font-size:13px">Update Delivery</button>');
						//table.cell({row:table.row($t.closest('tr')).index(), column:21}).data('<button id="' + org_ID + '" name="' + data.data.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoiceUnass(this)">Invoice</button>');
						//document.getElementById(`${id_delivery_update}`).id = data.data.delivery_Id + '$$' + data.data.creator_id + '$$' + data.data.delivery_charge + '$$' + data.data.pickup_time + '$$' + data.data.receiver_name + '$$' + data.data.receiver_phone_number + '$$' + data.data.product_name + '$$' + data.data.product_qty + '$$' + data.data.payment_method + '$$' + data.data.product_cost + '$$' + data.data.delivery_note + '$$' + data.data.delivery_area + '$$' + data.data.receiver_address + '$$' + data.data.receiver_lat + '$$' + data.data.receiver_longi + '$$' + data.data.sender_name + '$$' + data.data.sender_phone_number + '$$' + data.data.sender_address + '$$' + data.data.delivery_type + '$$' + data.data.sender_lat + '$$' + data.data.sender_longi + '$$' + data.data.delivery_created_date + '$$' + data.data.delivery_created_by_name + '$$' + data.data.delivery_created_by_role + '$$' + data.data.collection_name + '$$' + data.data.delivery_status + '$$' + data.data.delivery_city + '$$' + data.data.delivery_product_type + '$$' + data.data.delivery_weight + '$$' + data.data.delivery_day_type + '$$' + data.data.delivery_distance + '$$' + data.data.delivery_city_criteria;
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 4 }).data(data.data.pickup_time);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 8 }).data(data.data.receiver_name);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 9 }).data(data.data.receiver_phone_number);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 10 }).data(data.data.delivery_city);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 11 }).data(data.data.delivery_area);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 12 }).data(data.data.receiver_address);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 14 }).data(data.data.product_name);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 15 }).data(data.data.product_qty);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 16 }).data(data.data.product_cost);

						// if (criteriaEnabledDelivery) {
						// 	data.data.delivery_product_type ? table.cell({ row: table.row($t.closest('tr')).index(), column: 17 }).data(data.data.delivery_product_type) : null;
						// 	data.data.delivery_weight ? table.cell({ row: table.row($t.closest('tr')).index(), column: 18 }).data(data.data.delivery_weight) : null;
						// 	data.data.delivery_day_type ? table.cell({ row: table.row($t.closest('tr')).index(), column: 19 }).data(data.data.delivery_day_type) : null;
						// 	data.data.delivery_distance ? table.cell({ row: table.row($t.closest('tr')).index(), column: 20 }).data(data.data.delivery_distance) : null;
						// 	data.data.delivery_city_criteria ? table.cell({ row: table.row($t.closest('tr')).index(), column: 21 }).data(data.data.delivery_city_criteria) : null;
						// }

						// table.cell({ row: table.row($t.closest('tr')).index(), column: 22 }).data(data.data.delivery_charge);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 23 }).data(data.data.payment_method);
						// table.cell({ row: table.row($t.closest('tr')).index(), column: 24 }).data(data.data.delivery_note);
						// //table.cell({row:table.row($t.closest('tr')).index(), column:19}).data('<button id="' + data.data.delivery_Id + '" class="btn-round btn-outline btn assignIt" style="font-size:13px">Assign</button>');
						// //table.cell({row:table.row($t.closest('tr')).index(), column:20}).data('<button id="' + data.data.delivery_Id + '$$' + data.data.creator_id + '$$' + data.data.delivery_charge + '$$' + data.data.pickup_time + '$$' + data.data.receiver_name + '$$' + data.data.receiver_phone_number + '$$' + data.data.product_name + '$$' + data.data.product_qty + '$$' + data.data.payment_method + '$$' + data.data.product_cost + '$$' + data.data.delivery_note + '$$' + data.data.delivery_area + '$$' + data.data.receiver_address + '$$' + data.data.receiver_lat + '$$' + data.data.receiver_longi + '$$' + data.data.sender_name + '$$' + data.data.sender_phone_number + '$$' + data.data.sender_address + '$$' + data.data.delivery_type + '$$' + data.data.sender_lat + '$$' + data.data.sender_longi+  '$$' + data.data.delivery_created_date+  '$$' + data.data.delivery_created_by_name+  '$$' + data.data.delivery_created_by_role + '$$' + data.data.collection_name + '$$' + data.data.delivery_status + '" class="btn-round btn-outline btn updateCh" style="font-size:13px">Update Delivery</button>');
						// //table.cell({row:table.row($t.closest('tr')).index(), column:21}).data('<button id="' + org_ID + '" name="' + data.data.delivery_Id + '" class="btn-round btn-outline btn" onclick="invoiceUnass(this)">Invoice</button>');
						// document.getElementById(`${id_delivery_update}`).id = data.data.delivery_Id + '$$' + data.data.creator_id + '$$' + data.data.delivery_charge + '$$' + data.data.pickup_time + '$$' + data.data.receiver_name + '$$' + data.data.receiver_phone_number + '$$' + data.data.product_name + '$$' + data.data.product_qty + '$$' + data.data.payment_method + '$$' + data.data.product_cost + '$$' + data.data.delivery_note + '$$' + data.data.delivery_area + '$$' + data.data.receiver_address + '$$' + data.data.receiver_lat + '$$' + data.data.receiver_longi + '$$' + data.data.sender_name + '$$' + data.data.sender_phone_number + '$$' + data.data.sender_address + '$$' + data.data.delivery_type + '$$' + data.data.sender_lat + '$$' + data.data.sender_longi + '$$' + data.data.delivery_created_date + '$$' + data.data.delivery_created_by_name + '$$' + data.data.delivery_created_by_role + '$$' + data.data.collection_name + '$$' + data.data.delivery_status + '$$' + data.data.delivery_city + '$$' + data.data.delivery_product_type + '$$' + data.data.delivery_weight + '$$' + data.data.delivery_day_type + '$$' + data.data.delivery_distance + '$$' + data.data.delivery_city_criteria;

					}
					catch (e) {
						//console.log(e);
					}

					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tick3DC').show();

						$("#sure3DC").html("Delivery Updated!");
					}, 1500);

					setTimeout(function () {
						$("#myModalDeliveryCostUpdate").modal('hide');

						//table
						//.row($t.parents('tr'))
						//.data(newArr)
						//.draw(false);
						////console.log(table.row($t.parents('tr')).data());

						$('.btn-ok-updateDC').attr('disabled', false);
						$('.cancelModDC').prop('disabled', false);
					}, 3000);
				},
				error: function (data) {

					////console.log(data.responseJSON.errorMessage);
					setTimeout(function () {

						$('.btn-ok-updateDC').attr('disabled', false);
						$('.cancelModDC').prop('disabled', false);
					}, 900);
					$('#myModalDeliveryCostUpdate').modal('hide');
					$('#myModal2').modal('show');
				}
			});
	}
});

//Returned Deliveries

var wrongKeteDao2 = () => {

	$('#wrongpercostR').hide();
	$('#wrongrpqtyR').hide();
	$('#wrongpnameR').hide();
	$('#wrongdcostR').hide();
}

var l = 0;
$('#dtBasicExampleNewj').on('click', '.returnIt', function () {
	id_delivery_updateR = $(this).attr('id');
	arr = [];
	arr = id_delivery_updateR.split('$$');
	document.getElementById('returnDeliveryID').innerHTML = `Delivery ID: <strong>${arr[0]}</strong>`;

	del_id = arr[0];
	creator_ID = arr[1];
	////console.log(arr);
	document.getElementById('product_nameUR').value = arr[3];
	document.getElementById('product_qtyUR').value = arr[4];
	document.getElementById('product_costUR').value = arr[5];
	document.getElementById('delivery_cost_updateR').value = arr[2];

	$t = $(this);
	$("#formReturnUpdate").show();
	$('#tickReturn').hide();
	$("#circleLoadReturn").hide();
	$("#sureReturn").hide();
	$("#myModalReturn").modal('show');
	wrongKeteDao2();
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okReturn').on("click", function () {
	wrongKeteDao2();

	var delivery_cost_update = document.getElementById('delivery_cost_updateR').value;
	var product_name = String(document.getElementById('product_nameUR').value);
	var product_qty = String(document.getElementById('product_qtyUR').value.toUpperCase());
	var product_cost = document.getElementById('product_costUR').value;

	var v1 = () => {
		if (parseInt(delivery_cost_update) < 0) {
			document.getElementById('wrongdcostR').innerHTML = "Delivery Charge must be greater than or equal to 0!";
			$('#wrongdcostR').show();
			document.getElementById("delivery_cost_updateR").focus();
			return 0;
		}
		else if (isNaN(delivery_cost_update) == true || delivery_cost_update == "" || !/\D/.test(delivery_cost_update) == false) {
			document.getElementById('wrongdcostR').innerHTML = "Delivery Charge must be a number!";
			$('#wrongdcostR').show();
			document.getElementById("delivery_cost_updateR").focus();
			return 0;
		}
		else if (!/\D/.test(delivery_cost_update) == true) {
			return 1;
		}
	}
	var v2 = () => {
		if (product_name == "" || product_name == null) {
			document.getElementById('wrongpnameR').innerHTML = "Product Details cannot be empty!";
			$('#wrongpnameR').show();
			document.getElementById("product_nameUR").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (product_qty.toUpperCase() === "NA") {
			return 1;
		}
		else if (parseInt(product_qty) <= 0) {
			document.getElementById('wrongrpqtyR').innerHTML = "Product Quantity must be greater than 0!";
			$('#wrongrpqtyR').show();
			document.getElementById("product_qtyUR").focus();
			return 0;
		}
		else if (isNaN(product_qty) == true || product_qty == "" || !/\D/.test(product_qty) == false) {
			document.getElementById('wrongrpqtyR').innerHTML = "Product Quantity must be a number!";
			$('#wrongrpqtyR').show();
			document.getElementById("product_qtyUR").focus();
			return 0;
		}
		else if (!/\D/.test(product_qty) == true) {
			return 1;
		}
	}
	var v4 = () => {
		if (parseInt(product_cost) < 0) {
			document.getElementById('wrongpercostR').innerHTML = "Product Cost must be greater than or equal to 0!";
			$('#wrongpercostR').show();
			document.getElementById("product_costUR").focus();
			return 0;
		}
		else if (isNaN(product_cost) == true || product_cost == "" || !/\D/.test(product_cost) == false) {
			document.getElementById('wrongpercostR').innerHTML = "Product Cost must be a number!";
			$('#wrongpercostR').show();
			document.getElementById("product_costUR").focus();
			return 0;
		}
		else if (!/\D/.test(product_cost) == true) {
			return 1;
		}
	}
	var datap;
	if (v1() == 1 && v2() == 1 && v3() == 1 && v4() == 1) {
		//pickup_time = convertTime24to12(pickup_time);
		////console.log(pickup_time);
		/*data= JSON.stringify
			({
				"collection_name": collection_name,
				"creator_id": creator_ID,
				"delivery_charge": delivery_cost_update,
				"delivery_type": delivery_type,
				"sender_address": s_address,
				"receiver_address": rec_address,
				"sender_phone_number": s_number,
				"receiver_phone_number": r_number,
				"sender_name": s_name,
				"receiver_name": r_name,
				"payment_method": payment_method,
				"product_cost": product_cost,
				"sender_lat": pickup_lat,
				"sender_longi": pickup_longi,
				"receiver_lat": delivery_lat,
				"receiver_longi": delivery_longi,
				"product_name": product_name,
				"product_qty": product_qty,
				"pickup_time": pickup_time,
				"delivery_note": delivery_note,
				"delivery_area": area,
				"delivery_created_date": created_date,
				"delivery_created_by_name": created_by_name,
				"delivery_created_by_role": created_by_role,
				"delivery_status": delivery_statusx
			});
			//console.log(data);*/
		document.getElementById('modalApproveGReturn').disabled = true;
		document.getElementById('modalCancelGReturn').disabled = true;
		$('.btn-okReturn').attr('disabled', true);
		$('.btn-cancel-Return').prop('disabled', true);
		$("#formReturnUpdate").hide();
		$(".circle-loader").removeClass("load-complete");
		$(".circle-loader").show();
		$("#sureReturn").html("Please wait!");
		$("#sureReturn").show();
		$.ajax
			({

				type: "PUT",
				url: urlForAll + "orgHead/update/return/delivery/" + del_id + "/" + creator_ID + "/" + product_cost + "/" + product_qty + "/" + product_name + "/" + delivery_cost_update,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					setTimeout(function () {
						$(".circle-loader").addClass("load-complete");

						$('#tickReturn').show();

						$("#sureReturn").html("Delivery Updated!");
					}, 1500);

					setTimeout(function () {
						$("#myModalReturn").modal('hide');
						var table = $('#dtBasicExampleNewj').DataTable();
						table
							.row($t.parents('tr'))
							.remove()
							.draw(false);
						document.getElementById('tenb').innerHTML = 'Returned Deliveries: ' + table
							.column(0)
							.data()
							.length;

						//table
						//.row($t.parents('tr'))
						//.data(newArr)
						//.draw();
						////console.log(table.row($t.parents('tr')).data());

						$('.btn-okReturn').attr('disabled', false);
						$('.btn-cancel-Return').prop('disabled', false);
					}, 3000);
				},
				error: function (data) {

					////console.log(data.responseJSON.errorMessage);
					setTimeout(function () {

						$('.btn-okReturn').attr('disabled', false);
						$('.btn-cancel-Return').prop('disabled', false);
					}, 900);
					$('#myModalReturn').modal('hide');
					$('#myModal2').modal('show');
				}
			});
	}
});