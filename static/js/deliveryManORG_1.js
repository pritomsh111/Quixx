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

	var district = ["Barguna", "Barishal", "Bhola", "Cumilla", "Dinajpur"];
	var districts1 = ["ab", "b", "c"];
	var districts2 = ["ab2", "b2", "c2"];
	var districts3 = ["ab", "b", "c"];
	var dhakaIndex;
	$('#district')
		.empty();
	for (var i = 0; i < district.length; i++) {
		if (district[i] === "Barishal") {
			dhakaIndex = i;
		}
		var optionTest = new Option(district[i], district[i]);
		$(optionTest).html(district[i]);
		$("#district").append(optionTest);
	}
	document.getElementById('district').selectedIndex = dhakaIndex; //area = "Dhaka";

	// for (var i = 0; i < districts1.length; i++) {
	// 	var option = new Option(districts1[i], districts1[i]);
	// 	$(option).html(districts1[i]);
	// 	$("#managers_2").append(option);
	// }
	document.querySelector("#district").addEventListener("change", function () {
		var vari = this.value == "Barguna" ? districts1 : this.value == "Barishal" ? districts2 : null;

		let deliverArea = document.querySelector(".deliveryArea");
		deliverArea.innerHTML = "";
		let checkbox = "", textOfCheckBox = "";
		for (let i of vari) {
			checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = i;
			checkbox.name = "mycheckboxes";

			textOfCheckBox = document.createTextNode(i);
			deliverArea.append(checkbox, textOfCheckBox);
		}
	});
});