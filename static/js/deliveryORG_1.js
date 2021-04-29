$(document).ready(async function () {
	var dhakaIndex, url;
	document.getElementById("fileName").innerHTML = "";
	$('#settings').hide();
	$("#deliveryCreate").hide();
	$("#cod").hide();
	$(".container").hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampled').hide();
	$('#dtBasicExampleNew').hide();
	$('#dtBasicExampleNewf').hide();
	$('#dtBasicExampleNewg').hide();
	$('#dtBasicExampleNewh').hide();
	$('#dtBasicExampleNewi').hide();
	$('#dtBasicExampleNewj').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('.f').hide();
	$('.g').hide();
	$('.h').hide();
	$('.i').hide();
	$('.j').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	$('#managers')
		.empty();
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
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i] === "Dhaka") {
						dhakaIndex = i;
						dhaka = 1;
					}
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#managers").append(option);
				}
				document.getElementById('managers').selectedIndex = dhakaIndex;
			}
		});

	changedArea("Dhaka");
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
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i]) {
							var option = new Option(data.data[i], data.data[i]);
							$(option).html(data.data[i]);
							$("#managers_2").append(option);
						}
					}
				}
			});
	}
	document.querySelector("#managers").addEventListener("change", function () {
		var vari = this.value == "Dhaka" ? "Dhaka" : this.value;
		changedArea(vari);
	});
	$('#managers2')
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
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#managers2").append(option);
				}
			}
		});
	var saveIT;
	$.ajax
		({
			url: urlForAll + "orgHead/get/merchants/info/" + org_ID,
			type: "GET",
			async: true,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				dataInfo = data;
				$('#senderList')
					.empty()
					.append('<option selected="selected" value="">Choose Sender</option>')
					;
				$('#senderListExcel')
					.empty()
					.append('<option selected="selected" value="">Choose Sender</option>')
					;
				for (var i = 0; i < data.data.merchants_info.length; i++) {
					if (i == 0) {
						saveIT = data.data.merchants_info[i].profileDto.user_id;
					}
					var option = new Option(data.data.merchants_info[i].profileDto.user_id, data.data.merchants_info[i].profileDto.user_id);
					$(option).html(data.data.merchants_info[i].merchantName);
					$("#senderList").append(option);
					$("#senderListExcel").append(option);
				}
				$('#senderList')
					.append('<option value="' + org_ID + '">Organization Head</option>')
					;
				$('#senderListExcel')
					.append('<option value="' + org_ID + '">Organization Head</option>')
					;
				$("#delivery_charge").attr('placeholder', "1000");
				document.getElementById('delivery_charge').value = "";
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
				//recall1(saveIT);
			}
		});
	$('.criteria')
		.hide();
	// criteriaInfo(org_ID);
});

var criteriaMap = new Map();
var naValuesType = ["dayType", "productType", "productWeight", "productDistance", "productCity"];
var naValues = ["delivery_day_type_na", "delivery_product_type_na", "delivery_weight_na", "delivery_distance_na", "delivery_city_criteria_na"];

async function criteriaInfo(value) {
	let criteriaEnabled;
	await $.ajax({
		url: urlForAll + "delivery/criteria/enable/" + value,
		type: "GET",
		headers:
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function (data) {
			criteriaEnabled = data.data;
		}
	});
	console.log(criteriaEnabled);
	if (criteriaEnabled) {
		$('.criteria')
			.show();
		$('#dayType1')
			.hide();
		$('#productType1')
			.hide();
		$('#productWeight1')
			.hide();
		$('#productDistance1')
			.hide();
		$('#productCity1')
			.hide();

		$('#dayType')
			.empty();
		$('#productType')
			.empty();
		$('#productWeight')
			.empty();
		$('#productDistance')
			.empty();
		$('#productCity')
			.empty();
		$.ajax
			({
				url: urlForAll + "delivery/criteria/active/" + value,
				type: "GET",

				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					console.log(data);
					if (criteriaMap.size) {
						criteriaMap.clear();
					}
					Object.keys(data.data).map((types, index) => {
						console.log(types);
						let mapObj = {};
						if (types !== "userId") {
							let typ = naValuesType.indexOf(types);
							$(`#${types}1`).show();
							$(`#${types}`)
								.empty()
								.append('<option value="' + naValues[typ] + '">---</option>')
								;
							Object.keys(data.data[types]).map(value => {
								var option = new Option(value, value);
								$(option).html(value);
								$(`#${types}`).append(option);

							});
							mapObj = { [naValues[typ]]: "", ...data.data[types] };
							criteriaMap.set(types, mapObj);

							console.log(mapObj, criteriaMap);

							console.log(data.data[types]);
						}
					});
					// document.getElementById('managers').selectedIndex = dhakaIndex;
				}
			});
		// $("#delivery_charge").attr('placeholder', "1000");
		// document.getElementById('delivery_charge').value = "";
		// document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:<br>**If you fill up the criteria above, this charge wil not be counted! But give atleast some value for future purposes";
	}
	else {
		$('.criteria')
			.hide();
		$('#dayType')
			.empty();
		$('#productType')
			.empty();
		$('#productWeight')
			.empty();
		$('#productDistance')
			.empty();
		$('#productCity')
			.empty();
	}
}

