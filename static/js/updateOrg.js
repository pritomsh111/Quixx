$(document).ready(function () {
	$("#settings").hide();
});

var myMarker, myMarker2, infowindow, infowindow2, contentString, contentString2;
var markers = [];
var markers2 = [];

function addressUpdate() {
	document.getElementById('uporg1').disabled = true;
	document.getElementById('uporg1').style.fontSize = '14.5px';
	document.getElementById('uporg2').disabled = false;
	document.getElementById('uporg2').style.fontSize = '13px';
	$('#mapForm').show();
	$('#passForm').hide();
}
function passUpdate() {
	document.getElementById('uporg2').disabled = true;
	document.getElementById('uporg2').style.fontSize = '14.5px';
	document.getElementById('uporg1').disabled = false;
	document.getElementById('uporg1').style.fontSize = '13px';
	$('#mapForm').hide();
	$('#passForm').show();
}

var buttonUpdate = document.getElementById('modalUpdateAA');
$(".toggle-password").click(function () {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});

function milse() {
	var agerPass = document.getElementById("password-field1").value;
	var msg = document.getElementById("msg").innerHTML;
	if (agerPass.length > 0 && msg == "Password Matched!") {
		buttonUpdate.disabled = false;
	}
	else {
		buttonUpdate.disabled = true;
	}
}

$('#password-field2').on('keyup', function () {
	var pas3 = document.getElementById('password-field2').value;
	if ($(this).val().length >= 8 && $(this).val() == $('#password-field3').val()) {
		$('#msg').html('Password Matched!').css('color', 'green');

		var agerPass = document.getElementById("password-field1").value;

		if (agerPass.length > 0) {
			buttonUpdate.disabled = false;
		}
		else {
			buttonUpdate.disabled = true;
		}
	}
	else if (pas3.length > 0) {
		buttonUpdate.disabled = true;
		$('#msg').html('Password Do Not Match!').css('color', 'red');
	}
});

$('#password-field3').on('keyup', function () {
	if ($(this).val().length >= 8 && $(this).val() == $('#password-field2').val()) {
		$('#msg').html('Password Matched!').css('color', 'green');
		var agerPass = document.getElementById("password-field1").value;
		if (agerPass.length > 0) {
			buttonUpdate.disabled = false;
		}
		else {
			buttonUpdate.disabled = true;
		}
	}
	else {
		buttonUpdate.disabled = true;
		$('#msg').html('Password Do Not Match!').css('color', 'red');
	}
});

$('.btn-ok1k').click(function () {
	$("#myModalFor").modal('show');
	document.getElementById('modalCancelA').disabled = true;
	document.getElementById('modalUpdateAA').disabled = true;
	$('#tick223').hide();
	$(".circle-loader2").removeClass("load-complete2");
	$(".circle-loader2").show();
	$("#sure223").html("Please wait!");
	$.ajax
		({
			type: "PUT",
			url: urlForAll + "approved/change/password/" + localStorage.getItem('userID'),
			data: JSON.stringify
				({
					"prev_password": document.getElementById('password-field1').value,
					"new_password": document.getElementById('password-field2').value,
					"confirm_password": document.getElementById('password-field3').value
				}),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.status == 'OK') {
					setTimeout(function () {
						$(".circle-loader2").addClass("load-complete2");

						$('#tick223').show();
						$('#msg').html("");

						$("#sure223").html("Password Updated!");
					}, 1000);
					document.getElementById('password-field1').value = "";
					document.getElementById('password-field2').value = "";
					document.getElementById('password-field3').value = "";
					setTimeout(function () {
						$("#myModalFor").modal('hide');
						document.getElementById('modalCancelA').disabled = false;
						document.getElementById('modalUpdateAA').disabled = false;
					}, 2000);
				}
			},
			error: function (data) {
				document.getElementById('modalCancelA').disabled = false;
				document.getElementById('modalUpdateAA').disabled = false;
				$(".circle-loader2").hide();
				$('#tick223').hide();
				var ob = Object.keys(data);
				if (ob[17] == "responseJSON") {
					$("#sure223").html(data.responseJSON.errorMessage);
				}
				else {
					$("#sure223").html("Please wait, We're Working!");
				}
			}
		})
});

