var managerID = localStorage.getItem('userID');;
$(document).ready(function () {
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "#login";
		}
	});
	$('#deliveryManCreate').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	if (localStorage.getItem("ccdm") == 'false') {
		document.getElementById("createDeliveryMann").disabled = true;
	}
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	$('#managers')
		.empty()
		.append('<option selected="selected" value=' + localStorage.getItem('managerEmail') + '>' + localStorage.getItem('managerEmail') + '</option>');

});