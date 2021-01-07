var manager_ID = localStorage.getItem('userID');
var createDelivery = () =>
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').show();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();
	$("#deliveryCreate").show();
}
var goToDelivery = () =>
{
	window.open('addDeliverToDeliveryMan.html', '_blank');
}
/*var directlyAssign = () =>
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();
	
		var table = $('#dtBasicExampleAp').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
		$.ajax
		({
			async: false,
			type: "GET",
			cors: true,
			contentType:'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "deliveryMan/approved/" + manager_ID,
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				//console.log(data);
				
				var trHTML = '';
				$.each(data.data, function (i, item) {
				var table_rows = '<tr><td>'+data.data[i].delivery_man_id+'</td><td>'+data.data[i].name+'</td><td>'
				+'<button id="' + data.data[i].delivery_man_id + '" name="' + data.data[i].name + '" class="btn-round btn-outline btn" onclick=save(this)>Add Delivery</button></td></tr>';

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
		
	$('#dtBasicExampleAp').show();
	$('.b').show();
}*/
var unassignedDeliveries = () =>
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();
	$("#deliveryCreate").hide();
	$.ajax
	({
		url: urlForAll+ "deliveryMan/approved/" + manager_ID,
		type: "GET",
		
		headers: 
		{
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		  "Authorization": 'Bearer ' + localStorage.getItem('token')
		},
		
		success: function(data)
		{
			//console.log(data);
			// Org's Email will be the first one in the options.
			$('#deliveryManList')
				.empty()
				.append('<option selected="selected" value="">Delivery Man List</option>')
			;
			for(var i = 0; i < data.data.length ; i++)
			{
				var option = new Option(data.data[i].delivery_man_id, data.data[i].delivery_man_id);
				$(option).html(data.data[i].name);
				$("#deliveryManList").append(option);
			}
		}
	} );
	
		var table = $('#dtBasicExampled').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
		$.ajax
		({
			async: false,
			type: "GET",
			cors: true,
			contentType:'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "manager/all/unAssign/delivery/" + manager_ID,
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				document.getElementById('onee').innerHTML = 'Unassigned Deliveries: ' + data.data.length;
		
				var trHTML = '';
				$.each(data.data, function (i, item) {
				var table_rows = 
				'<tr><td>'+data.data[i].delivery_Id+'</td><td>'
				//+data.data[i].assigned_delivery_man_name+'</td><td>'
				+data.data[i].pickup_time+'</td><td>'
				+data.data[i].sender_name+'</td><td>'
				+data.data[i].sender_phone_number+'</td><td>'
				+data.data[i].sender_address+'</td><td>'
				+data.data[i].receiver_name+'</td><td>'
				+data.data[i].receiver_phone_number+'</td><td>'
				+data.data[i].delivery_area+'</td><td>'
				+data.data[i].receiver_address+'</td><td>'
				+data.data[i].delivery_type+'</td><td>'
				+data.data[i].delivery_charge+'</td><td>'
				+data.data[i].payment_method+'</td><td>'
				+data.data[i].delivery_note+'</td><td>'
				+'<button id="' + data.data[i].delivery_Id + '" class="btn-round btn-outline btn assignIt">Assign</button></td></tr>';
				
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
	$('.d').show();
	$('#dtBasicExampled').show();
	
}
//New
var assignedDeliveries = () =>
{
	$('#dtBasicExample').hide();
	$('.a').hide();
	$('#dtBasicExampleAp').hide();
	$('#dtBasicExampleNew').hide();
	$('.b').hide();
	$('.c').hide();
	$('.d').hide();
	$('.e').hide();
	$('#dtBasicExampled').hide();
	$("#deliveryCreate").hide();
	
		var table = $('#dtBasicExampleNew').DataTable( {
		"processing": true,
		"destroy": true
		} );
		table.clear().draw();
		$.ajax
		({
			async: false,
			type: "GET",
			cors: true,
			contentType:'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "delivery/assigned/" + manager_ID,
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				document.getElementById('twoo').innerHTML = 'Assigned Deliveries: ' + data.data.length;
				var trHTML = '';
				$.each(data.data, function (i, item) {
				var table_rows = 
				'<tr><td>'+data.data[i].delivery_Id+'</td><td>'
				//+data.data[i].assigned_delivery_man_name+'</td><td>'
				+data.data[i].assign_delivery_man_name+'</td><td>'
				+data.data[i].assign_delivery_man_phone+'</td><td>'
				+data.data[i].sender_name+'</td><td>'
				+data.data[i].sender_phone_number+'</td><td>'
				+data.data[i].sender_address+'</td><td>'
				+data.data[i].receiver_name+'</td><td>'
				+data.data[i].receiver_phone_number+'</td><td>'
				+data.data[i].delivery_area+'</td><td>'
				+data.data[i].receiver_address+'</td><td>'
				+data.data[i].delivery_type+'</td><td>'
				+data.data[i].delivery_charge+'</td><td>'
				+data.data[i].delivery_status+'</td><td>'
				+data.data[i].payment_method+'</td><td>'
				//+data.data[i].track_id+'</td><td>'
				+'<button id="' + manager_ID + '" name="' + data.data[i].delivery_id + '" class="btn-round btn-outline btn" onclick=invoice(this)>Invoice</button>'+'</td><td>'
				+'<button id="modifyButton" value="' + data.data[i].can_modify + '" class="btn-round btn-outline btn" disabled>Unassign</button></td></tr>';

				table.rows.add($(table_rows)).draw();
				});
				
				//document.getElementById("modifyButton").disabled = document.getElementById("modifyButton").value;
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
		
	$('#dtBasicExampleNew').show();
	$('.e').show();
}
var save = (id) => 
{
	localStorage.setItem("'Accept': 'application/json'", id.id);
	localStorage.setItem("'Accept': 'application/jsonN'", id.name);
	window.open('addDeliverToDeliveryMan.html', '_blank');
};

var orgid;
var deliveryManId;
var $t;
$('#dtBasicExampled').on('click', '.assignIt', function () 
{	
	orgid = $(this).attr('id');
	$t = $(this);
	deliveryManId = document.getElementById("deliveryManList").value;
	
	$('#tick').hide();
	$(".circle-loader").removeClass("load-complete");

	$("#sure").html("Are you sure?");
	$("#myModal").modal();
	//$(".container").show();
	//document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok').click(function(){
	
	//console.log(idNew + " - " + deliveryManId);
	//console.log(id);
	$("#sure").html("Please wait");
	document.getElementById('modalCancel').disabled = true;
	document.getElementById('modalApprove').disabled = true;
	if(deliveryManId)
	{
		$.ajax
		({
			async: true,
			type: "PUT",
			url: urlForAll + "delivery/assign/" + orgid + "/" + deliveryManId,
			
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				setTimeout(function(){ 
					$(".circle-loader").addClass("load-complete");
					
					$('#tick').show(); 
				
					$("#sure").html("Delivery man assigned!");
				}, 900);
				
				setTimeout(function(){ 
					$("#myModal").modal('hide');
					var table = $('#dtBasicExampled').DataTable();
					table
					.row($t.parents('tr'))
					.remove()
					.draw();
					
					document.getElementById('onee').innerHTML = 'Unassigned Deliveries: ' + table
																							.column( 0 )
																							.data()
																							.length;
					}, 2000);
				document.getElementById('modalCancel').disabled = false;
				document.getElementById('modalApprove').disabled = false;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
							
				document.getElementById('modalCancel').disabled = false;
				document.getElementById('modalApprove').disabled = false;
				$('#myModal').modal('hide');
				$('#myModal2').modal();
			}
		});
	}
	else
	{
		document.getElementById('modalCancel').disabled = false;
		document.getElementById('modalApprove').disabled = false;
		$('#myModal').modal('hide');
		$('#myModal23').modal();
	}

});
var invoice = (id) =>
{
	window.open(urlForAll + "reports/delivery/" + id.id + "/" + id.name);
};

$("#managers2").change(function () {
    var value = $(this).val();
	if(value == 'Cash on Delivery'){
		$("#cod").show();
	}
	else{
		$("#cod").hide();
	}
});

document.getElementById("createDelivery").addEventListener("click", function(event)
{
	var pickup_time = document.getElementById('timepicker-12-hr').value;
	var s_name = document.getElementById('s_name').value;
	var s_number = document.getElementById('s_number').value;
	var s_address = document.getElementById('pac-input').value;
	var r_name = document.getElementById('r_name').value;
	var r_number = document.getElementById('r_number').value;
	var r_address = document.getElementById('pac-input2').value;
	var payment_method = document.getElementById('managers2').value;
	var delivery_note = document.getElementById('DELIVERY_NOTE').value;
	var delivery_type = document.getElementById('deliveryType').value;
	var delivery_charge = document.getElementById('delivery_charge').value;
	var area = String(document.getElementById('managers').value);
	var pickup_lat =  String(document.getElementById('lat').value);
	var pickup_longi = String(document.getElementById('longi').value);
	var delivery_lat =  String(document.getElementById('des_lat').value);
	var delivery_longi = String(document.getElementById('des_longi').value);
	
	if(s_name=="" || s_number=="" || s_address=="" || r_name=="" || r_number=="" || r_address=="" || payment_method=="" || area=="")
	{
		$('#myModalCreateD2').modal('show');
	}
	else
	{
		var datap;
		if(payment_method == 'Cash on Delivery'){
			product_cost = document.getElementById('product_cost').value;
			datap = JSON.stringify
			({
				"delivery_status": "",
				"delivery_type": delivery_type,
				"sender_address": s_address,
				"receiver_address": r_address,
				"sender_phone_number": s_number,
				"receiver_phone_number": r_number,
				"sender_name": s_name,
				"receiver_name": r_name,
				"payment_method": payment_method,
				"delivery_charge": delivery_charge,
				"product_cost": product_cost,
				"sender_lat": pickup_lat,
				"sender_longi": pickup_longi,
				"receiver_lat": delivery_lat,
				"receiver_longi": delivery_longi,
				"pickup_time": pickup_time,
				"delivery_note": delivery_note,
				"delivery_area": area
			});
		}
		else{
			datap = JSON.stringify
			({
				"delivery_status": "",
				"delivery_type": delivery_type,
				"sender_address": s_address,
				"receiver_address": r_address,
				"sender_phone_number": s_number,
				"receiver_phone_number": r_number,
				"sender_name": s_name,
				"receiver_name": r_name,
				"payment_method": payment_method,
				"delivery_charge": delivery_charge,
				"sender_lat": pickup_lat,
				"sender_longi": pickup_longi,
				"receiver_lat": delivery_lat,
				"receiver_longi": delivery_longi,
				"pickup_time": pickup_time,
				"delivery_note": delivery_note,
				"delivery_area": area
			});
		}
		$.ajax
		({
			type: "POST",
			url: urlForAll + "delivery/create/" + manager_ID,
			data: datap,
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function(data) 
			{
				$('#tickD2').hide();
				$(".circle-loader").removeClass("load-complete");
				$("#sureD2").html("");
				$("#myModalCreateD1").modal('show');
				$("#sureD2").html("Please wait!");
				if (data.status == 'OK')
				{
						setTimeout(function(){ 
						$(".circle-loader").addClass("load-complete");
						
						$('#tickD2').show(); 
					
						$("#sureD2").html("Delivery added!");
					}, 2000);
					setTimeout(function(){ 
						
					$("#myModalCreateD1").modal('hide');
					}, 4000);
					
					document.getElementById("formD").reset();
					$("#cod").hide();
				}
				else
					alert('Failed adding delivery: ' + data.status + ', ' + data.errorMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				
				$('#myModal2').modal('show');
			}
		})
	}
});