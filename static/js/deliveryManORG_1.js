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
	let deliverArea = document.querySelector(".deliveryArea");
	var district = ["Barguna", "Barishal", "Bhola", "Cumilla", "Dinajpur"];
	var districts1 = ["ab", "b", "c"];
	var districts2 = ["ab2", "b2", "c2"];
	var districts3 = ["ab3", "b3", "c3"];
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
	changeDeliveryArea(districts2);

	function changeDeliveryArea(data) {
		deliverArea.innerHTML = "";
		let checkbox = "", textOfCheckBox = "";
		for (let i of data) {
			checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.value = i;
			checkbox.name = "mycheckboxes";

			textOfCheckBox = document.createElement("label");
			textOfCheckBox.append(document.createTextNode(i));
			deliverArea.append(checkbox, textOfCheckBox);
		}
	}
	document.querySelector("#district").addEventListener("change", function () {
		var vari = this.value == "Barguna" ? districts1 : this.value == "Barishal" ? districts2 : this.value == "Cumilla" ? districts3 : null;
		changeDeliveryArea(vari);
	});
});