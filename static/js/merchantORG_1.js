var org_ID = localStorage.getItem('userID');
var day = weight = distance = type = city = flag = 0;
var criteriaEnabledMerchant = false, fillData;

function createFieldStart(data) {
	Object.keys(data).map(item => {
		div = document.querySelector(`.col.${item}`);
		for (let i of data[item]) {
			fillInputDetails(item, i);
		}
	});
}

async function fillInput() {
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

async function getKeys() {
	let result = await $.ajax({
		url: urlForAll + "delivery/criteria/enable/key/" + org_ID,
		type: "GET",
		headers:
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function (data) {

		}
	});
	return result.data;
}

$(document).ready(async function () {
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

	flag = await getKeys();
	if (flag) {
		fillInput();
	}
});