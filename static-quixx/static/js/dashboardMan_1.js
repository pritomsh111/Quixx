$(document).ready(function() {
	window.addEventListener('storage', function(event){
				if (event.key == 'logout-event') { 
					window.location.href="/assets#login";
				}
		});
} );