function one1x() {
	setTimeout(function () { $('#loaderMama3').fadeOut(); }, 2100);
}
function two2x() {
	setTimeout(function () { $('div#hideKoro3').removeClass("hidden"); $('#hideKoro3').fadeIn(); }, 2900);
}
function three3x() {
	$('#mapFormMer').hide();
	$('#passFormMer').hide();
	setTimeout(function () {
		document.getElementById('uporg1').disabled = true;
		document.getElementById('uporg1').style.fontSize = '13px';
		document.getElementById('uporg2').disabled = false;
		document.getElementById('uporg2').style.fontSize = '13px';
		$('#mapFormMer').show();
		$('#passFormMer').hide();
	}, 3700);
}