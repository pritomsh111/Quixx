var org_ID = localStorage.getItem('userID');
var day = 0;

var createCriteria = () => {
    // document.getElementById('four').disabled = true;
    // document.getElementById('twoa').disabled = false;
    // document.getElementById('threea').disabled = false;
    // document.getElementById('onea').disabled = false;
    // document.getElementById('four').style.fontSize = '14.5px';
    // document.getElementById('twoa').style.fontSize = '13px';
    // document.getElementById('threea').style.fontSize = '13px';
    // document.getElementById('onea').style.fontSize = '13px';

    // document.getElementById('foura').style.fontSize = '13px';
    // document.getElementById('fivea').style.fontSize = '13px';
    // document.getElementById('foura').innerHTML = 'Activated Delivery Man';
    // document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

    // document.getElementById('foura').disabled = false;
    // document.getElementById('fivea').disabled = false;
    // $('#dtBasicExampleActivate').hide();
    // $('#dtBasicExampleDisable').hide();
    // $('.c').hide();
    // $('.d').hide();

    // document.getElementById('onea').innerHTML = 'Registered Delivery Man';
    // document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
    // document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
    // $('#dtBasicExample').hide();
    // $('#dtBasicExample2').hide();
    // $('.a').hide();
    // $('.b').hide();
    $('#createCriteria').show();
};

var createField = (type) => {
    let typeForCreate = type === "day" ? ".col.day" : type === "type" ? ".col.type" : type === "weight" ? ".col.weight" : type === "distance" ? ".col.distance" : null;
    let placeHolder = type === "day" ? "Urgent SameDay NextDay ..." : type === "type" ? "Glass, Food ..." : type === "weight" ? "1-2, 1-4, 3, 0.6 ...(KG)" : type === "distance" ? "1-2, 2, 3, 0.4 ...(KM)" : null;
    let div = document.querySelector(`${typeForCreate}`);

    let dummyDivFlex = document.createElement("div");
    dummyDivFlex.className = `flexIt di${div.childElementCount}`;

    let input = document.createElement("input");
    input.type = "text";
    input.style.cssText = "color: #0066b3; margin-top:0.2rem; width: 100%;";
    input.className = `form-control day-input`;
    input.placeholder = placeHolder;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "material-icons";
    deleteIcon.style.cssText = "cursor: pointer;";
    deleteIcon.innerHTML = "delete_outline";
    deleteIcon.onclick = remove.bind(this, div, day);

    dummyDivFlex.append(input, deleteIcon);

    div.append(dummyDivFlex);
}

var remove = (criteriaDiv, criteriatype) => {
    console.log(criteriaDiv.children, criteriatype);
}
















