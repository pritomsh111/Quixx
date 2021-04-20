var org_ID = localStorage.getItem('userID');
var day = weight = distance = type = flag = 0;
var criteriaEnabled = false, fillData;

function createFieldStart(data) {
	Object.keys(data).map(item => {
		div = document.querySelector(`.col.${item}`);
		for (let i of data[item]) {
			fillInputDetails(item, i);
		}
	});
}

async function fillInput() {
	console.log("Yello");
	await $.ajax({
		url: urlForAll + "delivery/criteria/keys/" + org_ID,
		type: "GET",
		headers:
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function (data) {
			createFieldStart(data.data);
			fillData = data.data;
		}
	});
}

function getKeys() {
	let keys = [4, 12];
	return keys.indexOf(Number(localStorage.getItem("userID"))) !== -1 ? true : false;
}

$(document).ready(function () {
	$('#settings').hide();
	$('#hideUpdate').hide();
	$('.container').hide();
	$('#dtBasicExample').hide();
	$('#dtBasicExample2').hide();
	$('#merchantCreate').hide();
	$('#dtBasicExampleActivate').hide();
	$('#dtBasicExampleDisable').hide();
	$('.a').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
	flag = getKeys();
	if (flag) {
		$.ajax({
			url: urlForAll + "delivery/criteria/enable/" + org_ID,
			type: "GET",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				criteriaEnabled = data.data;
				fillInput();
			}
		});
	}
});