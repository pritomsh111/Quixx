function MakeBarChart() {

	$.ajax
		({
			type: "GET",
			url: urlForAll + "orgHead/total/complete/delivery/for/graph/" + localStorage.getItem('userID'),
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"Authorization": 'Bearer ' + localStorage.getItem('token')
			},
			success: function (data) {
				timeseries = data['data'];
				length = Object.keys(timeseries).length;
				dates = Object.keys(timeseries);
				deliveries = Object.values(timeseries);

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
						opacity: 0.8,
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

				Plotly.newPlot('bar_chart', allData, layout, config);
			}
		});
}

MakeBarChart();