var registeredDeliveryMan = () => {
    document.getElementById('onea').disabled = true;
    document.getElementById('twoa').disabled = false;
    document.getElementById('threea').disabled = false;
    document.getElementById('four').disabled = false;
    document.getElementById('onea').style.fontSize = '14.5px';
    document.getElementById('twoa').style.fontSize = '13px';
    document.getElementById('threea').style.fontSize = '13px';
    document.getElementById('four').style.fontSize = '13px';
    document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
    document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
    document.getElementById('foura').style.fontSize = '13px';
    document.getElementById('fivea').style.fontSize = '13px';
    document.getElementById('foura').innerHTML = 'Activated Delivery Man';
    document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

    document.getElementById('foura').disabled = false;
    document.getElementById('fivea').disabled = false;
    $('#dtBasicExampleActivate').hide();
    $('#dtBasicExampleDisable').hide();
    $('.c').hide();
    $('.d').hide();


    $('#deliveryManCreate').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    var table = $('#dtBasicExample').DataTable({
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "destroy": true,
        "oSearch": { "bSmart": false, "bRegex": true }
    });
    table.clear().draw();
    $.ajax
        ({
            async: true,
            type: "GET",
            cors: true,
            contentType: 'application/json',
            secure: true,
            crossDomain: true,
            url: urlForAll + "deliveryMan/getDeliveryManByUserId/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function () {
                document.getElementById("dtBasicExample_processing").style.display = "block";
            },
            success: function (data) {
                document.getElementById('onea').innerHTML = 'Registered Delivery Man: ' + data.data.length;
                var trHTML = '';
                $.each(data.data, function (i, item) {
                    var table_rows = '<tr><td>'
                        + data.data[i].delivery_man_id + '</td><td>'
                        + data.data[i].name + '</td><td>'
                        + data.data[i].email + '</td><td>'
                        + data.data[i].phone_number + '</td><td>'
                        + data.data[i].delivery_area + '</td><td>'
                        + data.data[i].reporting_boss_email + '</td><td>'
                        + '<button class="btn-round btn-outline btn" disabled>Invoice</button></td></tr>';

                    table.rows.add($(table_rows)).draw();
                });
            },
            complete: function (data) {
                document.getElementById("dtBasicExample_processing").style.display = "none";
            }
        });

    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
    $('#dtBasicExample').show();
    $('.a').show();
};
var approvedDeliveryMan = () => {
    document.getElementById('twoa').disabled = true;
    document.getElementById('onea').disabled = false;
    document.getElementById('threea').disabled = false;
    document.getElementById('four').disabled = false;
    document.getElementById('twoa').style.fontSize = '14.5px';
    document.getElementById('onea').style.fontSize = '13px';
    document.getElementById('threea').style.fontSize = '13px';
    document.getElementById('four').style.fontSize = '13px';
    document.getElementById('onea').innerHTML = 'Registered Delivery Man';
    document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
    document.getElementById('foura').style.fontSize = '13px';
    document.getElementById('fivea').style.fontSize = '13px';
    document.getElementById('foura').innerHTML = 'Activated Delivery Man';
    document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

    document.getElementById('foura').disabled = false;
    document.getElementById('fivea').disabled = false;
    $('#dtBasicExampleActivate').hide();
    $('#dtBasicExampleDisable').hide();
    $('.c').hide();
    $('.d').hide();
    $('#deliveryManCreate').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();
    var table = $('#dtBasicExample').DataTable({
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "destroy": true,
        "oSearch": { "bSmart": false, "bRegex": true }
    });
    table.clear().draw();
    $.ajax
        ({
            async: true,
            type: "GET",
            cors: true,
            contentType: 'application/json',
            secure: true,
            crossDomain: true,
            url: urlForAll + "deliveryMan/approved/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function () {
                document.getElementById("dtBasicExample_processing").style.display = "block";
            },
            success: function (data) {
                document.getElementById('twoa').innerHTML = 'Approved Delivery Man: ' + data.data.length;
                var trHTML = '';
                $.each(data.data, function (i, item) {
                    var table_rows = '<tr><td>'
                        + data.data[i].delivery_man_id + '</td><td>'
                        + data.data[i].name + '</td><td>'
                        + data.data[i].email + '</td><td>'
                        + data.data[i].phone_number + '</td><td>'
                        + data.data[i].delivery_area + '</td><td>'
                        + data.data[i].reporting_boss_email + '</td><td>'
                        + '<button id="' + data.data[i].delivery_man_id + '" class="btn-round btn-outline btn" onclick="thisInvoice(this)">Invoice</button></td></tr>';


                    table.rows.add($(table_rows)).draw();
                });
            },
            complete: function (data) {
                document.getElementById("dtBasicExample_processing").style.display = "none";
            }
        });

    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
    $('#dtBasicExample').show();
    $('.a').show();
}

