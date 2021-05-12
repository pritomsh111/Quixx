async function MakeBarChart(id, url) {
	await $.ajax({
		type: "GET",
		url: url
	}).done(function (data) {
		timeseries = data['data'];
		length = Object.keys(timeseries).length;
		dates = [];
		deliveries = [];
		Object.keys(timeseries).map(item => {
			Object.keys(timeseries[item]).map(date => {
				dates.push(date);
				deliveries.push(timeseries[item][date]);
				//console.log(date);
			});
		}
		);

		//console.log(timeseries, length, dates, deliveries);

		var xValue = dates;

		var yValue = deliveries;

		var trace1 = {
			x: xValue,
			y: yValue,
			type: 'bar',
			textposition: 'auto',
			marker: {
				color: '#ffcf5c',
				opacity: 0.6,
				line: {
					color: '#ffcf5c',
					width: 1.5
				}
			}
		};

		var allData = [trace1];

		var layout = {
			title: 'Deliveries',
			barmode: 'stack'
		};

		var config = {
			"displaylogo": false
		}

		Plotly.newPlot(id, allData, layout, config);

	});
}

async function callGraph() {
	await MakeBarChart("chartContainer", `${urlForAll}merchant/graph/complete/delivery/${localStorage.getItem('userID')}`);
	await MakeBarChart("chartContainer2", `${urlForAll}merchant/graph/incomplete/delivery/${localStorage.getItem('userID')}`);
}
callGraph();