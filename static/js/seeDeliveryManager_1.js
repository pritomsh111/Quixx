$(document).ready(function () {

	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "/#login";
		}
	});
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#map').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
});