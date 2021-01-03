$(document).ready(function() {
	window.addEventListener('storage', function(event){
				if (event.key == 'logout-event') { 
					window.location.href="" + localStorage.getItem('NginxCode');
				}
			});
	
	$('#settings').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExample2').hide();
	$('.b').hide();
	$('#map').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
} );
