$(document).ready(function () {
	$('#settingsMer').hide();
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "approved/isSetting/done/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.data == true) {
					a = '#dashboardMer';
					$('#settingsMer').hide();
					$('#alreadySet').show();
				}
				else {
					$('#alreadySet').hide();
					$('#settingsMer').show();
					a = '#settingsMer';
				}
				location.hash = a;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
});