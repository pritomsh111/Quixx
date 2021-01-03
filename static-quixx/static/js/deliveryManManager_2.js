var managerID = localStorage.getItem('userID');
var createDeliveryMan = () => 
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#deliveryManCreate').show();
};
var registeredDeliveryMan = () => 
{
	$('#deliveryManCreate').hide();
	
	var table = $('#dtBasicExample').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
	$.ajax
	({
		async: true,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "deliveryMan/getDeliveryManByUserId/" + managerID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('one').innerHTML = 'Registered Delivery Man: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].delivery_man_id+'</td><td>'+data.data[i].name+'</td><td>'+data.data[i].email+'</td><td>'+data.data[i].phone_number+'</td><td>'+data.data[i].delivery_area+'</td><td>'+data.data[i].reporting_boss_email+'</td></tr>';

			table.rows.add($(table_rows)).draw();
			});
			
		}
	});
	
	$('.dataTables_filter input[type="search"]').
	attr('placeholder','Search anything!').
	css({'width':'300px','display':'inline-block','background':'white'});

	$('.dataTables_filter input[type="search"]').
	attr('class','btn btn-round').
	css({'width':'300px','display':'inline-block','color':'#000000','background':'#FFFFFA'});

	$('.dataTables_length select').
	attr('class','btn btn-round').
	css({'width':'80px','background-color':'white','color':'#000000','background':'#FFFFFA'});
	$('#dtBasicExample').show();
	$('.a').show();
};
var approvedDeliveryMan = () =>
{
	$('#deliveryManCreate').hide();
	
	var table = $('#dtBasicExample').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
	$.ajax
	({
		async: true,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "deliveryMan/approved/" + managerID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('two').innerHTML = 'Approved Delivery Man: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].delivery_man_id+'</td><td>'+data.data[i].name+'</td><td>'+data.data[i].email+'</td><td>'+data.data[i].phone_number+'</td><td>'+data.data[i].delivery_area+'</td><td>'+data.data[i].reporting_boss_email+'</td></tr>';

			table.rows.add($(table_rows)).draw();
			});
		}
	});
	
	$('.dataTables_filter input[type="search"]').
	attr('placeholder','Search anything!').
	css({'width':'300px','display':'inline-block','background':'white'});

	$('.dataTables_filter input[type="search"]').
	attr('class','btn btn-round').
	css({'width':'300px','display':'inline-block','color':'#000000','background':'#FFFFFA'});

	$('.dataTables_length select').
	attr('class','btn btn-round').
	css({'width':'80px','background-color':'white','color':'#000000','background':'#FFFFFA'});
	$('#dtBasicExample').show();
	$('.a').show();
}

var unApprovedDeliveryMan = () => 
{
	$('#deliveryManCreate').hide();
	
	var table = $('#dtBasicExample').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
	$.ajax
	({
		async: true,
		type: "GET",
		cors: true,
		contentType:'application/json',
		secure: true,
		crossDomain: true,
		url: urlForAll + "deliveryMan/unApproved/" + managerID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('three').innerHTML = 'Unapproved Delivery Man: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].delivery_man_id+'</td><td>'+data.data[i].name+'</td><td>'+data.data[i].email+'</td><td>'+data.data[i].phone_number+'</td><td>'+data.data[i].delivery_area+'</td><td>'+data.data[i].reporting_boss_email+'</td></tr>';

			table.rows.add($(table_rows)).draw();
			});
		}
	});
	
	$('.dataTables_filter input[type="search"]').
	attr('placeholder','Search anything!').
	css({'width':'300px','display':'inline-block','background':'white'});

	$('.dataTables_filter input[type="search"]').
	attr('class','btn btn-round').
	css({'width':'300px','display':'inline-block','color':'#000000','background':'#FFFFFA'});

	$('.dataTables_length select').
	attr('class','btn btn-round').
	css({'width':'80px','background-color':'white','color':'#000000','background':'#FFFFFA'});
	$('#dtBasicExample').show();
	$('.a').show();
};
var addDeliveryMan = () => 
{
	var deliveryManName = document.getElementById('deliveryManName').value;
	var deliveryManEmail = document.getElementById('deliveryManEmail').value;
	var deliveryManPhone = document.getElementById('deliveryManPhone').value;
	var reportingBossEmail = document.getElementById('managers').value;
	var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
	var s = "";
	var l = checkedBoxes.length, dummy = 0;
	for(var i of checkedBoxes)
	{
		s+=String(i.value);
		dummy++;
		if(dummy<l)
		{
			s+=",";
		}
		//console.log(String(i.value));
	}
	if(deliveryManName=="" || deliveryManEmail=="" || deliveryManPhone=="")
	{
		$('#myModal23').modal();
	}
	else
	{
		//document.getElementsByClassName('blur')[0].style.filter = "blur(4px)";
		//$(".container").show();
		$.ajax
		({
			type: "POST",
			url: urlForAll + "deliveryMan/create/" + managerID, //loginUserID,
			data: JSON.stringify
			({
				"name": deliveryManName,
				"phone_number": deliveryManPhone,
				"email": deliveryManEmail,
				"delivery_area": s,
				"reporting_boss_email": reportingBossEmail
			}),
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				$('#tick').hide();
				$(".circle-loader").removeClass("load-complete");
				$("#sure").html("");
				$("#myModal").modal('show');
				$("#sure").html("Please wait");
				if (data.status == 'OK')
				{
					setTimeout(function(){ 
						$(".circle-loader").addClass("load-complete");
						
						$('#tick').show(); 
					
						$("#sure").html("Delivery man added!");
					}, 2000);
					$('input[type=checkbox]').prop('checked', false);
					document.getElementById('deliveryManName').value = "";
					document.getElementById('deliveryManEmail').value = "";
					document.getElementById('deliveryManPhone').value = "";
					setTimeout(function(){ 
						
					$("#myModal").modal('hide');
					}, 4000);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				
				$('#myModal2').modal('show');
			}
		})
	}
};