$(document).ready(function () {
	$("#alreadySet").hide();
	document.title = "Organization";
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "approved/isSetting/done/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.data == true) {
					a = '#dashboardOrg';
					$('#settings').hide();
					$('#alreadySet').show();
				}
				else {
					$('#alreadySet').hide();
					$('#settings').show();
					a = '#settingsOrg';
					productType();
				}
				location.hash = a;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	const productType = () => {
		$.ajax
			({
				type: "GET",
				url: "http://206.189.128.203:8181/api/quixx/v1/delivery/metric/product/type/",
				success: function (data) {
					console.log(data);
					let div, child, elem, label;
					div = document.createElement("div");
					div.setAttribute("class", "prod_type");
					data.data.forEach((elemx, index) => {
						child = document.createElement("div");
						label = document.createElement("h5");
						elem = document.createElement("input");
						label.innerHTML = elemx + ":";
						label.setAttribute("style", "text-align: center; color:#000;");
						elem.setAttribute("type", "text");
						elem.setAttribute("id", elemx);
						elem.setAttribute("class", "form-control mb-4");
						elem.setAttribute("style", "color:#0066b3;text-align:center;");
						child.append(label);
						child.append(elem);
						div.append(child);
					});
					document.querySelector(".product__type").append(div);
					productWeight();
				},
				error: function (data) {
					// console.log(data);
				}
			});
	}
	const productWeight = () => {
		$.ajax
			({
				type: "GET",
				url: "http://206.189.128.203:8181/api/quixx/v1/delivery/metric/weight/",
				success: function (data) {
					console.log(data);
					let div, child, elem, label;
					div = document.createElement("div");
					div.setAttribute("class", "prod_type");
					data.data.forEach((elemx, index) => {
						child = document.createElement("div");
						label = document.createElement("h5");
						elem = document.createElement("input");
						label.innerHTML = elemx + ":";
						label.setAttribute("style", "text-align: center; color:#000;");
						elem.setAttribute("type", "text");
						elem.setAttribute("id", elemx);
						elem.setAttribute("class", "form-control mb-4");
						elem.setAttribute("style", "color:#0066b3;text-align:center;");
						child.append(label);
						child.append(elem);
						div.append(child);
					});
					document.querySelector(".product__weight").append(div);
					getDistance();
				},
				error: function (data) {
					// console.log(data);
				}
			});
	}
	const getDistance = () => {
		$.ajax
			({
				type: "GET",
				url: "http://206.189.128.203:8181/api/quixx/v1/delivery/metric/distance/",
				success: function (data) {
					console.log(data);
					let div, child, elem, label;
					div = document.createElement("div");
					div.setAttribute("class", "prod_type");
					data.data.forEach((elemx, index) => {
						child = document.createElement("div");
						label = document.createElement("h5");
						elem = document.createElement("input");
						label.innerHTML = elemx + ":";
						label.setAttribute("style", "text-align: center; color:#000;");
						elem.setAttribute("type", "text");
						elem.setAttribute("id", elemx);
						elem.setAttribute("class", "form-control mb-4");
						elem.setAttribute("style", "color:#0066b3;text-align:center;");
						child.append(label);
						child.append(elem);
						div.append(child);
					});
					document.querySelector(".get__distance").append(div);
					deliveryType();
				},
				error: function (data) {
					// console.log(data);
				}
			});
	}
	const deliveryType = () => {
		$.ajax
			({
				type: "GET",
				url: "http://206.189.128.203:8181/api/quixx/v1/delivery/metric/delivery/type/",
				success: function (data) {
					console.log(data);
					let div, child, elem, label;
					div = document.createElement("div");
					div.setAttribute("class", "prod_type");
					data.data.forEach((elemx, index) => {
						child = document.createElement("div");
						label = document.createElement("h5");
						elem = document.createElement("input");
						label.innerHTML = elemx + ":";
						label.setAttribute("style", "text-align: center; color:#000;");
						elem.setAttribute("type", "text");
						elem.setAttribute("id", elemx);
						elem.setAttribute("class", "form-control mb-4");
						elem.setAttribute("style", "color:#0066b3;text-align:center;");
						child.append(label);
						child.append(elem);
						div.append(child);
					});
					document.querySelector(".delivery_type").append(div);
					// deliveryType();
				},
				error: function (data) {
					// console.log(data);
				}
			});
	}
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
});


