$(function () {
	$('#settingsMer').hide();
	$("#cod").hide();
	$("#deliveryCreate").hide();
	$(".container").hide();
	$('#bulkDelivery').hide();
	$('.criteria')
		.hide();
	document.getElementById('body').style.pointerEvents = "auto";
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
});

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
var merchantPerDeliveryCost = 0;
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
	//console.log(criteriaEnabled);
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
					//console.log(data);
					if (criteriaMap.size) {
						criteriaMap.clear();
					}
					Object.keys(data.data).map((types, index) => {
						//console.log(types);
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

							//console.log(mapObj, criteriaMap);

							//console.log(data.data[types]);
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
criteriaInfo(localStorage.getItem('userID'));
naValuesType.map(item => {
	document.querySelector(`select#${item}`).addEventListener('change', function (e) {
		if (item !== "dayType" && item !== "productCity") {
			let obj = criteriaMap.get(item);
			// //console.log(obj[e.target.value]);
			if (/^\d+$/.test(obj[e.target.value])) {
				document.getElementById('delivery_charge').value = obj[e.target.value];
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
			}
			else {
				document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (This is Merchant's delivery charge. It can be modified)";
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
			}
			else {
				if (objDayType?.[dayType] || objDayType?.[dayType] === 0) {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
					document.getElementById('delivery_charge').value = objDayType[dayType];
				}
				else if (objProductCity?.[productCity] || objProductCity?.[productCity] === 0) {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]: (Based on Criteria)";
					document.getElementById('delivery_charge').value = objProductCity[productCity];
				}
				else {
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
					document.getElementById('delivery_charge').value = merchantPerDeliveryCost;
				}
			}
		}
	});
});


var myMarker, myMarker2, infowindow, infowindow2, contentString, contentString2;
var markers = [];
var markers2 = [];


function initAutocomplete() {

	var map;
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "profile/get/profile/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.status == 'OK') {
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
					document.getElementById('delivery_charge').value = data.data.per_delivery_cost;
					merchantPerDeliveryCost = data.data.per_delivery_cost;

					document.getElementById('senLatLong').innerHTML =
						`Sender's Address: ${data.data.sender_address}<br>
						Sender's Name: ${data.data.sender_name}<br>
						Sender's Phone Number: ${data.data.sender_phone_number}<br>
						Sender's Lattitude: ${data.data.sender_lat}<br>
						Sender's Longitude: ${data.data.sender_longi}<br>`;
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				$('#myModal2').modal('show');
			}
		})
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
				////console.log("Returned place contains no geometry");
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