var unApprovedDeliveryMan = () => {
    document.getElementById('threea').disabled = true;
    document.getElementById('twoa').disabled = false;
    document.getElementById('onea').disabled = false;
    document.getElementById('four').disabled = false;
    document.getElementById('threea').style.fontSize = '14.5px';
    document.getElementById('twoa').style.fontSize = '13px';
    document.getElementById('onea').style.fontSize = '13px';
    document.getElementById('four').style.fontSize = '13px';
    document.getElementById('onea').innerHTML = 'Registered Delivery Man';
    document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
    document.getElementById('foura').style.fontSize = '13px';
    document.getElementById('fivea').style.fontSize = '13px';
    document.getElementById('foura').innerHTML = 'Activated Delivery Man';
    document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

    document.getElementById('foura').disabled = false;
    document.getElementById('fivea').disabled = false;
    $('#dtBasicExampleActivate').hide();
    $('#dtBasicExampleDisable').hide();
    $('.c').hide();
    $('.d').hide();
    $('#deliveryManCreate').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();

    var table = $('#dtBasicExample2').DataTable({
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "destroy": true,
        "oSearch": { "bSmart": false, "bRegex": true }
    });
    table.clear().draw();
    $.ajax
        ({
            async: true,
            type: "GET",
            cors: true,
            contentType: 'application/json',
            secure: true,
            crossDomain: true,
            url: urlForAll + "deliveryMan/unApproved/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function () {
                document.getElementById("dtBasicExample2_processing").style.display = "block";
            },
            success: function (data) {
                document.getElementById('threea').innerHTML = 'Unapproved Delivery Man: ' + data.data.length;
                var trHTML = '';
                $.each(data.data, function (i, item) {
                    var table_rows = '<tr><td>'
                        + data.data[i].delivery_man_id + '</td><td>'
                        + data.data[i].name + '</td><td>'
                        + data.data[i].email + '</td><td>'
                        + data.data[i].phone_number + '</td><td>'
                        + data.data[i].delivery_area + '</td><td>'
                        + data.data[i].reporting_boss_email + '</td><td>'
                        + '<button id="' + data.data[i].delivery_man_id + '" class="btn-round btn-outline btn approveIT">Approve</button></td></tr>';;

                    table.rows.add($(table_rows)).draw();
                });
            },
            complete: function (data) {
                document.getElementById("dtBasicExample2_processing").style.display = "none";
            }
        });

    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
    $('#dtBasicExample2').show();
    $('.b').show();
};


var activatedd = () => {
    document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
    document.getElementById('threea').style.fontSize = '13px';
    document.getElementById('threea').disabled = false;
    document.getElementById('twoa').disabled = false;
    document.getElementById('onea').disabled = false;
    document.getElementById('four').disabled = false;
    document.getElementById('twoa').style.fontSize = '13px';
    document.getElementById('onea').style.fontSize = '13px';
    document.getElementById('four').style.fontSize = '13px';
    document.getElementById('onea').innerHTML = 'Registered Delivery Man';
    document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
    document.getElementById('foura').style.fontSize = '14.5px';
    document.getElementById('fivea').style.fontSize = '13px';
    document.getElementById('fivea').innerHTML = 'Disabled Delivery Man';

    document.getElementById('foura').disabled = true;
    document.getElementById('fivea').disabled = false;
    $('#dtBasicExampleActivate').hide();
    $('#dtBasicExampleDisable').hide();
    $('.c').hide();
    $('.d').hide();
    $('#deliveryManCreate').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();

    var table = $('#dtBasicExampleActivate').DataTable({
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "destroy": true,
        "oSearch": { "bSmart": false, "bRegex": true }
    });
    table.clear().draw();
    $.ajax
        ({
            async: true,
            type: "GET",
            cors: true,
            contentType: 'application/json',
            secure: true,
            crossDomain: true,
            url: urlForAll + "orgHead/all/enable/deliveryMan/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function () {
                document.getElementById("dtBasicExampleActivate_processing").style.display = "block";
            },
            success: function (data) {
                document.getElementById('foura').innerHTML = 'Activated Delivery Man: ' + data.data.length;
                var trHTML = '';
                $.each(data.data, function (i, item) {
                    var table_rows = '<tr><td>'
                        + data.data[i].delivery_man_id + '</td><td>'
                        + data.data[i].name + '</td><td>'
                        + data.data[i].email + '</td><td>'
                        + data.data[i].phone_number + '</td><td>'
                        + data.data[i].delivery_area + '</td><td>'
                        + data.data[i].reporting_boss_email + '</td><td>'
                        + '<button id="' + data.data[i].delivery_man_id + '" class="btn-round btn-outline btn btn-Disable">Disable</button></td></tr>';;

                    table.rows.add($(table_rows)).draw();
                });
            },
            complete: function (data) {
                document.getElementById("dtBasicExampleActivate_processing").style.display = "none";
            }
        });

    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
    $('#dtBasicExampleActivate').show();
    $('.c').show();
};


