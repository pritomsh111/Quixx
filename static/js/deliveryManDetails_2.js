$(document).ready(function () {
	var mq = window.matchMedia("(min-width: 930px)");

	if (mq.matches) {

		var daynight = document.getElementById("map");
		daynight.style.height = "50%";
		daynight.style.width = "50%";
		daynight.style.marginLeft = "25%";
		daynight.style.marginRight = "25%";
		// window width is at least 500px
	} else {
		var daynight = document.getElementById("map");
		daynight.style.height = "20%";
		daynight.style.width = "70%";
		daynight.style.marginLeft = "15%";
		daynight.style.marginRight = "15%";
		// window width is less than 500px
	}
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round';
});