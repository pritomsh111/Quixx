$(document).ready(function () {
    $("#settings").hide();
});

let Org_JC = document.getElementById("Org_JC");
let Mer_JC = document.getElementById("Mer_JC");
let Receiver_JC = document.getElementById("Receiver_JC");

let Org_JCC = document.getElementById("Org_JCC");
let Mer_JCC = document.getElementById("Mer_JCC");
let Receiver_JCC = document.getElementById("Receiver_JCC");

let Org_ETP = document.getElementById("Org_ETP");
let Mer_ETP = document.getElementById("Mer_ETP");
let Receiver_ETP = document.getElementById("Receiver_ETP");

let Org_ETPC = document.getElementById("Org_ETPC");
let Mer_ETPC = document.getElementById("Mer_ETPC");
let Receiver_ETPC = document.getElementById("Receiver_ETPC");

let Org_PU = document.getElementById("Org_PU");
let Mer_PU = document.getElementById("Mer_PU");
let Receiver_PU = document.getElementById("Receiver_PU");

let Org_PUC = document.getElementById("Org_PUC");
let Mer_PUC = document.getElementById("Mer_PUC");
let Receiver_PUC = document.getElementById("Receiver_PUC");

let Org_ETD = document.getElementById("Org_ETD");
let Mer_ETD = document.getElementById("Mer_ETD");
let Receiver_ETD = document.getElementById("Receiver_ETD");

let Org_ETDC = document.getElementById("Org_ETDC");
let Mer_ETDC = document.getElementById("Mer_ETDC");
let Receiver_ETDC = document.getElementById("Receiver_ETDC");

let Org_D = document.getElementById("Org_D");
let Mer_D = document.getElementById("Mer_D");
let Receiver_D = document.getElementById("Receiver_D");

let Org_DC = document.getElementById("Org_DC");
let Mer_DC = document.getElementById("Mer_DC");
let Receiver_DC = document.getElementById("Receiver_DC");

$.ajax
    ({
        async: true,
        type: "GET",
        url: urlForAll + "custom/sms/get/" + localStorage.getItem('userID'),
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            data.data.map(item => {

                if (item.state === "ASSIGN") {
                    if (item.forSender) {
                        Mer_JC.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Mer_JCC.checked = item.forSender;
                    }
                    if (item.forReceiver) {
                        Receiver_JC.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Receiver_JCC.checked = item.forReceiver;
                    }
                    if (item.forOrg) {
                        Org_JC.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Org_JCC.checked = item.forOrg;
                    }
                }
                if (item.state === "ENROUTE_TO_PICKUP") {
                    if (item.forSender) {
                        Mer_ETP.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Mer_ETPC.checked = item.forSender;
                    }
                    if (item.forReceiver) {
                        Receiver_ETP.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Receiver_ETPC.checked = item.forReceiver;
                    }
                    if (item.forOrg) {
                        Org_ETP.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Org_ETPC.checked = item.forOrg;
                    }
                }
                if (item.state === "PICKED_UP") {
                    if (item.forSender) {
                        Mer_PU.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Mer_PUC.checked = item.forSender;
                    }
                    if (item.forReceiver) {
                        Receiver_PU.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Receiver_PUC.checked = item.forReceiver;
                    }
                    if (item.forOrg) {
                        Org_PU.value = item.customSmsSuperAdmin;
                        Org_PUC.checked = item.forOrg;
                    }
                }
                if (item.state === "ENROUTE_TO_DELIVERY") {

                    if (item.forSender) {
                        Mer_ETD.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Mer_ETDC.checked = item.forSender;
                    }
                    if (item.forReceiver) {
                        Receiver_ETD.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Receiver_ETDC.checked = item.forReceiver;
                    }
                    if (item.forOrg) {
                        Org_ETD.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Org_ETDC.checked = item.forOrg;
                    }
                }
                if (item.state === "DELIVERED") {
                    if (item.forSender) {
                        Mer_D.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Mer_DC.checked = item.forSender;
                    }
                    if (item.forReceiver) {
                        Receiver_D.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Receiver_DC.checked = item.forReceiver;
                    }
                    if (item.forOrg) {
                        Org_D.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
                        Org_DC.checked = item.forOrg;
                    }
                }
            }
            );
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