var disableddd = () => {
    document.getElementById('threea').innerHTML = 'Unapproved Delivery Man';
    document.getElementById('threea').style.fontSize = '13px';
    document.getElementById('threea').disabled = false;
    document.getElementById('twoa').disabled = false;
    document.getElementById('onea').disabled = false;
    document.getElementById('four').disabled = false;
    document.getElementById('twoa').style.fontSize = '13px';
    document.getElementById('onea').style.fontSize = '13px';
    document.getElementById('four').style.fontSize = '13px';
    document.getElementById('onea').innerHTML = 'Registered Delivery Man';
    document.getElementById('twoa').innerHTML = 'Approved Delivery Man';
    document.getElementById('foura').style.fontSize = '13px';
    document.getElementById('fivea').style.fontSize = '14.5px';
    document.getElementById('foura').innerHTML = 'Activated Delivery Man';
    document.getElementById('foura').disabled = false;
    document.getElementById('fivea').disabled = true;

    $('#dtBasicExampleActivate').hide();
    $('#dtBasicExampleDisable').hide();
    $('.c').hide();
    $('.d').hide();
    $('#deliveryManCreate').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();

    var table = $('#dtBasicExampleDisable').DataTable({
        "processing": true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': "<div class='loader5'></div><h4 style='color:#0066b3'>Loading...</h4>"
        },
        "destroy": true,
        "oSearch": { "bSmart": false, "bRegex": true }
    });
    table.clear().draw();
    $.ajax
        ({
            async: true,
            type: "GET",
            cors: true,
            contentType: 'application/json',
            secure: true,
            crossDomain: true,
            url: urlForAll + "orgHead/all/disable/deliveryMan/" + org_ID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function () {
                document.getElementById("dtBasicExampleDisable_processing").style.display = "block";
            },
            success: function (data) {
                document.getElementById('fivea').innerHTML = 'Disabled Delivery Man: ' + data.data.length;
                var trHTML = '';
                $.each(data.data, function (i, item) {
                    var table_rows = '<tr><td>'
                        + data.data[i].delivery_man_id + '</td><td>'
                        + data.data[i].name + '</td><td>'
                        + data.data[i].email + '</td><td>'
                        + data.data[i].delivery_area + '</td><td>'
                        + data.data[i].reporting_boss_email + '</td><td>'
                        + '<button id="' + data.data[i].delivery_man_id + '" class="btn-round btn-outline btn btn-Activate">Activate</button></td></tr>';;

                    table.rows.add($(table_rows)).draw();
                });
            },
            complete: function (data) {
                document.getElementById("dtBasicExampleDisable_processing").style.display = "none";
            }
        });

    $('.dataTables_filter input[type="search"]').
        attr('placeholder', 'Search anything!').
        css({ 'width': '300px', 'display': 'inline-block', 'background': 'white' });

    $('.dataTables_filter input[type="search"]').
        attr('class', 'btn btn-round').
        css({ 'width': '300px', 'display': 'inline-block', 'color': '#000000', 'background': '#FFFFFA' });

    $('.dataTables_length select').
        attr('class', 'btn btn-round').
        css({ 'width': '80px', 'background-color': 'white', 'color': '#000000', 'background': '#FFFFFA' });
    $('#dtBasicExampleDisable').show();
    $('.d').show();
};
var addDeliveryMan = () => {
    //$('#deliveryManCreate').hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExample2').hide();
    $('.b').hide();
    var deliveryManName = document.getElementById('deliveryManName').value;
    var deliveryManEmail = document.getElementById('deliveryManEmail').value;
    var deliveryManPhone = document.getElementById('deliveryManPhone').value;
    var reportingBossEmail = document.getElementById('managers').value;
    var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
    var s = "";
    var l = checkedBoxes.length, dummy = 0;
    for (var i of checkedBoxes) {
        s += String(i.value);
        dummy++;
        if (dummy < l) {
            s += ",";
        }
    }
    var v1 = () => {
        if (deliveryManName == "" || deliveryManName == null) {
            document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's name cannot be empty!";
            $('#myModalWrongDManCreate').modal('show');
            document.getElementById("deliveryManName").focus();
            return 0;
        }
        else {
            return 1;
        }
    }
    var v3 = () => {
        if (deliveryManEmail == "" || deliveryManEmail == null) {
            document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's email cannot be empty!";
            $('#myModalWrongDManCreate').modal('show');
            document.getElementById("deliveryManEmail").focus();
            return 0;
        }
        else if (deliveryManEmail != "" || deliveryManEmail != null) {
            var em = deliveryManEmail.split("@").length - 1;
            var atposition = deliveryManEmail.indexOf("@");
            var dotposition = deliveryManEmail.lastIndexOf(".");
            if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= deliveryManEmail.length || em > 1) {
                document.getElementById('wrongThisDManCreate').innerHTML = "Please enter a valid e-mail address!";
                $('#myModalWrongDManCreate').modal('show');
                document.getElementById("deliveryManEmail").focus();
                return 0;
            }
            else {
                return 1;
            }
        }

    }
    var v4 = () => {
        if (deliveryManPhone == "" || deliveryManPhone == null) {
            document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number cannot be empty!";
            $('#myModalWrongDManCreate').modal('show');
            document.getElementById("deliveryManPhone").focus();
            return 0;
        }
        else if ((deliveryManPhone.length < 11 || deliveryManPhone.length > 11) && !/\D/.test(deliveryManPhone) == true) {
            document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number must be of 11 digits!";
            $('#myModalWrongDManCreate').modal('show');
            document.getElementById("deliveryManPhone").focus();
            return 0;
        }
        else if (deliveryManPhone.match(/\d/g).length === 11 && !/\D/.test(deliveryManPhone) == true) {
            return 1;
        }
        else {
            document.getElementById('wrongThisDManCreate').innerHTML = "Delivery man's Phone Number not valid!";
            $('#myModalWrongDManCreate').modal('show');
            document.getElementById("deliveryManPhone").focus();
            return 0;
        }

    }
    var v5 = () => {
        if (l == 0) {
            document.getElementById('wrongThisDManCreate').innerHTML = "Please select at least one Delivery Area!";
            $('#myModalWrongDManCreate').modal('show');
            return 0;
        }
        else {
            return 1;
        }
    }
    if (v1() == 1 && v3() == 1 && v4() == 1 && v5() == 1) {
        document.getElementById('DeliveryMan_CREATION').disabled = true;
        //document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
        //$(".container").show();
        $.ajax
            ({
                type: "POST",
                url: urlForAll + "deliveryMan/create/" + org_ID, //loginUserID,
                data: JSON.stringify
                    ({
                        "name": deliveryManName,
                        "phone_number": deliveryManPhone,
                        "email": deliveryManEmail,
                        "delivery_area": s,
                        "reporting_boss_email": reportingBossEmail
                    }),
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                },
                success: function (data) {
                    $('#tick').hide();
                    $(".circle-loader").removeClass("load-complete");
                    $("#sure").html("");
                    $("#myModal").modal('show');
                    if (data.status == 'OK') {
                        $("#sure").html("Please wait!");
                        setTimeout(function () {
                            $(".circle-loader").addClass("load-complete");

                            $('#tick').show();

                            $("#sure").html("Delivery man added!");
                        }, 3000);
                        $('input[type=checkbox]').prop('checked', false);
                        document.getElementById('deliveryManName').value = "";
                        document.getElementById('deliveryManEmail').value = "";
                        document.getElementById('deliveryManPhone').value = "";
                        setTimeout(function () {

                            document.getElementById('DeliveryMan_CREATION').disabled = false;
                            $("#myModal").modal('hide');
                        }, 4000);
                    }
                },
                error: function (data) {
                    document.getElementById('DeliveryMan_CREATION').disabled = false;
                    document.getElementById('wrong').innerHTML = data.responseJSON.errorMessage + 's';
                    $('#myModal2').modal('show');
                }
            })
    }
};

