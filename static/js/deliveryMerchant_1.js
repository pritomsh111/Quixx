var myMarker,myMarker2,infowindow,infowindow2,contentString,contentString2;$(document).ready((function(){window.addEventListener("storage",(function(e){"logout-event"==e.key&&(window.location.href=""+localStorage.getItem("wh-user"))})),$("#settingsMer").hide(),$("#cod").hide(),$("#deliveryCreate").hide(),$(".container").hide(),$("#dtBasicExample").hide(),$(".a").hide(),$("#dtBasicExampleAp").hide(),$("#dtBasicExampled").hide(),$("#dtBasicExampleNew").hide(),$(".b").hide(),$(".c").hide(),$(".d").hide(),$(".e").hide(),$.fn.dataTable.ext.classes.sPageButton="btn btn-outline btn-round"})),$("#managers").empty(),$.ajax({url:urlForAll+"approved/delivery/area",type:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},success:function(e){for(var t=0;t<e.data.length;t++){var n=new Option(e.data[t],e.data[t]);$(n).html(e.data[t]),$("#managers").append(n)}}}),$("#managers2").empty(),$.ajax({url:urlForAll+"delivery/payment/method/"+localStorage.getItem("token"),type:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},success:function(e){for(var t=0;t<e.data.length;t++){var n=new Option(e.data[t],e.data[t]);$(n).html(e.data[t]),$("#managers2").append(n)}}});var markers=[],markers2=[];function initAutocomplete(){$.ajax({async:!0,type:"GET",url:urlForAll+"profile/get/profile/"+localStorage.getItem("userID"),headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},success:function(e){if("OK"==e.status){var t=new google.maps.Map(document.getElementById("map"),{center:{lat:parseFloat(e.data.sender_lat),lng:parseFloat(e.data.sender_longi)},zoom:13,mapTypeId:"roadmap",mapTypeControl:!1,fullscreenControl:!1});myMarker=new google.maps.Marker({position:{lat:parseFloat(e.data.sender_lat),lng:parseFloat(e.data.sender_longi)},map:t}),document.getElementById("pac-input").value=e.data.sender_address,document.getElementById("s_name").value=e.data.sender_name,document.getElementById("s_number").value=e.data.sender_phone_number,document.getElementById("lat").value=e.data.sender_lat,document.getElementById("longi").value=e.data.sender_longi,document.getElementById("delivery_charge").value=e.data.per_delivery_cost,document.getElementById("senLatLong").innerHTML=`Sender's Address: ${e.data.sender_address}<br>\n\t\t\t\tSender's Name: ${e.data.sender_name}<br>\n\t\t\t\tSender's Phone Number: ${e.data.sender_phone_number}<br>\n\t\t\t\tSender's Lattitude: ${e.data.sender_lat}<br>\n\t\t\t\tSender's Longitude: ${e.data.sender_longi}<br>`}},error:function(e,t,n){$("#myModal2").modal("show")}});var e=new google.maps.Map(document.getElementById("map2"),{center:{lat:23.8103,lng:90.4125},zoom:13,mapTypeId:"roadmap",mapTypeControl:!1,fullscreenControl:!1});navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(t){var n={lat:t.coords.latitude,lng:t.coords.longitude};(new google.maps.Geocoder).geocode({location:n},(function(t,o){if("OK"===o)if(t[0])new google.maps.Marker({position:n,map:e,icon:{url:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},title:"Your current location is : "+t[0].formatted_address});else window.alert("No results found");else window.alert("Geocoder failed due to: "+o)})),e.setCenter(n)}),(function(){}));var t=document.getElementById("pac-input2"),n=new google.maps.places.SearchBox(t);e.controls[google.maps.ControlPosition.TOP_LEFT].push(t),e.addListener("bounds_changed",(function(){n.setBounds(e.getBounds())})),n.addListener("places_changed",(function(){var o=n.getPlaces();if(0!=o.length){var a=new google.maps.LatLngBounds;o.forEach((function(n){if(n.geometry){removeMarkers2(),myMarker2=new google.maps.Marker({position:n.geometry.location,draggable:!0}),markers2.push(myMarker2),contentString2="<p>Drag marker...</p>",infowindow2=new google.maps.InfoWindow({content:contentString2});var o=new google.maps.Geocoder,r=new google.maps.LatLng(myMarker2.position.lat(),myMarker2.position.lng());o.geocode({latLng:r},(function(e,t){if(t==google.maps.GeocoderStatus.OK){var n=e[0].formatted_address;infowindow2.setContent(n),document.getElementById("des_lat").value=myMarker2.position.lat(),document.getElementById("des_longi").value=myMarker2.position.lng()}})),google.maps.event.addListener(myMarker2,"dragend",(function(e){contentString2="<p>Current Lat: "+t+" Current Lng: "+e.latLng.lng().toFixed(3)+"</p>",document.getElementById("des_lat").value=e.latLng.lat(),document.getElementById("des_longi").value=e.latLng.lng();var n=new google.maps.Geocoder,o=new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());n.geocode({latLng:o},(function(e,t){if(t==google.maps.GeocoderStatus.OK){var n=e[0].formatted_address;infowindow2.setContent(n),document.getElementById("pac-input2").value=n}}))})),google.maps.event.addListener(myMarker2,"dragstart",(function(e){})),myMarker2.addListener("click",(function(){infowindow2.open(e,myMarker2)})),e.setCenter(myMarker2.position),myMarker2.setMap(e),n.geometry.viewport?a.union(n.geometry.viewport):a.extend(n.geometry.location)}})),e.fitBounds(a)}}))}function removeMarkers2(){for(var e=0;e<markers2.length;e++)markers2[e].setMap(null)}function handleLocationError2(e,t,n){infoWindow.setPosition(n),infoWindow.setContent(e?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation."),infoWindow.open(map2)}