var org_ID = localStorage.getItem('userID');
var createMan = () =>
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#managerCreate').show();
};
var registeredMan = () => 
{
	$('#managerCreate').hide();
	$('#dtBasicExample').hide();
	$('.b').hide();
	
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
		url: urlForAll+ "manager/all/"  + org_ID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('one').innerHTML = 'Registered Manager: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].manager_id+'</td><td>'+data.data[i].manager_name+'</td><td>'+data.data[i].manager_email+'</td><td>'+data.data[i].can_create_delivery_man+'</td><td>'+data.data[i].can_create_delivery+'</td></tr>';

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
var approvedMan = () =>
{
	$('#managerCreate').hide();
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
		"url": urlForAll+ "manager/approved/"  + org_ID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('two').innerHTML = 'Approved Manager: ' + data.data.length;
			
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].manager_id+'</td><td>'+data.data[i].manager_name+'</td><td>'+data.data[i].manager_email+'</td><td>'+data.data[i].can_create_delivery_man+'</td><td>'+data.data[i].can_create_delivery+'</td></tr>';

			table.rows.add($(table_rows)).draw();
			});
			document.getElementById('two').innerHTML = 'Approved Manager: ' + data.data.length;
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

var unApprovedMan = () => 
{
	$('#managerCreate').hide();
	$('#dtBasicExample').hide();
	$('.a').hide();
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
		"url": urlForAll+ "manager/unApproved/"  + org_ID,
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		success: function(data) 
		{
			document.getElementById('three').innerHTML = 'Unapproved Manager: ' + data.data.length;
			var trHTML = '';
			$.each(data.data, function (i, item) {
			var table_rows = '<tr><td>'+data.data[i].manager_id+'</td><td>'+data.data[i].manager_name+'</td><td>'+data.data[i].manager_email+'</td><td>'+data.data[i].can_create_delivery_man+'</td><td>'+data.data[i].can_create_delivery+'</td></tr>';

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

var addManager = () => 
{
	var canMan, canDeliver;
	var managerName = document.getElementById('managerName').value;
	var managerEmail = document.getElementById('managerEmail').value;
	
	var canCreateDeliveryMan = document.getElementsByName('canCreateDeliveryMan'); 
	  
	for(i = 0; i < canCreateDeliveryMan.length; i++) 
	{ 
		if(canCreateDeliveryMan[i].checked) 
		{
			if(canCreateDeliveryMan[i].value=="Yes")
			{
				canMan = true;
			}
			else
			{
				canMan = false;
			}
		}
	} 
	var canCreateDelivery = document.getElementsByName('canCreateDelivery'); 
	  
	for(i = 0; i < canCreateDelivery.length; i++) 
	{ 
		if(canCreateDelivery[i].checked) 
		{
			if(canCreateDelivery[i].value=="Yes")
			{
				canDeliver = true;
			}
			else
			{
				canDeliver = false;
			}
		}
	}
	if(managerName=="" || managerEmail=="")
	{
		$('#myModal23').modal();
	}
	else
	{
		$.ajax
		({
			type: "POST",
			url: urlForAll+ "manager/create/" + org_ID,
			data: JSON.stringify
			({
				"manager_name": managerName,
				"manager_email": managerEmail,
				"can_create_delivery_man": canMan,
				"can_create_delivery": canDeliver
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
				$("#sure").html("Please wait!");
				if (data.status == 'OK')
				{
					setTimeout(function(){ 
						$(".circle-loader").addClass("load-complete");
						
						$('#tick').show(); 
					
						$("#sure").html("Manager added!");
					}, 3000);
					document.getElementById('managerName').value ="";
					document.getElementById('managerEmail').value ="";
					document.getElementById('canCreateDeliveryMan').checked = false;
					document.getElementById('canCreateDelivery').checked = false;				
					setTimeout(function(){ 
						
					$("#myModal").modal('hide');
					}, 4000);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				
				$('#myModal2').modal('show');
				/*setTimeout(function(){ 
					
					$("#myModal").removeClass("in");
					$(".modal-backdrop").remove();
					$('body').removeClass('modal-open');
					$('body').css('padding-right', '');
					$("#myModal").hide();
				}, 2000);*/
			}
		})
	}
};