$('#dtBasicExample2').on('click', '.approveIT', function () {
    deliveryManId = $(this).attr('id');
    $t = $(this);

    $('#tick2').hide();
    $(".circle-loader").removeClass("load-complete");

    $("#sure2").html("Are you sure?");
    $("#myModalMer").modal('show');
    //$(".container").show();
    //document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-ok').click(function () {

    $("#sure2").html("Please wait!");
    document.getElementById('modalCancelX').disabled = true;
    document.getElementById('modalApproveX').disabled = true;
    $.ajax
        ({
            async: true,
            type: "GET",
            url: urlForAll + "orgHead/deliveryMan/" + deliveryManId,

            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $("#sure2").html("Please wait!");
                setTimeout(function () {
                    $(".circle-loader").addClass("load-complete");

                    $('#tick2').show();

                    $("#sure2").html("Delivery Man Approved!");
                }, 900);

                setTimeout(function () {
                    $("#myModalMer").modal('hide');
                    var table = $('#dtBasicExample2').DataTable();
                    table
                        .row($t.parents('tr'))
                        .remove()
                        .draw();
                    document.getElementById('threea').innerHTML = 'Unapproved Delivery Man: ' + table
                        .column(0)
                        .data()
                        .length;

                    document.getElementById('modalCancelX').disabled = false;
                    document.getElementById('modalApproveX').disabled = false;

                }, 2000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                document.getElementById('modalCancelX').disabled = false;
                document.getElementById('modalApproveX').disabled = false;
                $('#myModalMer').modal('hide');
                $('#myModalE').modal('show');
            }
        });
});

