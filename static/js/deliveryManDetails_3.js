var dataa, j = 0, urlID, marker, map;
var geocoder = new google.maps.Geocoder();
function initMap() {
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round';
	$.ajax
		({
			type: "GET",
			url: urlAjax,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				dataa = data;
				urlID = window.location.hash;
				urlID = urlID.substring(1);
				for (j = 0; j < dataa.data.length; j++) {
					if (urlID == dataa.data[j].delivery_man_id) {
						if (localStorage.getItem('user') == 'SUPER_ADMIN') {
							document.getElementById("deliveryManID").innerHTML = "Delivery Man: <b>" + dataa.data[j].name + "</b>";
						}
						else {
							document.getElementById("deliveryManID").innerHTML = "Delivery Man: <b>" + dataa.data[j].name + "</b>";
						}

						var latVal = dataa.data[j].current_lat;
						var lngVal = dataa.data[j].current_longi;
						var table = $('#dtBasicExample').DataTable({
							"processing": true,
							"destroy": true,
							"oSearch": { "bSmart": false, "bRegex": true }
						});
						table.clear().draw();
						var table4 = $('#dtBasicExample4').DataTable({
							"processing": true,
							"destroy": true,
							"oSearch": { "bSmart": false, "bRegex": true }
						});
						table4.clear().draw();

						var table2 = $('#dtBasicExampleB').DataTable({
							"processing": true,
							"destroy": true,
							"oSearch": { "bSmart": false, "bRegex": true }
						});
						table2.clear().draw();

						var table3 = $('#dtBasicExampleC').DataTable({
							"processing": true,
							"destroy": true,
							"oSearch": { "bSmart": false, "bRegex": true }
						});
						table3.clear().draw();
						var trHTML = '';
						var table_rows = '<tr><td>'
							+ dataa.data[j].name + '</td><td>'
							+ dataa.data[j].phone_number + '</td><td>'
							+ dataa.data[j].assign_delivery_count + '</td><td>'
							+ dataa.data[j].reporting_boss_email + ''
							+ '</td></tr>';

						table.rows.add($(table_rows)).draw();

						let delivery_district = dataa.data[j].delivery_district ? dataa.data[j].delivery_district : "";
						var table_rows = '<tr><td>'
							+ delivery_district + '</td><td>'
							+ dataa.data[j].delivery_area + '</td>'
							+ '</tr>';
						table4.rows.add($(table_rows)).draw();

						$.each(dataa.data[j].pickup_locations, function (i, item) {
							var table_rows =
								'<tr><td>'
								+ dataa.data[j].delivery_ids[i] + '</td><td>'
								+ dataa.data[j].pickup_locations[i] + '</td><td>'
								+ dataa.data[j].delivery_locations[i] + '</td><td>'
								+ dataa.data[j].delivery_status[i] + '</td><td>'
								+ "Product: " + dataa.data[j].product_name[i] + ",<br>Product Quantity: " + dataa.data[j].product_qty[i] + '</td><td>'
								+ dataa.data[j].created_delivery_name[i] + ", " + dataa.data[j].created_delivery_role[i] + '</td><td>'
								+ dataa.data[j].receiver_name[i] + ",<br>" + dataa.data[j].receiver_phone[i] + '</td>'
								+ '</tr>';

							table2.rows.add($(table_rows)).draw();
						});

						$.each(dataa.data[j].currently_working, function (i, item) {
							var array = dataa.data[j].currently_working[i].split("#");
							var table_rows = '<tr><td>'
								+ array[0] + '</td><td>'
								+ array[1] + '</td><td>'
								+ array[2] + '</td><td>'
								+ array[3] + '</td>'
								+ '</tr>';

							table3.rows.add($(table_rows)).draw();
						});
						$('.dataTables_filter input[type="search"]').
							attr('placeholder', 'Search anything!').
							css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

						$('.dataTables_filter input[type="search"]').
							attr('class', 'btn btn-round').
							css({ 'width': '220px', 'font-size': '12px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

						$('.dataTables_length select').
							attr('class', 'btn btn-round').
							css({ 'width': '75px', 'font-size': '12px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });

						$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
						break;
					}
				}

				var location = new google.maps.LatLng(latVal, lngVal);
				geocoder.geocode({ 'latLng': location }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var add = results[0].formatted_address;
						var contentString = add;

						infowindow = new google.maps.InfoWindow({
							content: '<p style="color:#0066b3;font-family:Didact Gothic;">' + contentString + '</p>'
						});

						map = new google.maps.Map(document.getElementById('map'), {
							center: new google.maps.LatLng(latVal, lngVal),
							zoom: 16,
							mapTypeId: 'roadmap',
							mapTypeControl: false,
							fullscreenControl: false
						});
						marker = new SlidingMarker({
							position: new google.maps.LatLng(latVal, lngVal),
							map: map,
							title: dataa.data[j].name,
							duration: 2000,
						});
						marker.addListener('click', function () {
							infowindow.open(map, marker);
						});
						dynamicDyliverManChange();
					}
				});
			}
		});

}

// var addKorbo = 0;
function dynamicDyliverManChange() {
	// addKorbo += 0.001;
	$.ajax
		({
			url: urlForAll + "deliveryMan/location/" + dataa.data[j].phone_number,
			type: "GET",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				//console.log(data);
				latlngx = new google.maps.LatLng(parseFloat(data.data.lat), parseFloat(data.data.longi));
				marker.setPosition(latlngx);
				map.panTo(latlngx);
				geocoder.geocode({ 'latLng': latlngx }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						curLoc = results[0].formatted_address;
						infowindow.setContent('<p style="color:#0066b3;font-family:Didact Gothic;">' + curLoc + '</p>');
						document.querySelector("#dmcp").innerHTML = `Delivery Man: <strong>${dataa.data[j].name}</strong>, Current Location: <strong>${curLoc}</strong>`;
					}
				});
				setTimeout(() => {
					dynamicDyliverManChange();
				}, 120000);
			}
		});
}