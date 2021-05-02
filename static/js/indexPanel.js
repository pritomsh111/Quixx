$(document).ready(function () {
	md.initDashboardPageCharts();
});
function dashio() {
	var user = localStorage.getItem('user');
	var dash;
	if (user == 'SUPER_ADMIN') {
		dash = 'dashboard'
	} else if (user == 'ORGANIZATIONAL_ADMIN') {
		dash = 'dashboardOrg'
	} else if (user == 'MANAGER') {
		dash = 'dashboardMan'
	} else if (user == 'MERCHANT') {
		dash = 'dashboardMer'
	}
	if (window.location.hash.substr(1) != dash) {
		$(".nav").find(".active").removeClass("active");
		window.location.hash = dash;
	}
};