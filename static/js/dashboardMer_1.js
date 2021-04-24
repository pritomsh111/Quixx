async function MakeBarChart(id, url) {
	await $.ajax({
		type: "GET",
		url: url
		// url: "https://prod.quixx.xyz/api/quixx/v1/orgHead/total/complete/delivery/for/graph/2756"
	}).done(function (data) {
		timeseries = data['data'];
		length = Object.keys(timeseries).length;


		dates = Object.keys(timeseries);
		deliveries = Object.values(timeseries);



		console.log(timeseries, length, dates, deliveries);

		var xValue = dates;

		var yValue = deliveries;

		var trace1 = {
			x: xValue,
			y: yValue,
			type: 'bar',
			textposition: 'auto',
			marker: {
				color: 'rgb(225,218,158)',
				opacity: 0.6,
				line: {
					color: 'rgb(107,97,8)',
					width: 1.5
				}
			}
		};

		var allData = [trace1];

		var layout = {
			title: 'Deliveries',
			barmode: 'stack'
		};

		Plotly.newPlot('chartContainer', allData, layout);

	});
}

async function callGraph() {
	await MakeBarChart("chartContainer", `${urlForAll}merchant/graph/complete/delivery/${localStorage.getItem('userID')}`);
	await MakeBarChart("chartContainer2", `${urlForAll}merchant/graph/incomplete/delivery/${localStorage.getItem('userID')}`);
}
callGraph();