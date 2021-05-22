var dataIncom, percentage;
var merchant_ID = localStorage.getItem('userID');
function one1() {
	setTimeout(function () { $('#loaderMama2').fadeOut(); }, 2200);
}
function two2() {
	setTimeout(function () { $('div#hideKoro2').removeClass("hidden"); $('#hideKoro2').fadeIn(); }, 2900);
}
function three3() {

	$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType: 'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "merchant/cod/charge/" + merchant_ID,
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				percentage = data.data;
				mainFunc();
			}
		})
}
function mainFunc() {
	setTimeout(function () {

		document.getElementById('body').style.pointerEvents = "none";
		document.getElementById('onea').disabled = true;
		document.getElementById('twoa').disabled = false;
		document.getElementById('onea').style.fontSize = '13px';
		document.getElementById('twoa').style.fontSize = '13px';
		document.getElementById('twoa').innerHTML = 'Due From Completed Deliveries';
		$('#dtBasicExample').hide();
		//$('.a').hide();
		$('#dtBasicExampleAp').hide();
		$('#dtBasicExampleNew').hide();
		//$('.b').hide();
		$('.c').hide();
		$('.d').hide();
		$('.e').hide();
		$('#dtBasicExampled').hide();
		var table = $('#dtBasicExampled').DataTable({
			responsive: {
				details: {
					renderer: function (api, rowIdx, columns) {
						var data = $.map(columns, function (col, i) {
							return col.hidden ?
								'<tr style="text-align:left" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
								'<td><strong>' + col.title + ':' + '</strong></td> ' +
								'<td>' + col.data + '</td>' +
								'</tr>' :
								'';
						}).join('');
						return data ?
							$('<table/>').append(data) :
							false;
					}
				}
			},
			"processing": true,
			'language': {
				'loadingRecords': '&nbsp;',
				'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
			},
			"destroy": true,
			"oSearch": { "bSmart": false, "bRegex": true }
		});
		table.clear().draw();

		$.ajax
			({
				type: "GET",
				url: urlForAll + "merchant/deliveryData/basedOnDate/incomplete/" + merchant_ID,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				beforeSend: function () {
					document.getElementById("dtBasicExampled_processing").style.display = "block";
				},
				success: function (data) {
					dataIncom = data.data;
					document.getElementById('onea').innerHTML = 'Due From Incomplete Deliveries: ' + data.data.length;

					var trHTML = '';
					$.each(data.data, function (i, item) {
						var keys = Object.keys(item);

						//console.log(keys[0]);
						//console.log(item[keys[0]][i]);
						//console.log(data.data[i][keys[0]]);
						var sum = 0, sum2 = 0, sum3 = 0;

						for (var j = 0; j < data.data[i][keys[0]].length; j++) {
							if (data.data[i][keys[0]][j].payment_method == "Cash on Delivery") {
								var b = parseInt(data.data[i][keys[0]][j].delivery_charge);
								var g = (parseInt(data.data[i][keys[0]][j].product_cost) * parseInt(data.data[i][keys[0]][j].product_qty));
								sum += g - ((g * percentage) / 100);;
								sum2 += g;
								sum3 += ((g * percentage) / 100);
							}
						}
						var table_rows =
							'<tr><td>' + keys[0] + '</td><td>'
							//+data.data[i].assigned_delivery_man_name+'</td><td>'
							+ data.data[i][keys[0]].length + '</td><td>'
							+ sum2 + '</td><td>'
							+ `${percentage}%` + '</td><td>'
							+ sum3 + '</td><td>'
							+ sum + '</td><td>'
							+ '<button id="' + keys[0] + '" name="' + i + '" class="btn-round btn-outline btn" onclick="show(this)">Details</button>'
							+ '</td></tr>';

						table.rows.add($(table_rows)).draw();
					});
				},
				complete: function (data) {
					table.responsive.recalc();
					document.getElementById('body').style.pointerEvents = "auto";
					document.getElementById("dtBasicExampled_processing").style.display = "none";
				}
			});
		modalStyle();
		$('.d').show();
		$('#dtBasicExampled').show();
	}, 3700);
}

function modalStyle() {
	$('.dataTables_filter input[type="search"]').
		attr('placeholder', 'Search anything!').
		css({ 'width': '200px', 'display': 'inline-block', 'background': 'white' });

	$('.dataTables_filter input[type="search"]').
		attr('class', 'btn btn-round').
		css({ 'width': '200px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

	$('.dataTables_length select').
		attr('class', 'btn btn-round').
		css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
}