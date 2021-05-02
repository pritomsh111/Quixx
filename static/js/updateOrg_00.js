function one1() {
	setTimeout(function () { $('#loaderMama5').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro5').removeClass("hidden"); $('#hideKoro4').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(function () {
		document.getElementById('uporg1').disabled = true;
		document.getElementById('uporg1').style.fontSize = '14.5px';
		document.getElementById('uporg2').disabled = false;
		document.getElementById('uporg2').style.fontSize = '13px';
		$('#mapForm').show();
		$('#passForm').hide();
	}, 3700);
}