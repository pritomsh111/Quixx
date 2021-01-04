var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
$(document).ready(function () {

	$('#settings').hide();
	$('.container').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#deliveryManCreate').hide();

	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.c').hide();
	$('.d').hide();

	$('.a').hide();
	$('.b').hide();

	window.addEventListener('storage', function (event) {
		if (event.key == 'logout-event') {
			window.location.href = "" + localStorage.getItem("wh-user");
		}
	});
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	$('#managers')
		.empty()
		.append('<option selected="selected" value=' + org_Email + '>' + org_Email + '</option>')
		;
	$.ajax
		({
			url: urlForAll + "manager/approved/" + org_ID,
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				for (var i = 0; i < data.data.length; i++) {
					var option = new Option(data.data[i].manager_email, data.data[i].manager_email);
					$(option).html(data.data[i].manager_email);
					$("#managers").append(option);
				}
			}
		});
});