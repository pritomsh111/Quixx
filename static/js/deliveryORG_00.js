function one1() {
	setTimeout(function () { $('#loaderMama3').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro3').removeClass("hidden"); $('#hideKoro3').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(function () {

		document.getElementById('threeb').disabled = true;
		document.getElementById('twob').disabled = false;
		document.getElementById('oneb').disabled = false;
		document.getElementById('threeb').style.fontSize = '13px';
		document.getElementById('twob').style.fontSize = '13px';
		document.getElementById('oneb').style.fontSize = '13px';

		document.getElementById('twob').innerHTML = 'Assigned Deliveries';
		document.getElementById('oneb').innerHTML = 'Unassigned Deliveries';

		$('#dtBasicExample').hide();
		$('.a').hide();
		$('#dtBasicExampleAp').hide();
		$('#dtBasicExampleNew').hide();
		$('.b').hide();
		$('.c').show();
		$('.d').hide();
		$('.e').hide();
		$('#dtBasicExampled').hide();

		$('#dtBasicExampleNewf').hide();
		$('#dtBasicExampleNewg').hide();
		$('#dtBasicExampleNewh').hide();
		$('#dtBasicExampleNewi').hide();
		$('#dtBasicExampleNewj').hide();
		$('.f').hide();
		$('.g').hide();
		$('.h').hide();
		$('.i').hide();
		$('.j').hide();
		$("#bulkD").hide();
		$("#deliveryCreate").show();
		$.ajax
			({
				url: urlForAll + "orgHead/get/merchants/info/" + org_ID,
				type: "GET",
				async: true,
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},

				success: function (data) {
					dataInfo = data;
					$('#senderList')
						.empty()
						.append('<option selected="selected" value="">Choose Sender</option>')
						;
					for (var i = 0; i < data.data.merchants_info.length; i++) {
						if (i == 0) {
							saveIT = data.data.merchants_info[i].profileDto.user_id;
						}
						var option = new Option(data.data.merchants_info[i].profileDto.user_id, data.data.merchants_info[i].profileDto.user_id);
						$(option).html(data.data.merchants_info[i].merchantName);
						$("#senderList").append(option);
					}
					$('#senderList')
						.append('<option value="' + org_ID + '">Organization Head</option>')
						;
					$("#delivery_charge").attr('placeholder', "1000");
					document.getElementById('delivery_charge').value = "";
					document.getElementById('D_charge').innerHTML = "Delivery Charge [BDT]:";
				}
			});
	}, 3700);
}