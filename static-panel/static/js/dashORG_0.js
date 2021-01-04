$(document).ready(function () {
	$('#settings').hide();
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
					a = '#dashboardOrg';
					$('#settings').hide();
					$('#alreadySet').show();
				}
				else {
					$('#alreadySet').hide();
					$('#settings').show();
					a = '#settingsOrg';
				}
				//location.hash = a;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//alert("Please wait a bit!");
			}
		});
	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
});