var myMarker, myMarker2, infowindow, infowindow2, contentString, contentString2;
var markers = [];
var markers2 = [];


function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
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


			map.setCenter(pos);
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

	var input = document.getElementById('pac-input');

	var searchBox = new google.maps.places.SearchBox(input);

	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function () {
		searchBox.setBounds(map.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.


	searchBox.addListener('places_changed', function () {
		var places = searchBox.getPlaces();

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
			removeMarkers();
			//document.getElementById('PICKUP_ADDRESS').value=input.value;
			myMarker = new google.maps.Marker({
				position: place.geometry.location,
				draggable: true
			});

			markers.push(myMarker);
			contentString = '<p>Drag marker...</p>';
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});


			var geocoder = new google.maps.Geocoder();
			var location = new google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng());
			geocoder.geocode({ 'latLng': location }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var add = results[0].formatted_address;
					//var a = evt.latLng.lat() + evt.latLng.lng();
					infowindow.setContent(add);

					document.getElementById('lat').value = myMarker.position.lat();
					document.getElementById('longi').value = myMarker.position.lng();
				}

			});


			google.maps.event.addListener(myMarker, 'dragend', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
				contentString = '<p>Current Lat: ' + input + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

				document.getElementById('lat').value = evt.latLng.lat();
				document.getElementById('longi').value = evt.latLng.lng();

				var geocoder = new google.maps.Geocoder();
				var location = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
				geocoder.geocode({ 'latLng': location }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var add = results[0].formatted_address;
						//var a = evt.latLng.lat() + evt.latLng.lng();
						infowindow.setContent(add);

						//document.getElementById('PICKUP_ADDRESS').value=add;
						document.getElementById('pac-input').value = add;
					}

				});

				//infowindow.setContent(contentString);
			});



			google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
				//document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
			});

			myMarker.addListener('click', function () {
				infowindow.open(map, myMarker);
			});


			map.setCenter(myMarker.position);
			myMarker.setMap(map);
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});

}

function removeMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);

}

