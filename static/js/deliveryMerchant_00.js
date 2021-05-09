function one1() {
	setTimeout(function () { $('#loaderMama').fadeOut(); }, 2100);
}
function two2() {
	setTimeout(function () { $('div#hideKoro').removeClass("hidden"); $('#hideKoro').fadeIn(); }, 2900);
}
function three3() {
	setTimeout(function () {
		// document.getElementById('three').disabled = true;
		// document.getElementById('two').disabled = false;
		// document.getElementById('one').disabled = false;
		// document.getElementById('six').disabled = false;
		// document.getElementById('three').style.fontSize = '14.5px';
		// document.getElementById('two').style.fontSize = '13px';
		// document.getElementById('one').style.fontSize = '13px';
		// document.getElementById('six').style.fontSize = '13px';

		// document.getElementById('one').innerHTML = 'Ongoing Deliveries';
		// document.getElementById('two').innerHTML = 'Completed Deliveries';
		// document.getElementById('six').innerHTML = 'History of On Hold Deliveries';

		document.getElementById('three').disabled = true;
		document.getElementById('two').disabled = false;
		document.getElementById('three').style.fontSize = '14.5px';
		document.getElementById('two').style.fontSize = '13px';

		document.getElementById('three').innerHTML = 'Create Single Delivery';
		document.getElementById('two').innerHTML = 'Create Multiple Deliveries [Excel]';
		// $('#dtBasicExample').hide();
		// $('.a').hide();
		// $('#dtBasicExampleAp').hide();
		// $('#dtBasicExampleNew').hide();
		// $('.b').hide();
		// $('.c').show();
		// $('.d').hide();
		// $('.e').hide();
		// $('#dtBasicExampled').hide();
		$('#bulkD').hide();
		$("#deliveryCreate").show();
	}, 3700);
}