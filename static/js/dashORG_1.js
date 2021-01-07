function graph() {
	CanvasJS.addColorSet("Shades",
						[//colorSet Array

						"#ffcf5c"               
						]);
	var dataPoints = [];

	var chart = new CanvasJS.Chart("chartContainer", {
		
		height:360,
		backgroundColor: "#ffffff",

		colorSet: "Shades",
		animationEnabled: true,
		animationDuration: 2500,

		theme: "dark2",
		axisX:{
		titleFontFamily: "Didact Gothic",
		title: "Date",
		labelFontColor: "#0066b3",
		titleFontColor: "#0066b3",
		lineThickness: 1,
		lineColor: "#0066b3",
		tickLength: 15,
		tickColor: "#0066b3"


		},
		axisY: {
			//interval: 1000,
			titleFontFamily: "Didact Gothic",
			title: "Deliveries",
			titleFontSize: 24,
			labelFontColor: "#0066b3",
			titleFontColor: "#0066b3",
			lineThickness: 1,
			lineColor: "#0066b3",
			tickLength: 15,
			tickColor: "#0066b3",
			gridThickness: 1,
			gridColor: "#0066b3"
		},
		data: [{
			type: "column",
			yValueFormatString: '<span>Completed Deliveries - #</span>',
			dataPoints: dataPoints
		}]
	});
	function addData() {
		
		$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType:'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "orgHead/total/complete/delivery/for/graph/" + localStorage.getItem('userID'),
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function()
			{
				$("#graphHide").fadeIn();
				//$("#chartContainer").hide();
			},
			success: function(data) 
			{
				//console.log(data);
				var datap = [];
				var keys = Object.keys(data.data);
				for(var i = 0; i<keys.length;i++)
				{
					datap.push({
						label: keys[i],
						y: data.data[[keys[i]]]
					});
				}
				chart.options.data[0].dataPoints=datap;
				chart.render();
			},
			complete:function(data)
			{	
				$("#graphHide").fadeOut();
				//$("#chartContainer").show();
			}
		});
	}
	addData();
	//$.getJSON(urlForAll + "orgHead/total/complete/delivery/for/graph/" + localStorage.getItem('userID'), addData);
}
graph();