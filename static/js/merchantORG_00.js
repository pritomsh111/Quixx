function one1() {
	setTimeout(function () { $('#loaderMama').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro').removeClass("hidden"); $('#hideKoro').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(() => {
		clearTimeout(interVal);
	}, 1000);
	setTimeout(function () {
		document.getElementById('one').disabled = true;
		document.getElementById('two').disabled = false;
		document.getElementById('three').disabled = false;
		document.getElementById('one').style.fontSize = '13px';
		document.getElementById('two').style.fontSize = '13px';
		document.getElementById('three').style.fontSize = '13px';
		document.getElementById('three').innerHTML = 'Unapproved Merchant';
		document.getElementById('two').innerHTML = 'Approved Merchant';

		document.getElementById('four').style.fontSize = '13px';
		document.getElementById('four').innerHTML = 'Activated Merchant';
		document.getElementById('four').disabled = false;

		document.getElementById('five').style.fontSize = '13px';
		document.getElementById('five').innerHTML = 'Disabled Merchant';
		document.getElementById('five').disabled = false;
		$('#dtBasicExample').hide();
		$('#dtBasicExample2').hide();
		$('#dtBasicExampleActivate').hide();
		$('#dtBasicExampleDisable').hide();
		$('.a').hide();
		$('.b').hide();
		$('.c').hide();
		$('.d').hide();
		$('#merchantCreate').show();
	}, 3700);
}