(async function () {
	var myNode;
	var fileTag = document.getElementById("filetag");
	let favicon = document.querySelector("link[rel='shortcut icon']");

	function changeFavicon(img) {
		favicon.href = img;
	}

	if (user === 'SUPER_ADMIN') {
		$('.selectbtnMer').hide();
		document.querySelector(".selectbtnMer").remove();
		$('.logo>a>label').hide();
		$('.logo>a>input').hide();
		document.querySelector(".logo>a>div").style.height = "115px";
		document.title = "Super Admin";
		myNode = document.getElementById("merchant");
		myNode.remove();
		myNode = document.getElementById("organizationHead");
		myNode.remove();
		changeFavicon("static/img/Logo.png");
		document.querySelector('.logo>a>div').style.background = "url(static/img/Logo.png) no-repeat center/contain";
		document.getElementById("dashName").innerHTML = "Super Admin's Panel";
	}
	else if (user === 'ORGANIZATIONAL_ADMIN') {
		$('.selectbtnMer').hide();
		document.querySelector(".selectbtnMer").remove();
		let isLogo = true;
		await $.ajax
			({
				type: "GET",
				url: urlForAll + "orgHead/get/logo/" + localStorage.getItem('userID'),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					//console.log(data);
					if (data.data.image_str == "") {
						isLogo = false;
					}
					else if (data.data.image_str != "") {
						changeFavicon(data.data.image_str);
						document.querySelector('.logo>a>div').style.background = "url('" + data.data.image_str.replace(/(\r\n|\n|\r)/gm, "") + "') no-repeat center/contain";
						isLogo = true;
					}
				}
			});
		fileTag.addEventListener("change", function () {
			changeImage(this);
		});
		function changeImage(input) {
			var reader;
			if (input.files[0].size > 200000) {
				document.querySelector("#myModalForE2Setup3 p").innerHTML = "File Size Must Be Less Than 200KB!";
				$('#myModalForE2Setup3').modal('show');
			}
			else if (input.files && input.files[0]) {
				reader = new FileReader();
				reader.onload = function (e) {
					let url = urlForAll + "approved/insert/logo";
					let method = "POST";
					if (isLogo) {
						method = "PUT";
						url = urlForAll + "approved/update/logo";
					}
					//console.log(isLogo);
					if (e.target.result.includes("data:image")) {
						changeFavicon(e.target.result);
						$.ajax
							({
								type: method,
								url: url,
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
									changeFavicon(e.target.result);
									document.querySelector('.logo>a>div').style.background = "none";
									document.querySelector('.logo>a>div').style.background = "url('" + e.target.result.replace(/(\r\n|\n|\r)/gm, "") + "') no-repeat center/contain";
								}
							});
					}
					else {
						document.querySelector("#myModalForE2Setup3 p").innerHTML = "Not an image file!";
						$('#myModalForE2Setup3').modal('show');
					}
				}
				reader.readAsDataURL(input.files[0]);
			}
		}
		$.ajax
			({
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
		myNode.remove();
		myNode = document.getElementById("superAdmin");
		myNode.remove();
	}
	else if (user === 'MERCHANT') {
		$('.logo>a>label').hide();
		$('.logo>a>input').hide();
		document.querySelector(".selectbtnMer").addEventListener("click", function (e) {
			e.preventDefault();
			location.hash = "selection";
		});
		document.querySelector("#merchant a[href='#selection']").remove();
		document.querySelector(".logo>a>div").style.height = "115px";
		$.ajax
			({
				type: "GET",
				url: urlForAll + "merchant/get/org/logo/" + localStorage.getItem('userID'),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					changeFavicon(data.data.image_str);
					document.querySelector('.logo>a>div').style.background = "url('" + data.data.image_str.replace(/(\r\n|\n|\r)/gm, "") + "') no-repeat center/contain";
				}
			});
		$.ajax
			({

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
		myNode = document.getElementById("organizationHead");
		myNode.remove();
		myNode = document.getElementById("superAdmin");
		myNode.remove();
	}
	else {
		clear();
	}
})();


/*
(async function () {
	var myNode;
	var fileTag = document.getElementById("filetag");
	var fileTag2 = document.getElementById("filetag2");
	var preview = document.getElementById("preview");
	let favicon = document.querySelector("link[rel='shortcut icon']");

	function changeFavicon(img) {
		favicon.href = img;
	}

	if (user === 'SUPER_ADMIN') {
		$('#logooo').hide();
		document.title = "Super Admin";
		myNode = document.getElementById("merchant");
		myNode.remove();
		myNode = document.getElementById("organizationHead");
		myNode.remove();
		preview = document.getElementById("preview");
		preview.setAttribute('src', 'static/img/Logo.png');
		document.getElementById("dashName").innerHTML = "Super Admin's Panel";
	}
	else if (user === 'ORGANIZATIONAL_ADMIN') {
		let isLogo = true;
		await $.ajax
			({
				type: "GET",
				url: urlForAll + "orgHead/get/logo/" + localStorage.getItem('userID'),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					//console.log(data);
					if (data.data.image_str == "") {
						$('#two2').hide();
						isLogo = false;
					}
					else if (data.data.image_str != "") {
						changeFavicon(data.data.image_str);
						preview.setAttribute('src', data.data.image_str);
						$('#one1').hide();
						isLogo = true;
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
					let method = "PUT";
					let url = urlForAll + "approved/update/logo";
					if (isLogo) {
						url = urlForAll + "approved/insert/logo";
						method = "POST";
					}
					//console.log(isLogo);
					if (e.target.result.includes("data:image")) {
						$.ajax
							({
								type: method,
								url: url,
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
									//console.log(data);
									changeFavicon(e.target.result);
									preview.setAttribute('src', e.target.result);
								}
							});
					}
					else {
						$('#myModalForE2Setup3').modal('show');
					}
					reader.readAsDataURL(input.files[0]);
				}
			}
		}

		// fileTag2.addEventListener("change", function () {
		// 	changeImage2(this);
		// });

		// function changeImage2(input2) {
		// 	var reader;

		// 	if (input2.files && input2.files[0]) {
		// 		reader = new FileReader();

		// 		reader.onload = function (e) {

		// 			$.ajax
		// 				({

		// 					type: "PUT",
		// 					url: urlForAll + "approved/update/logo",
		// 					data: JSON.stringify
		// 						({
		// 							"user_id": localStorage.getItem('userID'),
		// 							"image_str": e.target.result
		// 						}),
		// 					headers:
		// 					{
		// 						'Accept': 'application/json',
		// 						'Content-Type': 'application/json',
		// 						"Authorization": 'Bearer ' + localStorage.getItem('token')
		// 					},
		// 					success: function (data) {
		// 						$('#one1').hide();
		// 						$('#two2').show();
		// 						changeFavicon(e.target.result);
		// 						preview.setAttribute('src', e.target.result);
		// 					}
		// 				});
		// 			////console.log(e.target.result);
		// 		}

		// 		reader.readAsDataURL(input2.files[0]);
		// 	}
		// }

		$.ajax
			({

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
		myNode.remove();
		myNode = document.getElementById("superAdmin");
		myNode.remove();
		//document.getElementById("dashName").innerHTML = "Organization Head's Panel";
	}
	/*else if(user == 'MANAGER')
	{
		$('#logooo').hide();
		document.title = "Manager";
		$.ajax
		({

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
	}
	else if (user === 'MERCHANT') {
		$('#logooo').hide();
		$.ajax
			({
				type: "GET",
				url: urlForAll + "merchant/get/org/logo/" + localStorage.getItem('userID'),
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					"Authorization": 'Bearer ' + localStorage.getItem('token')
				},
				success: function (data) {
					changeFavicon(data.data.image_str);
					preview.setAttribute('src', data.data.image_str);
				}
			});
		$.ajax
			({

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
		myNode = document.getElementById("organizationHead");
		myNode.remove();
		myNode = document.getElementById("superAdmin");
		myNode.remove();
	}
	else {
		clear();
	}
})();
*/