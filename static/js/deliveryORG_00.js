function one1() {
	setTimeout(function () { $('#loaderMama3').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro3').removeClass("hidden"); $('#hideKoro3').fadeIn(); }, 2900);
}
function three3() {
	if (interVal) {
		setTimeout(() => {
			clearTimeout(interVal);
		}, 1000);
	}
	setTimeout(function () {

		document.getElementById('quiccD').disabled = true;
		document.getElementById('threeb').disabled = false;
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
		$('.c').hide();
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
		$("#deliveryCreate").hide();
		$("#deliveryCreateQ").show();
	}, 3700);
}