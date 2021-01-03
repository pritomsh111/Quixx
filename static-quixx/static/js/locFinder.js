var myMarker, infowindow , contentString ;
var markers = [];
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
function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 23.8103, lng: 90.4125},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: true,
		fullscreenControl: false,
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
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
	  searchBox.setBounds(map.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	
	
	
	searchBox.addListener('places_changed', function() {
	  var places = searchBox.getPlaces();

	  if (places.length == 0) {
		return;
	  }

	  // Clear out the old markers.
	  
	  // For each place, get the icon, name and location.
	  var bounds = new google.maps.LatLngBounds();
	  places.forEach(function(place) {
		if (!place.geometry) {
		  console.log("Returned place contains no geometry");
		  return;
		}
		
		// Create a marker for each place.
		removeMarkers();
		myMarker = new google.maps.Marker({
		position: place.geometry.location,
		draggable: true
	});
	markers.push(myMarker);
	
	contentString = '<p>Drag marker...</p>';
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
	var geocoder  = new google.maps.Geocoder();             
	var location  = new google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng());  
	document.getElementById('current').innerHTML = '<p>Marker dropped<br><br>Current Lattitude: ' + myMarker.position.lat().toFixed(3) + '<br>Current Longitude: ' + myMarker.position.lng().toFixed(3) + '</p>';
	document.getElementById('current').innerHTML += '<br><p>Please Give Exact Value Of Lattitude, Longitude &amp; Receiver\'s Area On Excel</p>';
		
	geocoder.geocode({'latLng': location}, function (results, status) {
	if(status == google.maps.GeocoderStatus.OK) {           
	var add=results[0].formatted_address;
	//var a = evt.latLng.lat() + evt.latLng.lng();
		infowindow.setContent(add);
	}
	
	});

		
	google.maps.event.addListener(myMarker, 'dragend', function (evt) {
		document.getElementById('current').innerHTML = '<p>Marker dropped!<br><br>Current Lattitude: ' + evt.latLng.lat().toFixed(3) + '<br>Current Longitude: ' + evt.latLng.lng().toFixed(3) + '</p>';
		document.getElementById('current').innerHTML += '<br><p>Please Give Exact Value Of Lattitude, Longitude &amp; Receiver\'s Area On Excel</p>';
	
		contentString = '<p>Current Lattitude: ' + evt.latLng.lat().toFixed(3) + ' Current Longitude: ' + evt.latLng.lng().toFixed(3) + '</p>';
		
		
		var geocoder  = new google.maps.Geocoder();             
		var location  = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());  
		geocoder.geocode({'latLng': location}, function (results, status) {
		if(status == google.maps.GeocoderStatus.OK) {           
		var add=results[0].formatted_address;
		//var a = evt.latLng.lat() + evt.latLng.lng();
			infowindow.setContent(add);
			document.getElementById('pac-input').value=add;
		}
		
		});
		
		//infowindow.setContent(contentString);
	});
	
	
	
	google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
		document.getElementById('current').innerHTML = '<p>Marker Moving!!!<br><br>Current Lattitude: ' + '' + '<br>Current Longitude: ' + '' + '</p>';
		
	});
	
	myMarker.addListener('click', function() {
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
  
function removeMarkers(){
	for(var i=0; i<markers.length; i++){
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