$('#dtBasicExampleActivate').on('click', '.btn-Disable', function () {
    merId = $(this).attr('id');
    $t = $(this);

    $('#tickActivate').hide();
    $(".circle-loader").removeClass("load-complete");

    $("#sureActivate").html("Are you sure?");
    $("#myModalMerActivate").modal('show');
    //$(".container").show();
    //document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okActivate').click(function () {

    $("#sureActivate").html("Please wait!");
    document.getElementById('modalCancel1Activate').disabled = true;
    document.getElementById('modalApprove1Activate').disabled = true;
    $.ajax
        ({
            async: true,
            type: "PUT",
            url: urlForAll + "orgHead/disable/deliveryMan/" + org_ID + "/" + merId,

            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $("#sureActivate").html("Please wait!");
                setTimeout(function () {
                    $(".circle-loader").addClass("load-complete");

                    $('#tickActivate').show();

                    $("#sureActivate").html("Delivery Man Disabled!");
                }, 900);

                setTimeout(function () {
                    $("#myModalMerActivate").modal('hide');
                    var table = $('#dtBasicExampleActivate').DataTable();
                    table
                        .row($t.parents('tr'))
                        .remove()
                        .draw();
                    document.getElementById('foura').innerHTML = 'Activated Delivery Man: ' + table
                        .column(0)
                        .data()
                        .length;

                    document.getElementById('modalCancel1Activate').disabled = false;
                    document.getElementById('modalApprove1Activate').disabled = false;
                }, 2000);
            },
            error: function (data) {

                document.getElementById('modalCancel1Activate').disabled = false;
                document.getElementById('modalApprove1Activate').disabled = false;
                $('#myModalMerActivate').modal('hide');
                $('#myModalE').modal('show');
            }
        });
});

$('#dtBasicExampleDisable').on('click', '.btn-Activate', function () {
    merId = $(this).attr('id');
    $t = $(this);

    $('#tickDisable').hide();
    $(".circle-loader").removeClass("load-complete");

    $("#sureDisable").html("Are you sure?");
    $("#myModalMerDisable").modal('show');
    //$(".container").show();
    //document.getElementsByClassName('blur')[0].style.filter = "blur(8px)";
});
$('.btn-okDisable').click(function () {

    $("#sureDisable").html("Please wait!");
    document.getElementById('modalCancel1Disable').disabled = true;
    document.getElementById('modalApprove1Disable').disabled = true;
    $.ajax
        ({
            async: true,
            type: "PUT",
            url: urlForAll + "orgHead/enable/deliveryMan/" + org_ID + "/" + merId,

            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $("#sureDisable").html("Please wait!");
                setTimeout(function () {
                    $(".circle-loader").addClass("load-complete");

                    $('#tickDisable').show();

                    $("#sureDisable").html("Delivery Man Activated!");
                }, 900);

                setTimeout(function () {
                    $("#myModalMerDisable").modal('hide');
                    var table = $('#dtBasicExampleDisable').DataTable();
                    table
                        .row($t.parents('tr'))
                        .remove()
                        .draw();
                    document.getElementById('fivea').innerHTML = 'Disabled Delivery Man: ' + table
                        .column(0)
                        .data()
                        .length;

                    document.getElementById('modalCancel1Disable').disabled = false;
                    document.getElementById('modalApprove1Disable').disabled = false;
                }, 2000);
            },
            error: function (data) {

                document.getElementById('modalCancel1Disable').disabled = false;
                document.getElementById('modalApprove1Disable').disabled = false;
                $('#myModalMerDisable').modal('hide');
                $('#myModalE').modal('show');
            }
        });
});
