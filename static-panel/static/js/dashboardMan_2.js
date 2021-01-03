$.ajax
({
	async: true,
	type: "GET",
	url: urlForAll+ "user/total/deliveryMan/" + localStorage.getItem('userID'),
	headers: 
	{
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	"Authorization": 'Bearer ' + localStorage.getItem('token')
	},
	success: function(data) 
		{
			if(data.data>0)
			{
				document.getElementById("totalDeliveryMan").innerHTML = data.data;
			}
			else
			{
				document.getElementById("totalDeliveryMan").innerHTML = "0";
			}
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
			alert("Please wait, we are working!");
		}
});
$.ajax
({
	async: true,
	type: "GET",
	url: urlForAll+ "delivery/total/incomplete/delivery/" + localStorage.getItem('userID'),
	headers: 
	{
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	"Authorization": 'Bearer ' + localStorage.getItem('token')
	},
	success: function(data)
	{
		if(data.data.length>0)
		{
			document.getElementById("totalIncompleteDeliveries").innerHTML = data.data.length;			
		}
		else
		{
			document.getElementById("totalIncompleteDeliveries").innerHTML = "0";
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {

	}
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
document.getElementById("date1").innerHTML = today;
document.getElementById("date3").innerHTML = today;