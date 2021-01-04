var map, infoWindow;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 23.8103, lng: 90.4125},
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
		success: function(data)
		{
			dataa=data;
		}
	});
	for (i = 0; i < dataa.data.length; i++) {  
		
		marker = new google.maps.Marker({
		position: new google.maps.LatLng(dataa.data[i].current_lat, dataa.data[i].current_longi),
		map: map,
		title: dataa.data[i].name
		
	  });
	  //console.log(locations[0][0]);
	  
	  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		  //infowindow.setContent('<p style="color:#0066b3"><b>Delivery Man</b>:<br>'+dataa.data[i].name+'<br><br>'+"<button style='margin:5px;' class='content1 btn-round btn-outline btn' id="+dataa.data[i].current_lat+" name="+dataa.data[i].current_longi+" onclick=details(this);>Delivery Details</button><button style='margin:5px;' class='content2 btn-round btn-outline btn' id="+dataa.data[i].current_lat+" name="+dataa.data[i].current_longi+" onclick=details(this);>Delivery Man Details</button>");
		  infowindow.setContent('<p style="color:#0066b3"><b>Delivery Man</b>:<br>'+dataa.data[i].name+''+"");
		  infowindow.open(map, marker);
		}
	  })(marker, i));
	}		
}

function details(abc){
	var name_element = abc.id;
	var name_element2 = abc.name;
	
	localStorage.setItem("latValue", name_element);
	localStorage.setItem("lngValue", name_element2);
	window.open("delivery_location.html");
}

var deliveryManOnMap = () => 
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#map').show();
}

var deliveryManWithProduct = () =>
{
	$('#map').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	var table = $('#dtBasicExample').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
	$.ajax
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
		success: function(data) 
		{
			//console.log(data);
			document.getElementById('one').innerHTML = 'Details of Deliveries and Delivery Man: ' + data.data.length;
				
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
		}
	});
	
	$('.dataTables_filter input[type="search"]').
	attr('placeholder','Search anything!').
	css({'width':'300px','display':'inline-block','background':'white'});

	$('.dataTables_filter input[type="search"]').
	attr('class','btn btn-round').
	css({'width':'300px','display':'inline-block','color':'#000000','background':'#FFFFFA'});

	$('.dataTables_length select').
	attr('class','btn btn-round').
	css({'width':'80px','background-color':'white','color':'#000000','background':'#FFFFFA'});
	$('#dtBasicExample').show();
	$('.a').show();
}

var detailDelivery = (deliveryData) => {
	window.open("deliveryManOnMapAndDetails.html" + "#" +deliveryData.id);
}