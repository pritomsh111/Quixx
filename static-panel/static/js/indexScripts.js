var user = localStorage.getItem('user');
var pass = localStorage.getItem('pass');
var myNode;
var fileTag = document.getElementById("filetag");
var fileTag2 = document.getElementById("filetag2");
var preview = document.getElementById("preview");
/*var devtools = function() {};
devtools.toString = function() {
  if (this.opened) {
		localStorage.setItem('logout-event', 'logout' + Math.random());
		var y = localStorage.getItem('NginxCode');
		localStorage.clear();
		// MAIN ->

		if(y=='main')
		{
			localStorage.setItem('NginxCode', '/#login');
			window.location.href="#login";
		}
		else
		{
			localStorage.setItem('NginxCode', y);
			window.location.href="" + y;
		}
  }
  this.opened = true;
}
console.log('%c', devtools);
*/
if (user && pass) {
	localStorage.removeItem('pass');
	$.ajax
		({
			async: false,
			type: "POST",
			url: urlForAll + "login",
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: JSON.stringify
				({
					"username": user,
					"password": pass
				}),
			success: function (data) {
				var token = data.data;
				var decoded = jwt_decode(token);
				localStorage.setItem('token', data.data);
				localStorage.setItem('userID', decoded.id);
				localStorage.setItem('userEmail', decoded.email);
				localStorage.setItem('user', decoded.role[0].roleName);
				user = decoded.role[0].roleName;
			}
		});
}
if (user == 'SUPER_ADMIN') {
	$('#logooo').hide();
	document.title = "Super Admin";
	myNode = document.getElementById("merchant");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	myNode = document.getElementById("organizationHead");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	/*myNode = document.getElementById("manager");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();*/

	preview = document.getElementById("preview");
	preview.setAttribute('src', 'static/img/Logo.png');
	document.getElementById("dashName").innerHTML = "Super Admin's Panel";
}
else if (user == 'ORGANIZATIONAL_ADMIN') {
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "orgHead/get/logo/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				if (data.data.image_str == "") {

					$('#two2').hide();
				}
				else if (data.data.image_str != "") {

					preview.setAttribute('src', data.data.image_str);
					$('#one1').hide();
				}
			}
		});


	fileTag.addEventListener("change", function () {

		changeImage(this);
	});
	function changeImage(input) {
		var reader;

		if (input.files && input.files[0]) {
			reader = new FileReader();

			reader.onload = function (e) {
				$.ajax
					({
						async: true,
						type: "POST",
						url: urlForAll + "approved/insert/logo",
						data: JSON.stringify
							({
								"user_id": localStorage.getItem('userID'),
								"image_str": e.target.result
							}),
						headers:
						{
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							"Authorization": 'Bearer ' + localStorage.getItem('token')
						},
						success: function (data) {
							$('#one1').hide();
							$('#two2').show();
							preview.setAttribute('src', e.target.result);
						}
					});
				//console.log(e.target.result);
				//preview.setAttribute('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	fileTag2.addEventListener("change", function () {
		changeImage2(this);
	});

	function changeImage2(input2) {
		var reader;

		if (input2.files && input2.files[0]) {
			reader = new FileReader();

			reader.onload = function (e) {

				$.ajax
					({
						async: true,
						type: "PUT",
						url: urlForAll + "approved/update/logo",
						data: JSON.stringify
							({
								"user_id": localStorage.getItem('userID'),
								"image_str": e.target.result
							}),
						headers:
						{
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							"Authorization": 'Bearer ' + localStorage.getItem('token')
						},
						success: function (data) {
							$('#one1').hide();
							$('#two2').show();
							preview.setAttribute('src', e.target.result);
						}
					});
				//console.log(e.target.result);
			}

			reader.readAsDataURL(input2.files[0]);
		}
	}

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "orgHead/get/org/name/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				document.getElementById("namee").innerHTML = data.data;
				document.getElementById("dashName").innerHTML = data.data + "'s Panel";
				document.title = data.data;
			}
		});
	myNode = document.getElementById("merchant");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	myNode = document.getElementById("superAdmin");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	/*myNode = document.getElementById("manager");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();*/
	//document.getElementById("dashName").innerHTML = "Organization Head's Panel";
}
/*else if(user == 'MANAGER')
{
	$('#logooo').hide();
	document.title = "Manager";
	$.ajax
	({
		async: true,
		type: "GET",
		url: urlForAll + "manager/profile/" + localStorage.getItem('userID'),
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			localStorage.setItem('managerEmail', data.data.manager_email);
			myNode = document.getElementById("merchant");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
			myNode.remove();
			myNode = document.getElementById("organizationHead");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
			myNode.remove();
			myNode = document.getElementById("superAdmin");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
			myNode.remove();
			localStorage.setItem("ccd", data.data.can_create_delivery);
			localStorage.setItem("ccdm", data.data.can_create_delivery_man);
			var canCreateDelivery = data.can_create_delivery;
			var canCreateDeliveryMan = data.can_create_delivery_man;
			document.getElementById("dashName").innerHTML = "Manager's Panel";				
		}
	});
}*/
else if (user == 'MERCHANT') {
	$('#logooo').hide();

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/get/org/logo/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				preview.setAttribute('src', data.data.image_str);
			}
		});
	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "merchant/get/org/name/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				document.getElementById("namee").innerHTML = data.data;
			}
		});

	$.ajax
		({
			async: true,
			type: "GET",
			url: urlForAll + "profile/get/profile/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				document.title = data.data.sender_name;
				document.getElementById("dashName").innerHTML = data.data.sender_name + "'s Panel";
			}
		})

	var fileTag = document.getElementById("filetag");
	var fileTag2 = document.getElementById("filetag2");
	preview = document.getElementById("preview");
	//document.getElementById("dashName").innerHTML = "Merchant's Panel";
	myNode = document.getElementById("organizationHead");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	myNode = document.getElementById("superAdmin");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();
	/*myNode = document.getElementById("manager");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	myNode.remove();*/
}
else {
	localStorage.removeItem('user');
	window.location.href = "index.html";
}