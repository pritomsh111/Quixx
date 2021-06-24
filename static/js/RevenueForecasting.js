function SalesOnlyModule(orgName) {
    var server = "https://ai.quixx.xyz";
    var appdir = "/sales_only";
    // var org = orgName;

    var org = "Express Food Delivery_2756";
    $.ajax({
        type: "GET",
        url: server + appdir + "/" + encodeURIComponent(org),
    }).done(function (data) {
        // console.log(data);
        dates = [new Date().toISOString().slice(0, 10)];
        sales = [0];
        
        if("data" in data) {
            timeseries = data['data']['delivery_charge'];
            change_point = data['change_point'];
            length_of_timeseries = Object.getOwnPropertyNames(timeseries).length;
            dates = Object.keys(timeseries);
            sales = Object.values(timeseries);
        }

        var trace0 = {
            x: dates,
            y: sales,
            type: "scatter",
            mode: "lines",
            marker: { color: "#ffcf5c", size: 12, opacity: 0.8 },
            name: "Previous Sales",
            fill: "tozeroy",
        };

        var allData = [trace0];

        var layout = {
            title: "Sales",
            showlegend: true,
            height: 400,
        };

        var config = {
            "displaylogo": false
        }

        Plotly.newPlot("chart", allData, layout, config);
    });
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
            SalesOnlyModule(`${data.data}_${localStorage.getItem('userID')}`);
        }
    });
