$(document).ready(function() {

	window.addEventListener('storage', function(event){
		if (event.key == 'logout-event') { 			
			window.location.href="" + localStorage.getItem('NginxCode');
		}
	});
	$('#settingsMer').hide();
	$("#cod").hide();
	$("#deliveryCreate").hide();
	$(".container").hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampled').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
} );

$('#managers')
	.empty();
$.ajax
({
	url: urlForAll+ "approved/delivery/area",
	type: "GET",
	
	headers: 
	{
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  "Authorization": 'Bearer ' + localStorage.getItem('token')
	},
	
	success: function(data)
	{
		for(var i = 0; i < data.data.length ; i++)
		{
			var option = new Option(data.data[i], data.data[i]);
			$(option).html(data.data[i]);
			$("#managers").append(option);
		}
	}
} );
$('#managers2')
		.empty();
	$.ajax
	({
		url: urlForAll+ "delivery/payment/method/" + localStorage.getItem('token'),
		type: "GET",
		
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		
		success: function(data)
		{
			for(var i = 0; i < data.data.length ; i++)
			{
				var option = new Option(data.data[i], data.data[i]);
				$(option).html(data.data[i]);
				$("#managers2").append(option);
			}
		}
	} );

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
		success: function(data) 
		{
			if (data.status == 'OK')
			{
				var map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi)},
				zoom: 13,
				mapTypeId: 'roadmap',
				mapTypeControl: false,
				fullscreenControl: false
				});
				myMarker = new google.maps.Marker({
				position: {lat: parseFloat(data.data.sender_lat), lng: parseFloat(data.data.sender_longi)},
				map: map});
				
				document.getElementById('pac-input').value = data.data.sender_address;
				document.getElementById('s_name').value = data.data.sender_name;
				document.getElementById('s_number').value = data.data.sender_phone_number;
				document.getElementById('lat').value = data.data.sender_lat;
				document.getElementById('longi').value = data.data.sender_longi;
				document.getElementById('delivery_charge').value = data.data.per_delivery_cost;
				
				document.getElementById('senLatLong').innerHTML =
				`Sender's Address: ${data.data.sender_address}<br>
				Sender's Name: ${data.data.sender_name}<br>
				Sender's Phone Number: ${data.data.sender_phone_number}<br>
				Sender's Lattitude: ${data.data.sender_lat}<br>
				Sender's Longitude: ${data.data.sender_longi}<br>`;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
			$('#myModal2').modal('show');
		}
	})
	var map2 = new google.maps.Map(document.getElementById('map2'), {
	  center: {lat: 23.8103, lng: 90.4125},
	  zoom: 13,
	  mapTypeId: 'roadmap',
	  mapTypeControl: false,
	  fullscreenControl: false
	});
	
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
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
	  }, function() {
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


	map2.addListener('bounds_changed', function() {
	  searchBox2.setBounds(map2.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	
	
	
	
	//NewMAP
	searchBox2.addListener('places_changed', function() {
	  var places = searchBox2.getPlaces();

	  if (places.length == 0) {
		return;
	  }

	  // Clear out the old markers.
	  
	  // For each place, get the icon, name and location.
	  var bounds = new google.maps.LatLngBounds();
	  places.forEach(function(place) {
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
	
	
	var geocoder  = new google.maps.Geocoder();             
		var location  = new google.maps.LatLng(myMarker2.position.lat(), myMarker2.position.lng());  
		geocoder.geocode({'latLng': location}, function (results, status) {
		if(status == google.maps.GeocoderStatus.OK) {           
		var add=results[0].formatted_address;
		//var a = evt.latLng.lat() + evt.latLng.lng();
			infowindow2.setContent(add);
			
			document.getElementById('des_lat').value=myMarker2.position.lat();
			document.getElementById('des_longi').value=myMarker2.position.lng();
		}
		
		});
	
		
	google.maps.event.addListener(myMarker2, 'dragend', function (evt) {
		//document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		contentString2 = '<p>Current Lat: ' + input2 + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		
		document.getElementById('des_lat').value=evt.latLng.lat();
		document.getElementById('des_longi').value=evt.latLng.lng();
		
		var geocoder  = new google.maps.Geocoder();
		var location  = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());  
		geocoder.geocode({'latLng': location}, function (results, status) {
		if(status == google.maps.GeocoderStatus.OK) {           
		var add=results[0].formatted_address;
		//var a = evt.latLng.lat() + evt.latLng.lng();
			infowindow2.setContent(add);
			
			//document.getElementById('DESTINATION_ADDRESS').value=add;
			document.getElementById('pac-input2').value=add;
		}
		
		});
		
		//infowindow.setContent(contentString);
	});
	
	
	
	google.maps.event.addListener(myMarker2, 'dragstart', function (evt) {
		//document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
	});
	
	myMarker2.addListener('click', function() {
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
  

function removeMarkers2(){
	for(var i=0; i<markers2.length; i++){
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