function initialize() {
	initAutocomplete();
	initMap();
}

var myMarker, myMarker3, infowindow, infowindow3, contentString, contentString3;
var markers = [];
var markers3 = [];

var markerx = [];
window.map = undefined;

function initMap() {

	var map3 = new google.maps.Map(document.getElementById('map3'), {
		center: { lat: 23.8103, lng: 90.4125 },
		zoom: 13,
		mapTypeId: 'roadmap',
		mapTypeControl: false,
		fullscreenControl: false
	});
	const mapOptions = {
		center: { lat: 23.8103, lng: 90.4125 },
		zoom: 13,
		mapTypeId: 'roadmap',
		mapTypeControl: false,
		fullscreenControl: false
	};
	window.map = new google.maps.Map(
		document.getElementById("map3"), mapOptions);
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({
				'location': pos
			}, function (results, status) {
				if (status === 'OK') {
					if (results[0]) {

						//newMap
						var marker3 = new google.maps.Marker({
							position: pos,
							map: window.map,
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
			window.map.setCenter(pos);
			//setMarkers(map);
		}, function () {
			//handleLocationError(true, infoWindow, map.getCenter());
			//handleLocationError2(true, infoWindow2, map2.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		//handleLocationError(false, infoWindow, map.getCenter());
		//handleLocationError2(false, infoWindow2, map2.getCenter());
	}

	// Create the search box and link it to the UI element.

	//var input = document.getElementById('pac-input');
	var input3 = document.getElementById('pac-input3');

	//var searchBox = new google.maps.places.SearchBox(input);
	var searchBox3 = new google.maps.places.SearchBox(input3);

	window.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input3);


	window.map.addListener('bounds_changed', function () {
		searchBox3.setBounds(window.map.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.




	//NewMAP
	searchBox3.addListener('places_changed', function () {

		removeMarkers3();
		var places = searchBox3.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function (place) {
			if (!place.geometry) {
				//console.log("Returned place contains no geometry");
				return;
			}
			// Create a marker for each place.
			removeMarkers3();
			//document.getElementById('DESTINATION_ADDRESS').value=input2.value;
			myMarker3 = new google.maps.Marker({
				position: place.geometry.location,
				draggable: true
			});

			markers3.push(myMarker3);
			contentString3 = '<p>Drag marker...</p>';
			infowindow3 = new google.maps.InfoWindow({
				content: contentString3
			});


			var geocoder = new google.maps.Geocoder();
			var location = new google.maps.LatLng(myMarker3.position.lat(), myMarker3.position.lng());
			geocoder.geocode({ 'latLng': location }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var add = results[0].formatted_address;
					//var a = evt.latLng.lat() + evt.latLng.lng();
					infowindow3.setContent(add);

					document.getElementById('des_latU').value = myMarker3.position.lat();
					document.getElementById('des_longiU').value = myMarker3.position.lng();
				}

			});


			google.maps.event.addListener(myMarker3, 'dragend', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
				contentString3 = '<p>Current Lat: ' + input3 + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

				document.getElementById('des_latU').value = evt.latLng.lat();
				document.getElementById('des_longiU').value = evt.latLng.lng();

				var geocoder = new google.maps.Geocoder();
				var location = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
				geocoder.geocode({ 'latLng': location }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var add = results[0].formatted_address;
						//var a = evt.latLng.lat() + evt.latLng.lng();
						infowindow3.setContent(add);

						//document.getElementById('DESTINATION_ADDRESS').value=add;
						document.getElementById('pac-input3').value = add;
					}

				});

				//infowindow.setContent(contentString);
			});



			google.maps.event.addListener(myMarker3, 'dragstart', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
			});

			myMarker3.addListener('click', function () {
				infowindow3.open(window.map, myMarker3);
			});


			window.map.setCenter(myMarker3.position);
			myMarker3.setMap(window.map);
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		window.map.fitBounds(bounds);
	});

	$('#myModalDeliveryCostUpdate').on('shown.bs.modal', function () {
		//Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)

		google.maps.event.trigger(window.map, "resize");
	})
}


function removeMarkers3() {
	markerx[1].setMap(null);
	for (var i = 0; i < markers3.length; i++) {
		markers3[i].setMap(null);
	}
}
function handleLocationError3(browserHasGeolocation, infoWindow3, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(window.map);

}

var recall1 = (saveIT) => {

	var senderGuy = saveIT;
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "profile/get/profile/" + senderGuy,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				var map = new google.maps.Map(document.getElementById('map'), {
					center: { lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi) },
					zoom: 13,
					mapTypeId: 'roadmap',
					mapTypeControl: false,
					fullscreenControl: false
				});
				myMarker = new google.maps.Marker({
					position: { lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi) },
					map: map
				});
				document.getElementById('pac-input').value = data.data.sender_address;
				document.getElementById('s_name').value = data.data.sender_name;
				document.getElementById('s_number').value = data.data.sender_phone_number;
				document.getElementById('lat').value = data.data.sender_lat;
				document.getElementById('longi').value = data.data.sender_longi;
				if (data.data.per_delivery_cost > 0) {
					document.getElementById('delivery_charge').value = data.data.per_delivery_cost;
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (This is Merchant's delivery charge. It can be modified)";
				}
				else {
					$("#delivery_charge").attr('placeholder', "1000");
					document.getElementById('delivery_charge').value = "";
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
				}
			}
		})
}

