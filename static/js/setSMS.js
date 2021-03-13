$(document).ready(function () {
    $("#settings").hide();
});

let Org_JC = document.querySelector("Org_JC");
let Mer_JC = document.querySelector("Mer_JC");
let Receiver_JC = document.querySelector("Receiver_JC");

let Org_ETP = document.querySelector("Org_ETP");
let Mer_ETP = document.querySelector("Mer_ETP");
let Receiver_ETP = document.querySelector("Receiver_ETP");

let Org_PU = document.querySelector("Org_PU");
let Mer_PU = document.querySelector("Mer_PU");
let Receiver_PU = document.querySelector("Receiver_PU");

let Org_ETD = document.querySelector("Org_ETD");
let Mer_ETD = document.querySelector("Mer_ETD");
let Receiver_ETD = document.querySelector("Receiver_ETD");

let Org_D = document.querySelector("Org_D");
let Mer_D = document.querySelector("Mer_D");
let Receiver_D = document.querySelector("Receiver_D");

$.ajax
    ({
        async: true,
        type: "GET",
        url: urlForAll + "profile/get/profile/" + localStorage.getItem('userID'),
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            $('#myModal2').modal('show');
        }
    })


document.getElementById("setSMSBtnD").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: "PUT",
            url: urlForAll + "profile/update/settings",
            data: JSON.stringify
                ({
                    "user_id": localStorage.getItem('userID'),
                    "operations_manager_number": operations_manager_number,
                    "sender_address": s_address,
                    "sender_lat": s_lat,
                    "sender_longi": s_longi
                }),
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDD2').hide();
                $(".circle-loader").removeClass("load-complete");
                $("#sureDD2").html("");
                $("#myModalCreateDD1").modal('show');
                $("#sureDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-complete");

                        $('#tickDD2').show();

                        $("#sureDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                // $("#myModalCreateDD1").modal('hide');
                $('#myModal2').modal('show');
            }
        })
});