var merchant_ID = localStorage.getItem('userID');
var dataInfo, excelData, flag = false, org_ID;

function btnHandler() {
	document.getElementById('three').disabled = false;
	document.getElementById('two').disabled = false;
	document.getElementById('twox').disabled = false;
	document.getElementById('threeQ').disabled = false;
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('twox').style.fontSize = '13px';
	document.getElementById('threeQ').style.fontSize = '13px';
	document.getElementById('threeQ').innerHTML = 'Quick Delivery';
	document.getElementById('three').innerHTML = 'Detailed Delivery';
	document.getElementById('two').innerHTML = 'Multiple Deliveries [Excel]';
	document.getElementById('twox').innerHTML = 'Unassigned Deliveries';
	$('#dtBasicExampled').hide();
	$('.d').hide();
	$("#deliveryCreateQ").hide();
	$('#bulkDelivery').hide();
	$("#deliveryCreate").hide();
}

var createDeliveryQ = () => {
	btnHandler();
	document.getElementById('threeQ').disabled = true;
	document.getElementById('threeQ').style.fontSize = '13px';
	$('#bulkDelivery').hide();
	$("#deliveryCreate").hide();
	$("#deliveryCreateQ").show();
}
var createDelivery = () => {
	btnHandler();
	document.getElementById('three').disabled = true;
	document.getElementById('three').style.fontSize = '13px';
	$("#deliveryCreate").show();
}
var createBulkDeliveries = () => {
	btnHandler();
	document.getElementById('two').disabled = true;
	document.getElementById('two').style.fontSize = '13px';
	$('#bulkDelivery').show();
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
var unassignedDeliveries = () => {
	btnHandler();
	document.getElementById('body').style.pointerEvents = "none";
	document.getElementById('twox').disabled = true;
	document.getElementById('twox').style.fontSize = '13px';
	this_select_content = "";
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
			"url": urlForAll + "manager/all/unAssign/delivery/" + merchant_ID,
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
			{ "targets": 1, "data": null, "defaultContent": "" },
			{
				"targets": 21, "data": null, render: function (data, type, row) {

					return row.delivery_Id + "<br>" + '<button id="' + row.delivery_Id + '$$' + row.creator_id + '$$' + row.delivery_charge + '$$' + row.pickup_time + '$$' + row.receiver_name + '$$' + row.receiver_phone_number + '$$' + row.product_name + '$$' + row.product_qty + '$$' + row.payment_method + '$$' + row.product_cost + '$$' + row.delivery_note + '$$' + row.delivery_area + '$$' + row.receiver_address + '$$' + row.receiver_lat + '$$' + row.receiver_longi + '$$' + row.sender_name + '$$' + row.sender_phone_number + '$$' + row.sender_address + '$$' + row.delivery_type + '$$' + row.sender_lat + '$$' + row.sender_longi + '$$' + row.delivery_created_date + '$$' + row.delivery_created_by_name + '$$' + row.delivery_created_by_role + '$$' + row.collection_name + '$$' + row.delivery_status + '$$' + row.delivery_city + '$$' + row.delivery_product_type + '$$' + row.delivery_weight + '$$' + row.delivery_day_type + '$$' + row.delivery_distance + "$$" + row.delivery_city_criteria + '" class="btn-round btn-outline btn updateCh" style="font-size:13px;">Update</button>'
				}
			},
			{ "targets": 2, "data": "delivery_status" },
			{ "targets": 10, "data": "receiver_name" },
			{ "targets": 11, "data": "receiver_phone_number" },
			{
				"targets": 24, "data": "delivery_city", render: function (data, type, row) {
					let a = row.delivery_city;
					return a ? row.delivery_city : "";
				}
			},
			{ "targets": 123, "data": "delivery_area" },
			{ "targets": 13, "data": "receiver_address" },
			{ "targets": 15, "data": "product_name" },
			{ "targets": 16, "data": "product_qty" },
			{ "targets": 17, "data": "product_cost" },
			{ "targets": 18, "data": "delivery_charge" },
			{ "targets": 19, "data": "payment_method" },
			{
				"targets": 25, "data": "delivery_product_type", render: function (data, type, row) {
					let a = row.delivery_product_type;
					if (a) {
						a = a?.includes("delivery_product_type_na") ? "NOT_SELECTED" : a;
						return a;
					}
					return "---";
				}
			},
			{
				"targets": 27, "data": "delivery_weight", render: function (data, type, row) {
					let a = row.delivery_weight;
					if (a) {
						a = a?.includes("delivery_weight_na") ? "NOT_SELECTED" : a + "KG";
						return a;
					}
					return "---";
				}
			},
			{
				"targets": 26, "data": "delivery_day_type", render: function (data, type, row) {
					let a = row.delivery_day_type;
					if (a) {
						a = a?.includes("delivery_day_type_na") ? "NOT_SELECTED" : a;
						return a;
					}
					return "---";
				}
			},
			{
				"targets": 28, "data": "delivery_distance", render: function (data, type, row) {
					let a = row.delivery_distance;
					if (a) {
						a = a?.includes("delivery_distance_na") ? "NOT_SELECTED" : a + "KM";
						return a;
					}
					return "---";
				}
			},
			{
				"targets": 29, "data": "delivery_city_criteria", render: function (data, type, row) {
					let a = row.delivery_city_criteria;
					if (a) {
						a = a?.includes("delivery_city_criteria_na") ? "NOT_SELECTED" : a;
						return a;
					}
					return "---";
				}
			},
			{ "targets": 5, "data": "pickup_time" },
			{ "targets": 20, "data": "delivery_note" },
			{ "targets": 1, "data": "delivery_created_date" },
			{ "targets": 7, "data": "sender_name" },
			{ "targets": 8, "data": "sender_phone_number" },
			{ "targets": 9, "data": "sender_address" }
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('twox').innerHTML = 'Unassigned Deliveries: ' + json.recordsTotal;
		document.getElementById('body').style.pointerEvents = "auto";
	});
	table.clear().draw();
	dataTableStyle();
	$('.d').show();
	$('#dtBasicExampled').show();
}