document.getElementById("updateMerchant").addEventListener("click", function (event) {
	event.preventDefault();
	var s_address = document.getElementById('sender_address').value;
	var g_address = document.getElementById('pac-input').value;
	var s_lat = String(document.getElementById('lat').value);
	var s_longi = String(document.getElementById('longi').value);
	var v1 = () => {
		if (s_address == "" || s_address == null) {
			document.getElementById('wrongThisMerSet').innerHTML = "Address cannot be empty!";
			$('#myModalWrongMerSet').modal('show');
			document.getElementById('sender_address').focus();
			return 0;
		}
		else {
			return 1;
		}
	}
	var v2 = () => {
		if (g_address == "" || g_address == null) {
			document.getElementById('wrongThisMerSet').innerHTML = "Please search your location on map!";
			$('#myModalWrongMerSet').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}
	var v3 = () => {
		if (s_lat == "" || s_lat == null) {
			document.getElementById('wrongThisMerSet').innerHTML = "Please search your location on map!";
			$('#myModalWrongMerSet').modal('show');
			return 0;
		}
		else {
			return 1;
		}
	}

	let moneyProducts = [], moneyByWeights = [], moneyByDistance = [], moneyDeliveryTypes = [];

	var v44 = (val, id, type, array) => {
		var value = val.trim();
		if (!/\D/.test(value) == false) {
			document.getElementById('wrongThisMerSet').innerHTML = "Please give valid number for " + id;
			$('#myModalWrongMerSet').modal('show');
			document.getElementById(id).focus();
			return 0;
		}
		else if (!/\D/.test(value) == true) {
			value = value ? value : 0;
			array.push({ [type]: id, price: value });
			return 1;
		}
	}

	const checkProdType = (val, id, type, array) => {
		return v44(val, id, type, array);
	}

	// console.log(document.querySelectorAll(".product__type div"));

	const v11 = () => {
		let all = document.querySelectorAll(".product__type div");
		let count = 0;
		all.forEach((element, index) => {
			if (index !== 0) {
				// console.log("VALUE" + all[index].lastChild.value);
				// console.log("ID:" + all[index].lastChild.id);
				count += checkProdType(all[index].lastChild.value, all[index].lastChild.id, "productName", moneyProducts);
			}
		});
		return count;
	}

	const v12 = () => {
		let all = document.querySelectorAll(".product__weight div");
		let count = 0;
		all.forEach((element, index) => {
			if (index !== 0) {
				// console.log("VALUE" + all[index].lastChild.value);
				// console.log("ID:" + all[index].lastChild.id);
				count += checkProdType(all[index].lastChild.value, all[index].lastChild.id, "weight", moneyByWeights);
			}
		});
		return count;
	}
	const v13 = () => {
		let all = document.querySelectorAll(".get__distance div");
		let count = 0;
		all.forEach((element, index) => {
			if (index !== 0) {
				// console.log("VALUE" + all[index].lastChild.value);
				// console.log("ID:" + all[index].lastChild.id);
				count += checkProdType(all[index].lastChild.value, all[index].lastChild.id, "distance", moneyByDistance);
			}
		});
		return count;
	}
	const v14 = () => {
		let all = document.querySelectorAll(".delivery_type div");
		let count = 0;
		all.forEach((element, index) => {
			if (index !== 0) {
				// console.log("VALUE" + all[index].lastChild.value);
				// console.log("ID:" + all[index].lastChild.id);
				count += checkProdType(all[index].lastChild.value, all[index].lastChild.id, "deliveryType", moneyDeliveryTypes);
			}
		});
		return count;
	}

	const settingCall = () => {
		// $.ajax
		// 	({
		// 		type: "POST",
		// 		url: urlForAll + "profile/settings",
		// 		data: JSON.stringify
		// 			({
		// 				"user_id": localStorage.getItem('userID'),
		// 				"sender_address": s_address,
		// 				"sender_lat": s_lat,
		// 				"sender_longi": s_longi
		// 			}),
		// 		headers:
		// 		{
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json',
		// 			"Authorization": 'Bearer ' + localStorage.getItem('token')
		// 		},
		// 		success: function (data) {
		// 			$('#tickDD2').hide();
		// 			$(".circle-loader").removeClass("load-complete");
		// 			$("#sureDD2").html("");
		// 			$("#myModalCreateDD1").modal('show');
		// 			$("#sureDD2").html("Please wait!");
		// 			if (data.status == 'OK') {
		// 				setTimeout(function () {
		// 					$(".circle-loader").addClass("load-complete");

		// 					$('#tickDD2').show();

		// 					$("#sureDD2").html("Organization Set!");
		// 				}, 2000);
		// 				setTimeout(function () {

		// 					$("#myModalCreateDD1").modal('hide');
		// 				}, 4000);


		// 				setTimeout(function () {

		// 					document.getElementById("formDD").reset();
		// 					$("#cod").hide();
		// 					$("#settings").hide();
		// 					$("#alreadySet").show();
		// 					location.hash = "#dashboardOrg";
		// 				}, 5000);

		// 			}
		// 		},
		// 		error: function (XMLHttpRequest, textStatus, errorThrown) {

		// 			$("#myModalCreateDD1").modal('hide');
		// 			$('#myModal2').modal('show');
		// 		}
		// 	})
	}

	if (v11() == 2 && v12() == 3 && v13() == 2 & v14() == 3 && v1() == 1 && v2() == 1 && v3() == 1) {
		console.log(JSON.stringify(moneyProducts));
		console.log(JSON.stringify(moneyByWeights));
		console.log(JSON.stringify(moneyByDistance));
		console.log(JSON.stringify(moneyDeliveryTypes));

		moneyProducts = JSON.stringify(moneyProducts);
		moneyByWeights = JSON.stringify(moneyByWeights);
		moneyByDistance = JSON.stringify(moneyByDistance);
		moneyDeliveryTypes = JSON.stringify(moneyDeliveryTypes);
		$.ajax
			({
				type: "POST",
				url: "http://206.189.128.203:8181/api/quixx/v1/delivery/metric/add/delivery/metric/1",
				data: {
					"moneyByDeliveryType": {
						"moneyDeliveryTypes": moneyDeliveryTypes
					},
					"moneyByDistance": {
						"moneyDistances": moneyByDistance
					},
					"moneyByWeight": {
						"moneyByWeights": moneyByWeights
					},
					"moneyProduct": {
						"moneyProducts": moneyProducts
					}
				},
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					// "Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					settingCall();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$("#myModalCreateDD1").modal('hide');
					$('#myModal2').modal('show');
				}
			})
	}
});