var myMarker, myMarker2, infowindow, infowindow2, contentString, contentString2;
var markers = [];
var markers2 = [];


function initAutocomplete() {

	var map2 = new google.maps.Map(document.getElementById('map2'), {
		center: { lat: 23.8103, lng: 90.4125 },
		zoom: 13,
		mapTypeId: 'roadmap',
		mapTypeControl: false,
		fullscreenControl: false
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({
				'location': pos
			}, function (results, status) {
				if (status === 'OK') {
					if (results[0]) {

						//newMap
						var marker2 = new google.maps.Marker({
							position: pos,
							map: map2,
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
			map2.setCenter(pos);
			//setMarkers(map);
		}, function () {
			//handleLocationError(true, infoWindow, map.getCenter());
			//handleLocationError2(true, infoWindow2, map2.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		//handleLocationError(false, infoWindow, map.getCenter());
		//handleLocationError2(false, infoWindow2, map2.getCenter());
	}

	// Create the search box and link it to the UI element.

	//var input = document.getElementById('pac-input');
	var input2 = document.getElementById('pac-input2');

	//var searchBox = new google.maps.places.SearchBox(input);
	var searchBox2 = new google.maps.places.SearchBox(input2);

	map2.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);


	map2.addListener('bounds_changed', function () {
		searchBox2.setBounds(map2.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.

	//NewMAP
	searchBox2.addListener('places_changed', function () {
		var places = searchBox2.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function (place) {
			if (!place.geometry) {
				//console.log("Returned place contains no geometry");
				return;
			}
			// Create a marker for each place.
			removeMarkers2();
			//document.getElementById('DESTINATION_ADDRESS').value=input2.value;
			myMarker2 = new google.maps.Marker({
				position: place.geometry.location,
				draggable: true
			});

			markers2.push(myMarker2);
			contentString2 = '<p>Drag marker...</p>';
			infowindow2 = new google.maps.InfoWindow({
				content: contentString2
			});


			var geocoder = new google.maps.Geocoder();
			var location = new google.maps.LatLng(myMarker2.position.lat(), myMarker2.position.lng());
			geocoder.geocode({ 'latLng': location }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var add = results[0].formatted_address;
					//var a = evt.latLng.lat() + evt.latLng.lng();
					infowindow2.setContent(add);

					document.getElementById('des_lat').value = myMarker2.position.lat();
					document.getElementById('des_longi').value = myMarker2.position.lng();
				}

			});


			google.maps.event.addListener(myMarker2, 'dragend', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
				contentString2 = '<p>Current Lat: ' + input2 + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

				document.getElementById('des_lat').value = evt.latLng.lat();
				document.getElementById('des_longi').value = evt.latLng.lng();

				var geocoder = new google.maps.Geocoder();
				var location = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
				geocoder.geocode({ 'latLng': location }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var add = results[0].formatted_address;
						//var a = evt.latLng.lat() + evt.latLng.lng();
						infowindow2.setContent(add);

						//document.getElementById('DESTINATION_ADDRESS').value=add;
						document.getElementById('pac-input2').value = add;
					}

				});

				//infowindow.setContent(contentString);
			});



			google.maps.event.addListener(myMarker2, 'dragstart', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
			});

			myMarker2.addListener('click', function () {
				infowindow2.open(map2, myMarker2);
			});


			map2.setCenter(myMarker2.position);
			myMarker2.setMap(map2);
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map2.fitBounds(bounds);
	});

}

function removeMarkers2() {
	for (var i = 0; i < markers2.length; i++) {
		markers2[i].setMap(null);
	}
}
function handleLocationError2(browserHasGeolocation, infoWindow2, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map2);

}