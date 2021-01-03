$(document).ready(function() {
	
	window.addEventListener('storage', function(event){
		if (event.key == 'logout-event') { 
			window.location.href="" + localStorage.getItem('NginxCode');
		}
	});

	$('#settingsMer').hide();
	$(".container").hide();
	$('#dtBasicExample').hide();
	//$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampled').hide();
	$('#dtBasicExampleNew').hide();
	//$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
} );