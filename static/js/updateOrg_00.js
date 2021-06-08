function one1x() {
	setTimeout(function () { $('#loaderMama5').fadeOut(); }, 2100);
}
function two2x() {
	setTimeout(function () { $('div#hideKoro5').removeClass("hidden"); $('#hideKoro5').fadeIn(); }, 2900);
}
function three3x() {
	if (interVal) {
		setTimeout(() => {
			clearTimeout(interVal);
		}, 1000);
	}
	$('#mapForm').hide();
	$('#passForm').hide();
	setTimeout(function () {
		document.getElementById('uporg1').disabled = true;
		document.getElementById('uporg1').style.fontSize = '13px';
		document.getElementById('uporg2').disabled = false;
		document.getElementById('uporg2').style.fontSize = '13px';
		$('#mapForm').show();
		$('#passForm').hide();
	}, 3700);
}