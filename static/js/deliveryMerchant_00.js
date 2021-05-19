function one1() {
	setTimeout(function () { $('#loaderMama').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro').removeClass("hidden"); $('#hideKoro').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(function () {
		document.getElementById('three').disabled = false;
		document.getElementById('threeQ').disabled = true;
		document.getElementById('two').disabled = false;
		document.getElementById('twox').disabled = false;
		document.getElementById('three').style.fontSize = '13px';
		document.getElementById('threeQ').style.fontSize = '14.5px';
		document.getElementById('two').style.fontSize = '13px';
		document.getElementById('twox').style.fontSize = '13px';

		document.getElementById('threeQ').innerHTML = 'Quick Delivery';
		document.getElementById('three').innerHTML = 'Detailed Delivery';
		document.getElementById('two').innerHTML = 'Multiple Deliveries [Excel]';
		document.getElementById('twox').innerHTML = 'Delivery List';
		$('#dtBasicExampled').hide();
		$('.d').hide();
		$("#deliveryCreateQ").show();
		$('#bulkDelivery').hide();
		$("#deliveryCreate").hide();
	}, 3700);
}