var goToDelivery = () => {
	window.open('addDeliverToDeliveryMan.html', '_blank');
}
var mapxx = () => {
	window.open("locationFinder.html", "_blank");
};
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

var save = (id) => {
	localStorage.setItem("'Accept': 'application/json'", id.id);
	localStorage.setItem("'Accept': 'application/jsonN'", id.name);
	window.open('addDeliverToDeliveryMan.html', '_blank');
};

$("#managers2").change(function () {
	var value = $(this).val();
	if (value == 'Cash on Delivery') {
		$("#cod").show();
	}
	else {
		$("#cod").hide();
	}
});

function recallQ() {
	document.getElementById('r_nameQ').value = "";
	document.getElementById('r_numberQ').value = "";
	document.getElementById('rec_addressQ').value = "";
	document.getElementById('product_costQ').value = "";
	document.getElementById('product_nameQ').value = "";
}
function recall() {
	document.getElementById('r_name').value = "";
	document.getElementById('r_number').value = "";
	document.getElementById('pac-input2').value = "";
	document.getElementById('rec_address').value = "";
	document.getElementById('DELIVERY_NOTE').value = "";
	document.getElementById('product_cost').value = "";
	document.getElementById('des_lat').value = "";
	document.getElementById('des_longi').value = "";
	document.getElementById('product_name').value = "";
	document.getElementById('product_qty').value = "";
	removeMarkers2();
	$.ajax
		({
			type: "GET",
			url: urlForAll + "profile/get/profile/" + localStorage.getItem('userID'),
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


document.getElementById('product_qty').addEventListener("keyup", function (e) {
	if (e.target.value.toUpperCase() === "NA") {
		document.querySelector("#product_cost").offsetParent.childNodes[5].firstChild.textContent = "Total Amount: [BDT]";
	}
	else {
		document.querySelector("#product_cost").offsetParent.childNodes[5].firstChild.textContent = "Per Product Cost: [BDT]";
	}
});

document.getElementById('product_qtyU').addEventListener("keyup", function (e) {
	if (e.target.value.toUpperCase() === "NA") {
		document.querySelector("#product_costU").offsetParent.childNodes[5].firstChild.textContent = "Total Amount: [BDT]";
	}
	else {
		document.querySelector("#product_costU").offsetParent.childNodes[5].firstChild.textContent = "Per Product Cost: [BDT]";
	}
});

document.getElementById("createDelivery").addEventListener("click", function (event) {
	divElement.innerHTML = "";
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
	var area = String(document.getElementById('managers_2').value);
	var pickup_lat = String(document.getElementById('lat').value);
	var pickup_longi = String(document.getElementById('longi').value);
	var delivery_lat = String(document.getElementById('des_lat').value);
	var delivery_longi = String(document.getElementById('des_longi').value);
	var product_name = String(document.getElementById('product_name').value);
	var product_qty = String(document.getElementById('product_qty').value.toUpperCase());
	var product_cost = document.getElementById('product_cost').value;
	var delivery_charge = document.getElementById('delivery_charge').value;
	var deliveryCity = String(document.getElementById('managers').value);
	var dayType = document.getElementById('dayType').value;
	var productType = document.getElementById('productType').value;
	var distance = document.getElementById('productDistance')?.value;
	var weight = document.getElementById('productWeight').value;
	var cityType = document.getElementById('productCity').value;
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
		else if ((s_number.length < 11 || s_number.length > 11) || /\D/.test(s_number) == true) {
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
		else if ((r_number.length < 11 || r_number.length > 11) || /\D/.test(r_number) == true) {
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
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Receiver's Address cannot be empty on map!!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("pac-input2").focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v9 = () => {
		if (product_name == "" || product_name == null) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Name cannot be empty!";
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
		if (parseInt(product_qty) <= 0) {
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
		if ((parseInt(product_cost) < 0) || (product_cost.length > 1 && product_cost.charAt(0) == "0")) {
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
	var vDC = () => {
		let en = document.getElementById('delivery_charge').disabled;
		// //console.log(en);
		if (!en) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "You have edited delivery charge! Don't do that!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_charge").focus();
			return 0;
		}
		let fl = false;
		Array.from(document.querySelectorAll(".criteria select")).map(item => {
			if (item.childElementCount) {
				for (let prop in criteriaMap.get(item.id)) {
					//console.log("before condition: ", criteriaMap.get(item.id)[prop], delivery_charge);
					if (criteriaMap.get(item.id)[prop] == delivery_charge) {
						fl = true;
						//console.log("MIllaaaagese");
						break;
					}
				}
			}
		});
		//console.log(fl, delivery_charge, merchantPerDeliveryCost);
		if (!fl) {
			if (+delivery_charge !== merchantPerDeliveryCost) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = "You have edited delivery charge! Don't do that!";
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById("delivery_charge").focus();
				return 0;
			}
		}
		// if (parseInt(delivery_charge) <= 0 || delivery_charge.charAt(0) == 0) {
		// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be greater than 0!";
		// 	$('#myModalWrongDeliveryCreate').modal('show');
		// 	document.getElementById("delivery_charge").focus();
		// 	return 0;
		// }
		// else
		if (isNaN(delivery_charge) == true || delivery_charge == "" || !/\D/.test(delivery_charge) == false) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be a number!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_charge").focus();
			return 0;
		}
		else if (!/\D/.test(delivery_charge) == true) {
			return 1;
		}
	}
	var datap;

	if (vDC() == 1 && v1() == 1 && v2() == 1 && v3() == 1 && v5() == 1 && v6() == 1 && v9() == 1 && v10() == 1 && v11() == 1 && vDC() == 1 && v4() == 1 && v12() == 1) {
		document.getElementById('createDelivery').disabled = true;
		$(".circle-loader").show();
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
				"delivery_charge": delivery_charge,
				"delivery_city": deliveryCity,
				"delivery_day_type": dayType ? dayType : "delivery_day_type_na",
				"delivery_product_type": productType ? productType : "delivery_product_type_na",
				"delivery_weight": weight ? weight : "delivery_weight_na",
				"delivery_distance": distance ? distance : "delivery_distance_na",
				"delivery_city_criteria": cityType ? cityType : "delivery_city_criteria_na"
			});
		console.log(datap);
		$.ajax
			({
				type: "POST",
				url: urlForAll + "delivery/create/" + merchant_ID + "/no",
				data: datap,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					console.log(data);
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

							document.getElementById('createDelivery').disabled = false;
							$("#myModalCreateD1").modal('hide');
						}, 2000);

						document.getElementById('timepicker-12-hr').value = pickup_time;
						recall();
					}
				},
				error: function (data) {
					document.getElementById('createDelivery').disabled = false;
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

document.getElementById("createDeliveryQ").addEventListener("click", function (event) {
	// var pickup_time = document.getElementById('timepicker-12-hr').value;
	// var s_name = document.getElementById('s_name').value;
	// var s_number = document.getElementById('s_number').value;
	// var s_address = document.getElementById('pac-input').value;
	divElement.innerHTML = "";
	var r_name = document.getElementById('r_nameQ').value;
	var r_number = document.getElementById('r_numberQ').value;
	// var r_address = document.getElementById('pac-input2').value;
	var rec_address = document.getElementById('rec_addressQ').value;
	var payment_method = document.getElementById('managers2Q').value;
	// var delivery_note = document.getElementById('DELIVERY_NOTE').value;
	// var delivery_type = document.getElementById('deliveryType').value;
	// var area = String(document.getElementById('managers_2').value);
	// var pickup_lat = String(document.getElementById('lat').value);
	// var pickup_longi = String(document.getElementById('longi').value);
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
	// 	else if ((s_number.length < 11 || s_number.length > 11) || /\D/.test(s_number) == true) {
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
		else if ((r_number.length < 11 || r_number.length > 11) || /\D/.test(r_number) == true) {
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
		if ((parseInt(product_cost) < 0) || (product_cost.length > 1 && product_cost.charAt(0) == "0")) {
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
		let en = document.getElementById('delivery_chargeQ').disabled;
		// //console.log(en);
		if (!en) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "You have edited delivery charge! Don't do that!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_chargeQ").focus();
			return 0;
		}
		else if (+delivery_charge !== merchantPerDeliveryCost) {
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "You have edited delivery charge! Don't do that!";
			$('#myModalWrongDeliveryCreate').modal('show');
			document.getElementById("delivery_chargeQ").focus();
			return 0;
		}
		// if (parseInt(delivery_charge) <= 0 || delivery_charge.charAt(0) == 0) {
		// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be greater than 0!";
		// 	$('#myModalWrongDeliveryCreate').modal('show');
		// 	document.getElementById("delivery_charge").focus();
		// 	return 0;
		// }
		// else
		if (isNaN(delivery_charge) == true || delivery_charge == "" || !/\D/.test(delivery_charge) == false) {
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
				"sender_lat": s_lat,
				"sender_longi": s_longi,
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
				url: urlForAll + "delivery/create/quick/" + merchant_ID + "/no",
				data: datap,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					console.log(data);
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

var hello = () => {
	document.getElementById('body').style.pointerEvents = "auto";
}
var divElement = document.getElementById('sureD2Z');
var keysx = [];
var extrax1 = [];
var extrax2 = [];
var deliveryList = [];
function doIt(i, lengx) {
	setTimeout(function () {
		var delivery_type = "CUSTOMER";
		var pickup_lat = s_lat;
		var pickup_longi = s_longi;
		var delivery_charge = `${merchantPerDeliveryCost}`;
		var r_name = excelData[i].Receiver_Name;
		var r_number = excelData[i].Receiver_Phone_Number;
		var rec_city = excelData[i].Receiver_City;
		var area = excelData[i].Receiver_Area;
		var rec_address = excelData[i].Receiver_Address;

		var product_name = excelData[i].Product_Name;
		var product_qty = excelData[i].Product_Quantity_Pieces.toUpperCase();
		var product_cost = excelData[i].Product_Cost;

		var payment_method = excelData[i].Payment_Method;

		//Optional
		var delivery_note = excelData[i].Optional_Delivery_Note;
		// var pickup_time = excelData[i].Pickup_Time;
		var v1 = () => {
			// if (pickup_time == "" || pickup_time == null || pickup_time == undefined) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give a Pickup Time!`;
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
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender Name cannot be empty!`;
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
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number cannot be empty!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if ((s_number.length < 11 || s_number.length > 11) || /\D/.test(s_number) == true) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number must be of 11 digits!`;
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
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number not valid!`;
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
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Address cannot be empty!!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's Name cannot be empty!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's Phone Number cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if ((r_number.length < 11 || r_number.length > 11) || /\D/.test(r_number) == true) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's Phone Number must be of 11 digits!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's Phone Number not valid!`;
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
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Delivery Charge must be greater than or equal to 0!`;
			// 	$('#myModalWrongDeliveryCreate').modal('show');
			// 	document.getElementById('CLOSEIT').disabled = false;
			// 	hello();
			// 	setTimeout(function () {
			// 		$('#myModalCreateD1').modal('hide');
			// 	}, 2500);
			// 	return 0;
			// }
			// else if (isNaN(delivery_charge) == true || delivery_charge == "" || delivery_charge == undefined || !/\D/.test(delivery_charge) == false) {
			// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Delivery Charge must be a number!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Details cannot be empty!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Quantity must be greater than 0!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (isNaN(product_qty) == true || product_qty == "" || product_qty == undefined || !/\D/.test(product_qty) == false) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Quantity must be a number!`;
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
			if ((parseInt(product_cost) < 0) || (product_cost.length > 1 && product_cost.charAt(0) == "0")) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Cost must be greater than or equal to 0!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (isNaN(product_cost) == true || product_cost == "" || product_cost == undefined || !/\D/.test(product_cost) == false) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Cost must be a number!`;
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
		var v12 = () => {
			if (rec_address == "" || rec_address == null || rec_address == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give Receiver's Address!`;
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
		var v22 = () => {
			if (area == "" || area == null || area == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's Area cannot be empty!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Receiver's City cannot be empty!`;
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
		// var v17 = () => {
		// 	if (delivery_lat == "" || delivery_longi == "" || delivery_longi == undefined || delivery_lat == undefined) {
		// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give Receiver's Lattitude/Longitude!!`;
		// 		$('#myModalWrongDeliveryCreate').modal('show');
		// 		document.getElementById('CLOSEIT').disabled = false;
		// 		hello();
		// 		setTimeout(function () {
		// 			$('#myModalCreateD1').modal('hide');
		// 		}, 2500);
		// 		return 0;
		// 	}
		// 	else {
		// 		return 1;
		// 	}
		// }
		// var v16 = () => {
		// 	if (pickup_lat == "" || pickup_longi == "" || pickup_lat == undefined || pickup_longi == undefined) {
		// 		document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give Sender's Lattitude/Longitude!!`;
		// 		$('#myModalWrongDeliveryCreate').modal('show');
		// 		document.getElementById('CLOSEIT').disabled = false;
		// 		hello();
		// 		setTimeout(function () {
		// 			$('#myModalCreateD1').modal('hide');
		// 		}, 2500);
		// 		return 0;
		// 	}
		// 	else {
		// 		return 1;
		// 	}
		// }
		var vXPayment = () => {
			if (payment_method == "" || payment_method == null || payment_method == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Payment Method cannot be empty!`;
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
			datap = JSON.stringify
				({
					"delivery_status": "",
					"delivery_type": delivery_type,
					"sender_name": s_name,
					"sender_address": s_address,
					"sender_phone_number": s_number,
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
					"delivery_charge": delivery_charge,
					"payment_method": payment_method,
					"delivery_note": delivery_note,
					"receiver_lat": "",
					"receiver_longi": "",
					"pickup_time": "",
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
					url: urlForAll + "delivery/create/" + merchant_ID + '/no',
					data: JSON.stringify
						({
							"delivery_status": "",
							"delivery_type": delivery_type,
							"sender_name": s_name,
							"sender_address": s_address,
							"sender_phone_number": s_number,
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
							"delivery_charge": delivery_charge,
							"payment_method": payment_method,
							"delivery_note": delivery_note,
							"receiver_lat": "",
							"receiver_longi": "",
							"pickup_time": "",
							"delivery_day_type": "delivery_day_type_na",
							"delivery_product_type": "delivery_product_type_na",
							"delivery_weight": "delivery_weight_na",
							"delivery_distance": "delivery_distance_na",
							"delivery_city_criteria": "delivery_city_criteria_na"
						}),
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
						stringx += `Delivery ID: <strong>${deliveryList[i]}</strong> Created<br>`;
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
	}, 100);

}
document.getElementById("createDeliverywithExcel").addEventListener("click", function (event) {
	if (flag == true) {
		divElement.innerHTML = "";
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

var criteriaEnabledDelivery = false;

var arr;
var id_delivery_update, del_id, creator_ID;
$("#delivery_cityU").change(function () {
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
	var cityIndex = 0;
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
				var k = 0;
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					if (method == data.data[i]) {
						k = i;
					}
					$("#managers2U").append(option);
				}
				document.getElementById('managers2U').selectedIndex = k;
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
		document.getElementById('delivery_cost_update').disabled = true;

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
					document.getElementById('delivery_cost_update').disabled = true;
					document.getElementById('delivery_cost_update').value = merchantPerDeliveryCost;
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
						document.getElementById('delivery_cost_update').value = merchantPerDeliveryCost;
						document.getElementById('delivery_cost_update').disabled = true;
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
	document.querySelector("#updateSenId").innerHTML = `Delivery ID: <strong>${arr[0]}</strong> & Receiver: <strong>${arr[4]}</strong>`;
	document.querySelector("#updateSenId").style.fontSize = `0.95rem`;
	creator_ID = arr[1];
	thikKoro(arr[8], arr[11], arr[26]);
	document.getElementById('chargeUpdate').innerHTML = "Delivery Charge [BDT]:";
	document.getElementById('delivery_cost_update').disabled = true;
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
		// if (parseInt(delivery_cost_update) < 0) {
		// 	document.getElementById('wrongdcost').innerHTML = "Delivery Charge must be greater than or equal to 0!";
		// 	$('#wrongdcost').show();
		// 	document.getElementById("delivery_cost_update").focus();
		// 	return 0;
		// }
		// else if (isNaN(delivery_cost_update) == true || delivery_cost_update == "" || !/\D/.test(delivery_cost_update) == false) {
		// 	document.getElementById('wrongdcost').innerHTML = "Delivery Charge must be a number!";
		// 	$('#wrongdcost').show();
		// 	document.getElementById("delivery_cost_update").focus();
		// 	return 0;
		// }
		// else if (!/\D/.test(delivery_cost_update) == true) {
		// 	return 1;
		// }
		let en = document.getElementById('delivery_cost_update').disabled;
		// //console.log(en);
		if (!en) {
			document.getElementById('wrongdcost').innerHTML = "You have edited delivery charge! Don't do that!";
			$('#wrongdcost').show();
			document.getElementById("delivery_cost_update").focus();
			return 0;
		}
		let fl = false;
		Array.from(document.querySelectorAll(".criteriaU select")).map(item => {
			if (item.childElementCount) {
				for (let prop in criteriaMap.get(`${item.id.substring(0, item.id.length - 1)}`)) {
					if (criteriaMap.get(`${item.id.substring(0, item.id.length - 1)}`)[prop] == delivery_cost_update) {
						fl = true;
						//console.log("MIllaaaagese");
						break;
					}
				}
			}
		});
		//console.log(fl, delivery_charge, merchantPerDeliveryCost);
		if (!fl) {
			if (+delivery_cost_update !== merchantPerDeliveryCost) {
				document.getElementById('wrongdcost').innerHTML = "You have edited delivery charge! Don't do that!";
				$('#wrongdcost').show();
				document.getElementById("delivery_cost_update").focus();
				return 0;
			}
		}
		// if (parseInt(delivery_charge) <= 0 || delivery_charge.charAt(0) == 0) {
		// 	document.getElementById('wrongThisDeliveryCreate').innerHTML = "Delivery Charge must be greater than 0!";
		// 	$('#myModalWrongDeliveryCreate').modal('show');
		// 	document.getElementById("delivery_charge").focus();
		// 	return 0;
		// }
		// else
		if (isNaN(delivery_cost_update) == true || delivery_cost_update == "" || !/\D/.test(delivery_cost_update) == false) {
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
		else if ((s_number.length < 11 || s_number.length > 11) || /\D/.test(s_number) == true) {
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
		else if ((r_number.length < 11 || r_number.length > 11) || /\D/.test(r_number) == true) {
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
		else if (parseInt(product_qty) <= 0) {
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
		if ((parseInt(product_cost) < 0) || (product_cost.length > 1 && product_cost.charAt(0) == "0")) {
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