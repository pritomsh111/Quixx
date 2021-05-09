var map, infoWindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 23.8103, lng: 90.4125 },
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: true,
		scaleControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		}
	});
	infoWindow = new google.maps.InfoWindow;

	// Try HTML5 geolocation.
	/*if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		
		var geocoder = new google.maps.Geocoder;
			geocoder.geocode({
			'location': pos
			}, function(results, status) {
				if (status === 'OK') {
					if (results[0]) {
	
				//This is yout formatted address
				var marker = new google.maps.Marker({
				position: pos,
				map: map,
				icon: {
				  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
				},
				title: 'Your current location is : ' + results[0].formatted_address
				});
				
	
				} else {
				window.alert('No results found');
				}
			} else {
			  window.alert('Geocoder failed due to: ' + status);
			}
		  });
			//infoWindow.setPosition(pos);
			//infoWindow.setContent('Location found.');
			//infoWindow.open(map);
			map.setCenter(pos);
		  }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		  });
		} 
		else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
		}*/

	setMarkers(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {

	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

var dataa;


/*var locations = [
	['Motijheel', 23.7330 , 90.4172, 'Rahim'],
	['Karwan Bazaar', 23.7516, 90.3943, 'Karim'],
	['Kamlapur', 23.7337, 90.4261, 'Nahim'],
	['Khilgaon', 23.7566, 90.4644, 'Hahim'],
	['Mouchak', 23.7456, 90.4120, 'Aahim']

];*/


function formatApproved(d) {
	return '<table id="innerRowTable" style="border-spacing: 5rem; text-align: left">' +
		'<tr>' +
		'<td>Delivery Man\'s ID:</td > ' +
		'<td>' + d.delivery_man_id + '</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Delivery Area:</td>' +
		'<td>' + d.delivery_area.replace(/,/g, ", ") + '</td>' +
		'</tr>' +
		'</table>';
}

function setMarkers(map) {

	var infowindow = new google.maps.InfoWindow();

	var marker, i;
	$.ajax
		({
			async: false,
			type: "GET",
			url: urlForAll + "deliveryMan/getDeliveryManByUserId/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				dataa = data;
			}
		});
	for (i = 0; i < dataa.data.length; i++) {

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(dataa.data[i].current_lat, dataa.data[i].current_longi),
			map: map,
			title: dataa.data[i].name

		});
		//console.log(locations[0][0]);

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent('<p style="color:#0066b3;text-align:center;font-family:Didact Gothic;"><b>Delivery Man</b>:<br>' + dataa.data[i].name + '<br>' + "<button class='content1 btn-round btn-outline btn' id=" + dataa.data[i].delivery_man_id + " style='font-family:Didact Gothic;width:97%' onclick=detailDelivery(this);>Details</button>");
				//infowindow.setContent('<p style="color:#0066b3;font-family:Didact Gothic;" ><b>Delivery Man</b>:<br>'+dataa.data[i].name+''+"");
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

function details(abc) {
	var name_element = abc.id;
	var name_element2 = abc.name;

	localStorage.setItem("latValue", name_element);
	localStorage.setItem("lngValue", name_element2);
	window.open("delivery_location.html");
}

var hudai = (id) => {
	var dManID = id.id;
	var sDate = document.getElementById(`s${dManID}`).value.split('-');
	var date1 = `${sDate[2]}-${sDate[1]}-${sDate[0]}`;
	var eDate = document.getElementById(`e${dManID}`).value.split('-');
	var date2 = `${eDate[2]}-${eDate[1]}-${eDate[0]}`;
	//console.log(dManID + " " + date1	 + " " + date2);
	if (parseInt(sDate[0]) > parseInt(eDate[0])) {
		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Ending year cannot be lower than Staring year!";
		$('#myModalWrongDeliveryCreate').modal('show');
	}
	else if (parseInt(eDate[0]) == parseInt(sDate[0]) && parseInt(eDate[1]) == parseInt(sDate[1])) {
		if (parseInt(eDate[2]) < parseInt(sDate[2])) {

			document.getElementById('wrongThisDeliveryCreate').innerHTML = "Ending date cannot be lower than Staring date!";
			$('#myModalWrongDeliveryCreate').modal('show');
		}
		else {
			window.open(urlForAll + "reports/search/deliveryMan/activity/" + localStorage.getItem('userID') + "/" + dManID + "/" + date1 + "/" + date2);
		}
	}
	else if (sDate[1] && sDate[0] && sDate[2] && eDate[0] && sDate[1] && eDate[2]) {
		window.open(urlForAll + "reports/search/deliveryMan/activity/" + localStorage.getItem('userID') + "/" + dManID + "/" + date1 + "/" + date2);
	}
	else {
		document.getElementById('wrongThisDeliveryCreate').innerHTML = "Please Select Both Dates!";
		$('#myModalWrongDeliveryCreate').modal('show');
	}
}

var seeDateWise = () => {
	document.getElementById('onec').disabled = false;
	document.getElementById('twoc').disabled = false;
	document.getElementById('twoc').style.fontSize = '13px';
	document.getElementById('onec').style.fontSize = '13px';
	document.getElementById('onec').innerHTML = 'Details of Delivery and Delivery Man';
	document.getElementById('threec').disabled = true;
	document.getElementById('threec').style.fontSize = '14.5px';
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	$('#map').hide();
	var table = $('#dtBasicExample2').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"deferRender": true,
		"paging": true,
		"pagingType": "full_numbers",
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "deliveryMan/approved/" + localStorage.getItem('userID'),
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
			{ "targets": 0, "data": "name" },
			{ "targets": 1, "data": "phone_number" },
			{
				"targets": 3, "data": "date1", render: function (data, type, row) {

					return '<input class="btn-round btn-outline btn" type="date" id="s' + row.delivery_man_id + '">'
				}
			},
			{
				"targets": 4, "data": "date2", render: function (data, type, row) {

					return '<input class="btn-round btn-outline btn" type="date" id="e' + row.delivery_man_id + '">'
				}
			},
			{
				"targets": 5, "data": "button", render: function (data, type, row) {

					return '<button class="btn-round btn-outline btn" id="' + row.delivery_man_id + '" onclick="hudai(this)">Submit</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('threec').innerHTML = 'Delivery Information [Date-wise]: ' + json.data.length;
	});
	table.clear().draw();
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
		}
	});
	/*$.ajax
	({
		async: true,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "deliveryMan/approved/" + localStorage.getItem('userID'),
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		beforeSend: function()
		{
			document.getElementById("dtBasicExample2_processing").style.display = "block";	
		},
		success: function(data) 
		{
			document.getElementById('threec').innerHTML = 'Delivery Information [Date-wise]: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'
			+data.data[i].name+'</td><td>'
			+data.data[i].phone_number+'</td><td>'
			+data.data[i].delivery_area+'</td><td>'
			+'<input class="btn-round btn-outline btn" type="date" id="s' + data.data[i].delivery_man_id + '">'+'</td><td>'
			+'<input class="btn-round btn-outline btn" type="date" id="e' + data.data[i].delivery_man_id + '">'+'</td><td>'
			+'<button class="btn-round btn-outline btn" id="' + data.data[i].delivery_man_id + '" onclick="hudai(this)">Submit</button></td></tr>';

			table.rows.add($(table_rows)).draw();
			});
		},
		complete:function(data){
			document.getElementById("dtBasicExample2_processing").style.display = "none";	
		}
	});*/

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });

	$('#dtBasicExample2').show();
	$('.b').show();
}

