var merchant_ID = localStorage.getItem('userID');
var dataInfo, excelData, flag = false;

function btnHandler() {
	document.getElementById('three').disabled = false;
	document.getElementById('two').disabled = false;
	document.getElementById('threeQ').disabled = false;
	document.getElementById('three').style.fontSize = '13px';
	document.getElementById('two').style.fontSize = '13px';
	document.getElementById('threeQ').style.fontSize = '13px';
	document.getElementById('threeQ').innerHTML = 'Quick Delivery';
	document.getElementById('three').innerHTML = 'Detailed Delivery';
	document.getElementById('two').innerHTML = 'Multiple Deliveries [Excel]';
	$('#dtBasicExampled').hide();
	$('.d').hide();
}

var createDeliveryQ = () => {
	btnHandler();
	document.getElementById('threeQ').disabled = true;
	document.getElementById('threeQ').style.fontSize = '14.5px';
	$('#bulkDelivery').hide();
	$("#deliveryCreate").hide();
	$("#deliveryCreateQ").show();
}
var createDelivery = () => {
	btnHandler();
	document.getElementById('three').disabled = true;
	document.getElementById('three').style.fontSize = '14.5px';
	$('#bulkDelivery').hide();
	$("#deliveryCreateQ").hide();
	$("#deliveryCreate").show();
}
var createBulkDeliveries = () => {
	btnHandler();
	document.getElementById('two').disabled = true;
	document.getElementById('two').style.fontSize = '14.5px';
	$("#deliveryCreateQ").hide();
	$("#deliveryCreate").hide();
	$('#bulkDelivery').show();
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
	//preventDefault***************************
	//preventDefault***************************
	//preventDefault***************************
	//preventDefault***************************
	//preventDefault***************************
	//preventDefault***************************
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
	document.getElementById('r_name').value = "";
	document.getElementById('r_number').value = "";
	document.getElementById('rec_address').value = "";
	document.getElementById('product_costQ').value = "";
	document.getElementById('product_nameQ').value = "";
	document.getElementById('product_qtyQ').value = "";
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

document.getElementById("createDeliveryQ").addEventListener("click", function (event) {
	// var pickup_time = document.getElementById('timepicker-12-hr').value;
	// var s_name = document.getElementById('s_name').value;
	// var s_number = document.getElementById('s_number').value;
	// var s_address = document.getElementById('pac-input').value;
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
			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Product Name cannot be empty!";
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
				"receiver_name": r_name,
				"receiver_phone_number": r_number,
				"receiver_address": rec_address,
				"payment_method": payment_method,
				"sender_lat": "",
				"sender_longi": "",
				"receiver_lat": "",
				"receiver_longi": "",
				"product_name": product_name,
				"product_qty": "NA",
				"product_cost": product_cost,
				"pickup_time": "",
				"delivery_note": "",
				"delivery_area": "",
				"delivery_charge": delivery_charge,
				"delivery_city": "",
				"delivery_day_type": "delivery_day_type_na",
				"delivery_product_type": "delivery_product_type_na",
				"delivery_weight": "delivery_weight_na",
				"delivery_distance": "delivery_distance_na",
				"delivery_city_criteria": "delivery_city_criteria_na"
			});
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

							$("#sureD2").html(`Delivery ID: ${data.data.delivery_Id} added! Thank You!`);
						}, 500);
						setTimeout(function () {

							document.getElementById('createDelivery').disabled = false;
							$("#myModalCreateD1").modal('hide');
						}, 2000);

						document.getElementById('timepicker-12-hr').value = pickup_time;
						recallQ();
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

		var pickup_time = excelData[i].Pickup_Time;
		var delivery_type = excelData[i].Delivery_Type;
		var s_name = excelData[i].Sender_Name;
		var s_number = excelData[i].Sender_Phone_Number;
		var s_address = excelData[i].Sender_Address;
		var pickup_lat = excelData[i].Sender_Lattitude;
		var pickup_longi = excelData[i].Sender_Longitude;
		var r_name = excelData[i].Receiver_Name;
		var r_number = excelData[i].Receiver_Phone_Number;
		var area = excelData[i].Receiver_Area;
		var rec_address = excelData[i].Receiver_Address;
		var delivery_lat = excelData[i].Receiver_Lattitude;
		var delivery_longi = excelData[i].Receiver_Longitude;

		var payment_method = excelData[i].Payment_Method;
		var product_name = excelData[i].Product_Name;
		var product_qty = excelData[i].Product_Quantity_Pieces;
		var product_cost = excelData[i].Product_Cost;
		var delivery_charge = excelData[i].Delivery_Charge;
		var delivery_note = excelData[i].Delivery_Note;
		var v1 = () => {
			if (pickup_time == "" || pickup_time == null || pickup_time == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give a Pickup Time!`;
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
		var v2 = () => {
			if (s_name == "" || s_name == null || s_name == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender Name cannot be empty!`;
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
		var v3 = () => {
			if (s_number == "" || s_number == null || s_number == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number cannot be empty!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if ((s_number.length < 11 || s_number.length > 11) && !/\D/.test(s_number) == true) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number must be of 11 digits!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (s_number.match(/\d/g).length === 11 && !/\D/.test(s_number) == true) {
				return 1;
			}
			else {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Phone Number not valid!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
		}
		var v4 = () => {
			if (s_address == "" || s_address == null || s_address == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Sender's Address cannot be empty!!`;
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
			else if ((r_number.length < 11 || r_number.length > 11) && !/\D/.test(r_number) == true) {
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
			if (parseInt(delivery_charge) < 0) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Delivery Charge must be greater than or equal to 0!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (isNaN(delivery_charge) == true || delivery_charge == "" || delivery_charge == undefined || !/\D/.test(delivery_charge) == false) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Delivery Charge must be a number!`;
				$('#myModalWrongDeliveryCreate').modal('show');
				document.getElementById('CLOSEIT').disabled = false;
				hello();
				setTimeout(function () {
					$('#myModalCreateD1').modal('hide');
				}, 2500);
				return 0;
			}
			else if (!/\D/.test(delivery_charge) == true) {
				return 1;
			}
		}
		var v9 = () => {
			if (product_name == "" || product_name == null || product_name == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Product Name cannot be empty!`;
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
			if (parseInt(product_qty) <= 0 || String(product_qty).charAt(0) == 0) {
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
			if (parseInt(product_cost) < 0) {
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
		var v17 = () => {
			if (delivery_lat == "" || delivery_longi == "" || delivery_longi == undefined || delivery_lat == undefined) {
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give Receiver's Lattitude/Longitude!!`;
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
				document.getElementById('wrongThisDeliveryCreate').innerHTML = `Deliver No: ${i + 1} - Please give Sender's Lattitude/Longitude!!`;
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

		if (v1() == 1 && v2() == 1 && v3() == 1 && v5() == 1 && v6() == 1 && v9() == 1 && v10() == 1 && v11() == 1 && v8() == 1 && v4() == 1 && v22() == 1 && v12() == 1) {
			if (delivery_note == undefined) {
				delivery_note = "";
			}
			if (pickup_lat == undefined) {
				pickup_lat = "";
				pickup_longi = "";
			}
			if (delivery_lat == undefined) {
				delivery_lat = "";
				delivery_longi = "";
			}
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
					"delivery_area": area,
					"delivery_day_type": "delivery_day_type_na",
					"delivery_product_type": "delivery_product_type_na",
					"delivery_weight": "delivery_weight_na",
					"delivery_distance": "delivery_distance_na",
					"delivery_city_criteria": "delivery_city_criteria_na"
				});
			////console.log(datap);
			$.ajax
				({
					async: true,
					type: "POST",
					url: urlForAll + "delivery/create/" + merchant_ID + '/no',
					data: datap,
					headers:
					{
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						"Authorization": 'Bearer ' + localStorage.getItem('token')
					},
					success: function (data) {
						if (i == 0) {
							document.getElementById("sureD2ZZ").innerHTML = `<br>${i + 1} Delivery Created!<br>`;
						}
						else {
							document.getElementById("sureD2ZZ").innerHTML = `<br>${i + 1} Deliveries Created!<br>`;
						}
						keysx[i] = Object.keys(data.data);
						extrax1[i] = data.data;
						deliveryList[i] = data.data.delivery_Id;

						var stringx = "";
						stringx += `Delivery ID: ${deliveryList[i]} Created<br>`;
						divElement.innerHTML += stringx;

						if (data.status == 'OK') {
							if (i == lengx - 1) {
								setTimeout(function () {
									$("#sureD2").html(`${i + 1} Deliveries Created!`);

									$(".circle-loader").addClass("load-complete");

									$('#tickD2').show();

									document.getElementById("sureD2ZZ").innerHTML = "";
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