$(document).ready(function() {
	window.addEventListener('storage', function(event){
				if (event.key == 'logout-event') { 
					window.location.href="/assets#login";
				}
		});
	
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
	if(localStorage.getItem("ccd")=='false')
	{
		document.getElementById("createDelivery12").disabled = true;
	}
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
} );

$('.timepicker-12-hr').wickedpicker({
	now: "00:00", //hh:mm 24 hour format only, defaults to current time
	twentyFour: false,  //Display 24 hour format, defaults to false
	upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
	downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
	close: 'wickedpicker__close', //The close class selector to use, for custom CSS
	hoverState: 'hover-state', //The hover state class to use, for custom CSS
	title: 'Select Time', //The Wickedpicker's title,
	showSeconds: false, //Whether or not to show seconds,
	timeSeparator: ' : ', // The string to put in between hours and minutes (and seconds)
	secondsInterval: 1, //Change interval for seconds, defaults to 1,
	minutesInterval: 1, //Change interval for minutes, defaults to 1
	beforeShow: null, //A function to be called before the Wickedpicker is shown
	afterShow: null, //A function to be called after the Wickedpicker is closed/hidden
	show: null, //A function to be called when the Wickedpicker is shown
	clearable: false, //Make the picker's input clearable (has clickable "x")
});
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
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 23.8103, lng: 90.4125},
	  zoom: 13,
	  mapTypeId: 'roadmap',
	  mapTypeControl: false,
	  fullscreenControl: false
	});
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

				//This is yout formatted address
				var marker = new google.maps.Marker({
				position: pos,
				map: map,
				icon: {
				  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
				},
				title: 'Your current location is : ' + results[0].formatted_address
				});
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
		map.setCenter(pos);
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
	
	var input = document.getElementById('pac-input');
	var input2 = document.getElementById('pac-input2');
	
	var searchBox = new google.maps.places.SearchBox(input);
	var searchBox2 = new google.maps.places.SearchBox(input2);
	
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map2.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
	  searchBox.setBounds(map.getBounds());
	});
	
	map2.addListener('bounds_changed', function() {
	  searchBox2.setBounds(map2.getBounds());
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
	
	
	var geocoder  = new google.maps.Geocoder();             
		var location  = new google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng());  
		geocoder.geocode({'latLng': location}, function (results, status) {
		if(status == google.maps.GeocoderStatus.OK) {           
		var add=results[0].formatted_address;
		//var a = evt.latLng.lat() + evt.latLng.lng();
			infowindow.setContent(add);
			
			document.getElementById('lat').value=myMarker.position.lat();
			document.getElementById('longi').value=myMarker.position.lng();
		}
		
		});
	
		
	google.maps.event.addListener(myMarker, 'dragend', function (evt) {
		//document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		contentString = '<p>Current Lat: ' + input + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		
		document.getElementById('lat').value=evt.latLng.lat();
		document.getElementById('longi').value=evt.latLng.lng();
		
		var geocoder  = new google.maps.Geocoder();             
		var location  = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());  
		geocoder.geocode({'latLng': location}, function (results, status) {
		if(status == google.maps.GeocoderStatus.OK) {           
		var add=results[0].formatted_address;
		//var a = evt.latLng.lat() + evt.latLng.lng();
			infowindow.setContent(add);
			
			//document.getElementById('PICKUP_ADDRESS').value=add;
			document.getElementById('pac-input').value=add;
		}
		
		});
		
		//infowindow.setContent(contentString);
	});
	
	
	
	google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
		//document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
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
		contentString2 = '<p>Current Lat: ' + input + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		
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
  
function removeMarkers(){
	for(var i=0; i<markers.length; i++){
		markers[i].setMap(null);
	}
}

function removeMarkers2(){
	for(var i=0; i<markers2.length; i++){
		markers2[i].setMap(null);
	}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
	
  }
function handleLocationError2(browserHasGeolocation, infoWindow2, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map2);
	
  }