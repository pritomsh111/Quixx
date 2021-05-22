function one1() {
	setTimeout(function () { $('#loaderMama2').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro2').removeClass("hidden"); $('#hideKoro2').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(function () {
		document.getElementById('four').disabled = true;
		document.getElementById('twoa').disabled = false;
		document.getElementById('threea').disabled = false;
		document.getElementById('onea').disabled = false;
		document.getElementById('four').style.fontSize = '13px';
		document.getElementById('twoa').style.fontSize = '13px';
		document.getElementById('threea').style.fontSize = '13px';
		document.getElementById('onea').style.fontSize = '13px';

		document.getElementById('foura').style.fontSize = '13px';
		document.getElementById('fivea').style.fontSize = '13px';

		document.getElementById('foura').disabled = false;
		document.getElementById('fivea').disabled = false;
		$('#dtBasicExampleActivate').hide();
		$('#dtBasicExampleDisable').hide();
		$('.c').hide();
		$('.d').hide();

		document.getElementById('onea').innerHTML = 'Registered Delivery Man';
		document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
		document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
		document.getElementById('foura').innerHTML = 'Activated Delivery Man';
		document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';
		$('#dtBasicExample').hide();
		$('#dtBasicExample2').hide();
		$('.a').hide();
		$('.b').hide();
		$('#dtBasicExampleActivate').hide();
		$('#dtBasicExampleDisable').hide();
		$('.c').hide();
		$('.d').hide();
		$('#deliveryManCreate').show();
	}, 3700);
}