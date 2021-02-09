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

	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	$('#managers')
		.empty()
		.append('<option selected="selected" value=' + org_Email + '>' + org_Email + '</option>')
		;
	// $.ajax
	// 	({
	// 		url: urlForAll + "manager/approved/" + org_ID,
	// 		type: "GET",

	// 		headers:
	// 		{
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json',
	// 			"Authorization": 'Bearer ' + localStorage.getItem('token')
	// 		},
	// 		success: function (data) {
	// 			for (var i = 0; i < data.data.length; i++) {
	// 				var option = new Option(data.data[i].manager_email, data.data[i].manager_email);
	// 				$(option).html(data.data[i].manager_email);
	// 				$("#managers").append(option);
	// 			}
	// 		}
	// 	});
	var dhakaIndex;

	let deliverArea = document.querySelector(".deliveryArea");
	$('#district')
		.empty();
	$.ajax
		({
			url: urlForAll + "approved/delivery/district",
			type: "GET",

			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},

			success: function (data) {
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i] === "Dhaka") {
						dhakaIndex = i;
						dhaka = 1;
					}
					var option = new Option(data.data[i], data.data[i]);
					$(option).html(data.data[i]);
					$("#district").append(option);
				}
				document.getElementById('district').selectedIndex = dhakaIndex;
			}
		});

	changedArea("Dhaka");
	function changedArea(where) {

		url = urlForAll + "approved/delivery/upazila/" + where;
		if (where === "Dhaka") {
			url = urlForAll + "approved/delivery/thana/Dhaka";
		}
		if (where === "Cox's Bazar") {
			url = urlForAll + "approved/delivery/upazila/Cox'sBazar";
		}
		$.ajax
			({
				url: url,
				type: "GET",
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					deliverArea.innerHTML = "";
					let checkbox = "", textOfCheckBox = "", div = "";
					for (let i of data.data) {
						div = document.createElement("div");
						div.setAttribute("class", "checkDiv");
						checkbox = document.createElement("input");
						checkbox.type = "checkbox";
						checkbox.value = i;
						checkbox.name = "mycheckboxes";

						textOfCheckBox = document.createElement("label");
						textOfCheckBox.append(document.createTextNode(i));
						div.append(checkbox, textOfCheckBox);
						deliverArea.append(div);
					}
				}
			});
	}
	document.querySelector("#district").addEventListener("change", function () {
		var vari = this.value == "Dhaka" ? "Dhaka" : this.value;
		changedArea(vari);
	});
});