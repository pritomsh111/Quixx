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
			url: urlForAll + "merchant/graph/complete/delivery/" + localStorage.getItem('userID'),
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function()
			{
				$("#graphHide2").fadeIn();
			},
			success: function(data) 
			{
				var datap = [];
				$.each(data.data, function (i, item) {
					var keys = Object.keys(item);
					
					//console.log(keys[0]);
					//console.log(data.data[i][keys[0]]);
					
					datap.push({
						label: keys[0],
						y: data.data[i][keys[0]]
					});
				});
				chart.options.data[0].dataPoints=datap;
				chart.render();
			},
			complete:function(data)
			{	
				$("#graphHide").fadeOut();
			}
		});
	}
	addData();
	//$.getJSON(urlForAll + "merchant/graph/complete/delivery/" + localStorage.getItem('userID'), addData);
	
	//NewGraph
	CanvasJS.addColorSet("Shades",
						[//colorSet Array

						"#ffcf5c"               
						]);
	var dataPoints2 = [];

	var chart2 = new CanvasJS.Chart("chartContainer2", {
		
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
			yValueFormatString: '<span>Incomplete Deliveries - #</span>',
			dataPoints: dataPoints
		}]
	});
	function addData2() {
		
		$.ajax
		({
			async: true,
			type: "GET",
			cors: true,
			contentType:'application/json',
			secure: true,
			crossDomain: true,
			url: urlForAll + "merchant/graph/incomplete/delivery/" + localStorage.getItem('userID'),
			headers: 
			{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			beforeSend: function()
			{
				$("#graphHide2").fadeIn();
			},
			success: function(data) 
			{
				var datap2 = [];
				$.each(data.data, function (i, item) {
					var keys = Object.keys(item);
					
					//console.log(keys[0]);
					//console.log(data.data[i][keys[0]]);
					
					datap2.push({
						label: keys[0],
						y: data.data[i][keys[0]]
					});
				});
				chart2.options.data[0].dataPoints=datap2;
				chart2.render();
			},
			complete:function(data)
			{	
				$("#graphHide2").fadeOut();
			}
		});
	}
	addData2();
	//$.getJSON(urlForAll + "merchant/graph/incomplete/delivery/" + localStorage.getItem('userID'), addData2);
}
graph();