function initAutocomplete() {
	var datap;
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
				datap = data;
				/*myMarker = new google.maps.Marker({
				position: {lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi)},
				map: map});*/

				document.getElementById('sender_address').value = data.data.sender_address;
				document.getElementById('pac-input').value = data.data.sender_address;
				document.getElementById('lat').value = data.data.sender_lat;
				document.getElementById('longi').value = data.data.sender_longi;
				document.getElementById('operations_manager_number').value = data.data.operations_manager_number ? data.data.operations_manager_number : "";
				var map = new google.maps.Map(document.getElementById('map'), {
					center: { lat: 23.8103, lng: 90.4125 },
					zoom: 13,
					mapTypeId: 'roadmap',
					mapTypeControl: false,
					fullscreenControl: false
				});
				var iconBase =
					'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

				var icons = {
					info: {
						icon: iconBase + 'info-i_maps.png'
					}
				};

				var features = [
					{
						position: { lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi) },
						type: 'info'
					}
				];

				// Create markers.
				for (var i = 0; i < features.length; i++) {
					var marker = new google.maps.Marker({
						position: features[i].position,
						icon: {
							url: "static/img/p5.png"
						},
						map: map
					});
				};

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
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {

				$('#myModal2').modal('show');
			}
		})
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
	var operations_manager_number = document.querySelector("#operations_manager_number").value;
	var s_address = document.getElementById('sender_address').value;
	var g_address = document.getElementById('pac-input').value;
	var s_lat = String(document.getElementById('lat').value);
	var s_longi = String(document.getElementById('longi').value);
	var v0 = () => {
		if (operations_manager_number === "") {
			document.getElementById('wrongThisMerSet').innerHTML = "Phone Number cannot be empty!";
			$('#myModalWrongMerSet').modal('show');
			return 0;
		}
		else if ((operations_manager_number.length < 11 || operations_manager_number.length > 11)) {
			document.getElementById('wrongThisMerSet').innerHTML = "Phone Number must be of 11 digits!";
			$('#myModalWrongMerSet').modal('show');
			return 0;
		}
		else if (operations_manager_number.match(/\d/g).length === 11 && !/\D/.test(operations_manager_number) === true) {
			return 1;
		}
		else {
			document.getElementById('wrongThisMerSet').innerHTML = "Phone Number Not Valid";
			$('#myModalWrongMerSet').modal('show');
			return 0;
		}
	}
	var v1 = () => {
		if (s_address == "" || s_address == null) {
			document.getElementById('wrongThisMerSet').innerHTML = "Address cannot be empty!";
			$('#myModalWrongMerSet').modal('show');
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

	if (v1() == 1 && v2() == 1 && v3() == 1) {
		$.ajax
			({
				type: "PUT",
				url: urlForAll + "profile/update/settings",
				data: JSON.stringify
					({
						"user_id": localStorage.getItem('userID'),
						"operations_manager_number": operations_manager_number,
						"sender_address": s_address,
						"sender_lat": s_lat,
						"sender_longi": s_longi
					}),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					$('#tickDD2').hide();
					$(".circle-loader").removeClass("load-complete");
					$("#sureDD2").html("");
					$("#myModalCreateDD1").modal('show');
					$("#sureDD2").html("Please wait!");
					if (data.status == 'OK') {
						setTimeout(function () {
							$(".circle-loader").addClass("load-complete");

							$('#tickDD2').show();

							$("#sureDD2").html("Organization Settings Updated!");
						}, 2000);
						setTimeout(function () {
							$("#myModalCreateDD1").modal('hide');
						}, 3000);
						$("#cod").hide();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					$("#myModalCreateDD1").modal('hide');
					$('#myModal2').modal('show');
				}
			})
	}
});