$(function () {
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
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round';
});