function SalesOnlyModule() {
    // var server = "http://127.0.0.1:5000";
    var server = "https://ai.quixx.xyz";
    var appdir = "/sales_only";
    var org = "/Express Food Delivery_2756";
    // var org = '/Express Food Delivery_2751'
    var send_msg = "<p>Sending</p>";
    console.log(send_msg);
    // $.ajax({
    //     type: "POST",
    //     url: server + appdir + org,
    //     data: JSON.stringify(send_Data),
    //     dataType: 'json'

    $.ajax({
        type: "GET",
        url: server + appdir + org,
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
SalesOnlyModule();