var deliveryManOnMap = () => {
	document.getElementById('onec').disabled = false;
	document.getElementById('twoc').disabled = true;
	document.getElementById('twoc').style.fontSize = '14.5px';
	document.getElementById('onec').style.fontSize = '13px';
	document.getElementById('onec').innerHTML = 'Details of Delivery and Delivery Man';
	document.getElementById('threec').disabled = false;
	document.getElementById('threec').style.fontSize = '13px';
	document.getElementById('threec').innerHTML = 'Delivery Information [Date-wise]';
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	$('#map').show();
}

var deliveryManWithProduct = () => {
	document.getElementById('twoc').disabled = false;
	document.getElementById('onec').disabled = true;
	document.getElementById('onec').style.fontSize = '14.5px';
	document.getElementById('twoc').style.fontSize = '13px';
	document.getElementById('threec').disabled = false;
	document.getElementById('threec').style.fontSize = '13px';
	document.getElementById('threec').innerHTML = 'Delivery Information [Date-wise]';
	$('#map').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	var table = $('#dtBasicExample').DataTable({
		"processing": true,
		'language': {
			'loadingRecords': '&nbsp;',
			'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
		},
		"deferRender": true,
		"paging": true,
		"pagingType": "full_numbers",
		"destroy": true,
		"oSearch": { "bSmart": false, "bRegex": true },
		"ajax":
		{
			"url": urlForAll + "deliveryMan/approved/" + localStorage.getItem('userID'),
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
			{ "targets": 2, "data": "delivery_man_id" },
			{ "targets": 0, "data": "name" },
			{ "targets": 0, "data": "email" },
			{ "targets": 1, "data": "phone_number" },
			{
				"targets": 3, "data": "button", render: function (data, type, row) {

					return '<button id="' + row.delivery_man_id + '" class="btn-round btn-outline btn" onclick=detailDelivery(this)>Details</button>'
				}
			}
		]
	});
	table.on('xhr', function () {
		var json = table.ajax.json();
		document.getElementById('onec').innerHTML = 'Details of Delivery and Delivery Man: ' + json.data.length;
	});
	table.clear().draw();
	/*$.ajax
	({
		async: false,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "deliveryMan/approved/" + localStorage.getItem('userID'),
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		beforeSend: function()
		{
			document.getElementById("dtBasicExample_processing").style.display = "block";	
		},
		success: function(data) 
		{
			document.getElementById('onec').innerHTML = 'Details of Delivery and Delivery Man: ' + data.data.length;
			
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'
			+data.data[i].delivery_man_id+'</td><td>'
			+data.data[i].name+'</td><td>'
			+data.data[i].email+'</td><td>'
			+data.data[i].phone_number+'</td><td>'
			+'<button id="' + data.data[i].delivery_man_id + '" class="btn-round btn-outline btn" onclick=detailDelivery(this)>Details</button></td></tr>';

			table.rows.add($(table_rows)).draw();
			});
		},
		complete:function(data){
			document.getElementById("dtBasicExample_processing").style.display = "none";	
		}
	});*/

	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
	$('#dtBasicExample').show();
	$('.a').show();
}

var detailDelivery = (deliveryData) => {
	window.open("deliveryManOnMapAndDetails.html" + "#" + deliveryData.id);
}