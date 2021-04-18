function SalesOnlyModule(orgName) {
    var server = "https://ai.quixx.xyz";
    var appdir = "/sales_only";
    // console.log(orgName);
    // var org = "Food_12";
    var org = "Express Food Delivery_2756";
    // var send_msg = "<p>Sending</p>";
    // console.log(send_msg);
    $.ajax({
        type: "GET",
        url: server + appdir + "/" + encodeURIComponent(org),
    }).done(function (data) {
        console.log(data);
        timeseries = data["data"]["delivery_charge"];
        change_point = data["change_point"];
        length = Object.getOwnPropertyNames(timeseries).length;
        dates = Object.keys(timeseries);
        sales = Object.values(timeseries);

        var trace0 = {
            x: dates,
            y: sales,
            type: "scatter",
            mode: "lines",
            marker: { color: "#ffcf5c", size: 12 },
            name: "Previous Sales",
            fill: "tozeroy",
        };

        var allData = [trace0];

        var layout = {
            title: "Sales",
            showlegend: true,
            height: 400,
        };

        Plotly.newPlot("chart", allData, layout);
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
