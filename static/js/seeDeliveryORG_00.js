function one1(){
	setTimeout(function() { $('#loaderMama4').fadeOut(); }, 2100);
}
function two2(){
	setTimeout(function() { $('div#hideKoro4').removeClass("hidden");$('#hideKoro4').fadeIn(); }, 2900);
}
function three3(){
	setTimeout(function() {
		document.getElementById('onec').disabled = false;
		document.getElementById('twoc').disabled = true;
		document.getElementById('twoc').style.fontSize = '14.5px';
		document.getElementById('onec').style.fontSize = '13px';
		document.getElementById('onec').innerHTML = 'Details of Delivery and Delivery Man';
		$('#dtBasicExample').hide();
		$('.a').hide();
		$('#map').show();
		$('#dtBasicExample2').hide();
		$('.b').hide();
	}, 3700);
}