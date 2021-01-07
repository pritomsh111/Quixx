$(document).ready(function () {

	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
	$('#settings').hide();
	$('#hideUpdate').hide();
	$('.container').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#merchantCreate').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();

	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
});