$(document).ready(function() {

	window.addEventListener('storage', function(event){
				if (event.key == 'logout-event') { 
					window.location.href="/assets#login";
				}
			});
	$('.container').hide();
	$('#dtBasicExample').hide();
	$('#managerCreate').hide();
	$('.a').hide();
	
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
} );