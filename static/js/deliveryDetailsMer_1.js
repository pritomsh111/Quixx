var onGoingDeliveries = () => {
    $('#onh').html("");
    $('#onh').hide();
    document.getElementById('body').style.pointerEvents = "none";
    document.getElementById('one').disabled = true;
    document.getElementById('two').disabled = false;
    document.getElementById('one').style.fontSize = '13px';
    document.getElementById('two').style.fontSize = '13px';

    document.getElementById('six').style.fontSize = '13px';
    document.getElementById('six').disabled = false;

    document.getElementById('two').innerHTML = 'Completed Deliveries';
    document.getElementById('six').innerHTML = 'On-Hold Deliveries';
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExampleAp').hide();
    $('#dtBasicExampleNew').hide();
    $('.b').hide();
    $('.c').hide();
    $('.d').hide();
    $('.e').hide();
    $('#dtBasicExampled').hide();

    var table = $('#dtBasicExampled').DataTable({
        responsive: {
            details: {
                renderer: function (api, rowIdx, columns) {
                    var data = $.map(columns, function (col, i) {
                        return col.hidden ?
                            '<tr style="text-align:left" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<td><strong>' + col.title + ':' + '</strong></td> ' +
                            '<td>' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');

                    return data ?
                        $('<table/>').append(data) :
                        false;
                }
            }
        },
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "paging": true,
        "pageLength": 100,
        "searching": false,
        "ordering": false,
        "deferRender": true,
        "pagingType": "full_numbers",
        "lengthMenu": [[100, 200, 300, 400], [100, 200, 300, 400]],
        "serverSide": true,
        "destroy": true,
        "ajax":
        {
            "url": urlForAll + "merchant/incompleted/delivery/details/" + merchant_ID,
            "type": "GET",
            "headers":
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            "dataSrc": "data"
        },
        "columns": [
            { "targets": 100, "data": null, "defaultContent": "" },
            { "targets": 0, "data": "delivery_Id" },
            { "targets": 2, "data": "delivery_status" },
            { "targets": 15, "data": "product_name" },
            { "targets": 16, "data": "product_qty" },
            { "targets": 17, "data": "product_cost" },
            { "targets": 18, "data": "delivery_charge" },
            { "targets": 19, "data": "payment_method" },
            { "targets": 10, "data": "receiver_name" },
            { "targets": 11, "data": "receiver_phone_number" },
            {
                "targets": 24, "data": "delivery_city", render: function (data, type, row) {
                    let a = row.delivery_city;
                    return a ? row.delivery_city : "";
                }
            },
            { "targets": 123, "data": "delivery_area" },
            { "targets": 13, "data": "receiver_address" },
            {
                "targets": 25, "data": "delivery_product_type", render: function (data, type, row) {
                    let a = row.delivery_product_type;
                    if (a) {
                        a = a?.includes("delivery_product_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 27, "data": "delivery_weight", render: function (data, type, row) {
                    let a = row.delivery_weight;
                    if (a) {
                        a = a?.includes("delivery_weight_na") ? "NOT_SELECTED" : a + "KG";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 26, "data": "delivery_day_type", render: function (data, type, row) {
                    let a = row.delivery_day_type;
                    if (a) {
                        a = a?.includes("delivery_day_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 28, "data": "delivery_distance", render: function (data, type, row) {
                    let a = row.delivery_distance;
                    if (a) {
                        a = a?.includes("delivery_distance_na") ? "NOT_SELECTED" : a + "KM";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 29, "data": "delivery_city_criteria", render: function (data, type, row) {
                    let a = row.delivery_city_criteria;
                    if (a) {
                        a = a?.includes("delivery_city_criteria_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            { "targets": 14, "data": "delivery_type" },
            { "targets": 5, "data": "pickup_time" },
            { "targets": 1, "data": "delivery_created_date" },
            { "targets": 20, "data": "delivery_note" },
            { "targets": 7, "data": "sender_name" },
            { "targets": 8, "data": "sender_phone_number" },
            { "targets": 9, "data": "sender_address" },
        ]
    });
    table.on('xhr', function () {
        var json = table.ajax.json();
        document.getElementById('one').innerHTML = 'Ongoing Deliveries: ' + json.recordsTotal;
        document.getElementById('two').innerHTML = 'Completed Deliveries';
        document.getElementById('six').innerHTML = 'On-Hold Deliveries';
        document.getElementById('body').style.pointerEvents = "auto";
    });
    table.clear().draw();
    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });
    $('.d').show();
    $('#dtBasicExampled').show();

}
//New
var completeDeliveries = () => {
    document.getElementById('body').style.pointerEvents = "none";
    document.getElementById('two').disabled = true;
    document.getElementById('one').disabled = false;
    document.getElementById('two').style.fontSize = '13px';
    document.getElementById('one').style.fontSize = '13px';

    document.getElementById('six').style.fontSize = '13px';
    document.getElementById('six').disabled = false;
    document.getElementById('one').innerHTML = 'Ongoing Deliveries';
    document.getElementById('six').innerHTML = 'On-Hold Deliveries';
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExampleAp').hide();
    $('#dtBasicExampleNew').hide();
    $('.b').hide();
    $('.c').hide();
    $('.d').hide();
    $('.e').hide();
    $('#dtBasicExampled').hide();

    var table = $('#dtBasicExampleNew').DataTable({
        responsive: {
            details: {
                renderer: function (api, rowIdx, columns) {
                    var data = $.map(columns, function (col, i) {
                        return col.hidden ?
                            '<tr style="text-align:left" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<td><strong>' + col.title + ':' + '</strong></td> ' +
                            '<td>' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');
                    return data ?
                        $('<table/>').append(data) :
                        false;
                }
            }
        },
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "paging": true,
        "pageLength": 100,
        "searching": false,
        "ordering": false,
        "deferRender": true,
        "pagingType": "full_numbers",
        "lengthMenu": [[100, 200, 300, 400], [100, 200, 300, 400]],
        "serverSide": true,
        "destroy": true,
        "ajax":
        {
            "url": urlForAll + "merchant/completed/delivery/details/" + merchant_ID,
            "type": "GET",
            "headers":
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            "dataSrc": "data"
        },
        "columns": [
            { "targets": 100, "data": null, "defaultContent": "" },
            { "targets": 0, "data": "delivery_Id" },
            { "targets": 2, "data": "delivery_status" },
            { "targets": 15, "data": "product_name" },
            { "targets": 16, "data": "product_qty" },
            { "targets": 17, "data": "product_cost" },
            { "targets": 18, "data": "delivery_charge" },
            { "targets": 19, "data": "payment_method" },
            { "targets": 10, "data": "receiver_name" },
            { "targets": 11, "data": "receiver_phone_number" },
            {
                "targets": 24, "data": "delivery_city", render: function (data, type, row) {
                    let a = row.delivery_city;
                    return a ? row.delivery_city : "";
                }
            },
            { "targets": 123, "data": "delivery_area" },
            { "targets": 13, "data": "receiver_address" },
            {
                "targets": 25, "data": "delivery_product_type", render: function (data, type, row) {
                    let a = row.delivery_product_type;
                    if (a) {
                        a = a?.includes("delivery_product_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 27, "data": "delivery_weight", render: function (data, type, row) {
                    let a = row.delivery_weight;
                    if (a) {
                        a = a?.includes("delivery_weight_na") ? "NOT_SELECTED" : a + "KG";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 26, "data": "delivery_day_type", render: function (data, type, row) {
                    let a = row.delivery_day_type;
                    if (a) {
                        a = a?.includes("delivery_day_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 28, "data": "delivery_distance", render: function (data, type, row) {
                    let a = row.delivery_distance;
                    if (a) {
                        a = a?.includes("delivery_distance_na") ? "NOT_SELECTED" : a + "KM";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 29, "data": "delivery_city_criteria", render: function (data, type, row) {
                    let a = row.delivery_city_criteria;
                    if (a) {
                        a = a?.includes("delivery_city_criteria_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            { "targets": 14, "data": "delivery_type" },
            { "targets": 5, "data": "pickup_time" },
            { "targets": 1, "data": "delivery_created_date" },
            { "targets": 52, "data": "delivery_complete_date" },
            { "targets": 20, "data": "delivery_note" },
            { "targets": 7, "data": "sender_name" },
            { "targets": 8, "data": "sender_phone_number" },
            { "targets": 9, "data": "sender_address" },
        ]
    });
    table.on('xhr', function () {
        var json = table.ajax.json();
        document.getElementById('two').innerHTML = 'Completed Deliveries: ' + json.recordsTotal;
        document.getElementById('six').innerHTML = 'On-Hold Deliveries';
        document.getElementById('one').innerHTML = 'Ongoing Deliveries';
        document.getElementById('body').style.pointerEvents = "auto";
    });
    table.clear().draw();
    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });

    $('#dtBasicExampleNew').show();
    $('.e').show();
}

var onHoldDeliveries = () => {
    $('#onh').show();
    $('#onh').html("This table will let you know which of your deliveries were On-Hold!");
    document.getElementById('body').style.pointerEvents = "none";
    document.getElementById('one').disabled = false;
    document.getElementById('two').disabled = false;
    document.getElementById('one').style.fontSize = '13px';
    document.getElementById('two').style.fontSize = '13px';

    document.getElementById('six').style.fontSize = '13px';
    document.getElementById('six').disabled = true;
    document.getElementById('one').innerHTML = 'Ongoing Deliveries';
    document.getElementById('two').innerHTML = 'Completed Deliveries';
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExampleAp').hide();
    $('#dtBasicExampleNew').hide();
    $('.b').hide();
    $('.c').hide();
    $('.d').hide();
    $('.e').hide();
    $('#dtBasicExampled').hide();

    var table2 = $('#dtBasicExampled').DataTable({
        responsive: {
            details: {
                renderer: function (api, rowIdx, columns) {
                    var data = $.map(columns, function (col, i) {
                        return col.hidden ?
                            '<tr style="text-align:left" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<td><strong>' + col.title + ':' + '</strong></td> ' +
                            '<td>' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');

                    return data ?
                        $('<table/>').append(data) :
                        false;
                }
            }
        },
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<span class='loader5'></span><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "paging": true,
        "pageLength": 100,
        "searching": false,
        "ordering": false,
        "deferRender": true,
        "pagingType": "full_numbers",
        "lengthMenu": [[100, 200, 300, 400], [100, 200, 300, 400]],
        "serverSide": true,
        "destroy": true,
        "ajax":
        {
            "url": urlForAll + "delivery/onHold/" + merchant_ID,
            "type": "GET",
            "headers":
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            "dataSrc": "data"
        },
        "columns": [
            { "targets": 100, "data": null, "defaultContent": "" },
            { "targets": 0, "data": "delivery_Id" },
            { "targets": 2, "data": "delivery_status" },
            { "targets": 15, "data": "product_name" },
            { "targets": 16, "data": "product_qty" },
            { "targets": 17, "data": "product_cost" },
            { "targets": 18, "data": "delivery_charge" },
            { "targets": 19, "data": "payment_method" },
            { "targets": 10, "data": "receiver_name" },
            { "targets": 11, "data": "receiver_phone_number" },
            {
                "targets": 24, "data": "delivery_city", render: function (data, type, row) {
                    let a = row.delivery_city;
                    return a ? row.delivery_city : "";
                }
            },
            { "targets": 123, "data": "delivery_area" },
            { "targets": 13, "data": "receiver_address" },
            {
                "targets": 25, "data": "delivery_product_type", render: function (data, type, row) {
                    let a = row.delivery_product_type;
                    if (a) {
                        a = a?.includes("delivery_product_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 27, "data": "delivery_weight", render: function (data, type, row) {
                    let a = row.delivery_weight;
                    if (a) {
                        a = a?.includes("delivery_weight_na") ? "NOT_SELECTED" : a + "KG";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 26, "data": "delivery_day_type", render: function (data, type, row) {
                    let a = row.delivery_day_type;
                    if (a) {
                        a = a?.includes("delivery_day_type_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 28, "data": "delivery_distance", render: function (data, type, row) {
                    let a = row.delivery_distance;
                    if (a) {
                        a = a?.includes("delivery_distance_na") ? "NOT_SELECTED" : a + "KM";
                        return a;
                    }
                    return "---";
                }
            },
            {
                "targets": 29, "data": "delivery_city_criteria", render: function (data, type, row) {
                    let a = row.delivery_city_criteria;
                    if (a) {
                        a = a?.includes("delivery_city_criteria_na") ? "NOT_SELECTED" : a;
                        return a;
                    }
                    return "---";
                }
            },
            { "targets": 14, "data": "delivery_type" },
            { "targets": 5, "data": "pickup_time" },
            { "targets": 1, "data": "delivery_created_date" },
            { "targets": 20, "data": "delivery_note" },
            { "targets": 7, "data": "sender_name" },
            { "targets": 8, "data": "sender_phone_number" },
            { "targets": 9, "data": "sender_address" }
        ]
    });
    table2.on('xhr', function () {
        var json = table2.ajax.json();
        document.getElementById('six').innerHTML = 'On-Hold Deliveries: ' + json.recordsTotal;
        document.getElementById('two').innerHTML = 'Completed Deliveries';
        document.getElementById('one').innerHTML = 'Ongoing Deliveries';
        document.getElementById('body').style.pointerEvents = "auto";
    });
    table2.clear().draw();
    /*$.ajax
    ({
        async: true,
        type: "GET",
        cors: true,
        contentType:'application/json',
        secure: true,
        crossDomain: true,
        url: urlForAll + "delivery/onHold/" + merchant_ID,
        headers: 
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        beforeSend: function()
        {
            document.getElementById("dtBasicExampled_processing").style.display = "block";	
        },
        success: function(data) 
        {
            document.getElementById('six').innerHTML = 'On-Hold Deliveries: ' + data.data.length;
            var trHTML = '';
            $.each(data.data, function (i, item) {
            var table_rows = 
            '<tr><td>'+data.data[i].delivery_Id+'</td><td>'
            +data.data[i].delivery_created_date+'</td><td>'
            +data.data[i].delivery_status+'</td><td>'
            //+data.data[i].assigned_delivery_man_name+'</td><td>'
            +data.data[i].pickup_time+'</td><td>'
            +data.data[i].sender_name+'</td><td>'
            +data.data[i].sender_phone_number+'</td><td>'
            +data.data[i].sender_address+'</td><td>'
            +data.data[i].receiver_name+'</td><td>'
            +data.data[i].receiver_phone_number+'</td><td>'
            +data.data[i].receiver_address+'</td><td>'
            +data.data[i].product_name+'</td><td>'
            +data.data[i].product_qty+'</td><td>'
            +data.data[i].product_cost+'</td><td>'
            +data.data[i].delivery_charge+'</td><td>'
            +data.data[i].payment_method+'</td><td>'
            +data.data[i].delivery_type+'</td><td>'
            +data.data[i].delivery_note+'</td></tr>';
            table.rows.add($(table_rows)).draw();
            });
        },
        complete:function(data){
            document.getElementById("dtBasicExampled_processing").style.display = "none";	
        }
    });*/
    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '220px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '220px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFF' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFF' });
    $('.d').show();
    $('#dtBasicExampled').show();
}