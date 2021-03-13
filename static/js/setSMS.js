$(document).ready(function () {
    $("#settings").hide();
});

var Org_JC = document.getElementById("Org_JC");
var Mer_JC = document.getElementById("Mer_JC");
var Receiver_JC = document.getElementById("Receiver_JC");

var Org_JCC = document.getElementById("Org_JCC");
var Mer_JCC = document.getElementById("Mer_JCC");
var Receiver_JCC = document.getElementById("Receiver_JCC");

var Org_ETP = document.getElementById("Org_ETP");
var Mer_ETP = document.getElementById("Mer_ETP");
var Receiver_ETP = document.getElementById("Receiver_ETP");

var Org_ETPC = document.getElementById("Org_ETPC");
var Mer_ETPC = document.getElementById("Mer_ETPC");
var Receiver_ETPC = document.getElementById("Receiver_ETPC");

var Org_PU = document.getElementById("Org_PU");
var Mer_PU = document.getElementById("Mer_PU");
var Receiver_PU = document.getElementById("Receiver_PU");

var Org_PUC = document.getElementById("Org_PUC");
var Mer_PUC = document.getElementById("Mer_PUC");
var Receiver_PUC = document.getElementById("Receiver_PUC");

var Org_ETD = document.getElementById("Org_ETD");
var Mer_ETD = document.getElementById("Mer_ETD");
var Receiver_ETD = document.getElementById("Receiver_ETD");

var Org_ETDC = document.getElementById("Org_ETDC");
var Mer_ETDC = document.getElementById("Mer_ETDC");
var Receiver_ETDC = document.getElementById("Receiver_ETDC");

var Org_D = document.getElementById("Org_D");
var Mer_D = document.getElementById("Mer_D");
var Receiver_D = document.getElementById("Receiver_D");

var Org_DC = document.getElementById("Org_DC");
var Mer_DC = document.getElementById("Mer_DC");
var Receiver_DC = document.getElementById("Receiver_DC");

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
                        Mer_JC.value = item.customSms ? item.customSms : "";
                        Mer_JCC.checked = item.noSMS;
                    }
                    if (item.forReceiver) {
                        Receiver_JC.value = item.customSms ? item.customSms : "";
                        Receiver_JCC.checked = item.noSMS;
                    }
                    if (item.forOrg) {
                        Org_JC.value = item.customSms ? item.customSms : "";
                        Org_JCC.checked = item.noSMS;
                    }
                }
                if (item.state === "ENROUTE_TO_PICKUP") {
                    if (item.forSender) {
                        Mer_ETP.value = item.customSms ? item.customSms : "";
                        Mer_ETPC.checked = item.noSMS;
                    }
                    if (item.forReceiver) {
                        Receiver_ETP.value = item.customSms ? item.customSms : "";
                        Receiver_ETPC.checked = item.noSMS;
                    }
                    if (item.forOrg) {
                        Org_ETP.value = item.customSms ? item.customSms : "";
                        Org_ETPC.checked = item.noSMS;
                    }
                }
                if (item.state === "PICKED_UP") {
                    if (item.forSender) {
                        Mer_PU.value = item.customSms ? item.customSms : "";
                        Mer_PUC.checked = item.noSMS;
                    }
                    if (item.forReceiver) {
                        Receiver_PU.value = item.customSms ? item.customSms : "";
                        Receiver_PUC.checked = item.noSMS;
                    }
                    if (item.forOrg) {
                        Org_PU.value = item.customSms;
                        Org_PUC.checked = item.noSMS;
                    }
                }
                if (item.state === "ENROUTE_TO_DELIVERY") {

                    if (item.forSender) {
                        Mer_ETD.value = item.customSms ? item.customSms : "";
                        Mer_ETDC.checked = item.noSMS;
                    }
                    if (item.forReceiver) {
                        Receiver_ETD.value = item.customSms ? item.customSms : "";
                        Receiver_ETDC.checked = item.noSMS;
                    }
                    if (item.forOrg) {
                        Org_ETD.value = item.customSms ? item.customSms : "";
                        Org_ETDC.checked = item.noSMS;
                    }
                }
                if (item.state === "DELIVERED") {
                    if (item.forSender) {
                        Mer_D.value = item.customSms ? item.customSms : "";
                        Mer_DC.checked = item.noSMS;
                    }
                    if (item.forReceiver) {
                        Receiver_D.value = item.customSms ? item.customSms : "";
                        Receiver_DC.checked = item.noSMS;
                    }
                    if (item.forOrg) {
                        Org_D.value = item.customSms ? item.customSms : "";
                        Org_DC.checked = item.noSMS;
                    }
                }
            }
            );
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            $('#myModal2').modal('show');
        }
    })


document.getElementById("setSMSBtnJC").addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ASSIGN&smsContent=${Org_JC.value ? Org_JC.value : null}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_JCC.checked}`);
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ASSIGN&smsContent=${Org_JC.value ? Org_JC.value : null}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                two();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
});

function two() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ASSIGN&smsContent=${Mer_JC.value ? Mer_JC.value : ""}&forSernder=true&forReceiver=false&forOrg=false&noSms=${Mer_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                three();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}
function three() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ASSIGN&smsContent=${Receiver_JC.value ? Receiver_JC.value : ""}&forSernder=false&forReceiver=true&forOrg=false&noSms=${Receiver_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDDD2').hide();
                $(".circle-loader").removeClass("load-compvare");
                $("#sureDDD2").html("");
                $("#myModalCreateDDD1").modal('show');
                $("#sureDDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-compvare");

                        $('#tickDDD2').show();

                        $("#sureDDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}


document.getElementById("setSMSBtnETP").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_PICKUP&smsContent=${Org_ETP.value ? "" : ""}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                four();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
});

function four() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_PICKUP&smsContent=${Mer_ETP.value ? "" : ""}&forSernder=true&forReceiver=false&forOrg=false&noSms=${Mer_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                five();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}
function five() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_PICKUP&smsContent=${Receiver_ETP.value ? "" : ""}&forSernder=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDDD2').hide();
                $(".circle-loader").removeClass("load-compvare");
                $("#sureDDD2").html("");
                $("#myModalCreateDDD1").modal('show');
                $("#sureDDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-compvare");

                        $('#tickDDD2').show();

                        $("#sureDDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}


document.getElementById("setSMSBtnPU").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=PICKED_UP&smsContent=${Org_PU.value ? "" : ""}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                six();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
});

function six() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=PICKED_UP&smsContent=${Mer_PU.value ? "" : ""}&forSernder=true&forReceiver=false&forOrg=false&noSms=${Mer_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                seven();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}
function seven() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=PICKED_UP&smsContent=${Receiver_PU.value ? "" : ""}&forSernder=false&forReceiver=true&forOrg=false&noSms=${Receiver_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDDD2').hide();
                $(".circle-loader").removeClass("load-compvare");
                $("#sureDDD2").html("");
                $("#myModalCreateDDD1").modal('show');
                $("#sureDDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-compvare");

                        $('#tickDDD2').show();

                        $("#sureDDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}


document.getElementById("setSMSBtnETD").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_DELIVERY&smsContent=${Org_ETD.value ? "" : ""}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                eight();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
});

function eight() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_DELIVERY&smsContent=${Mer_ETD.value ? "" : ""}&forSernder=true&forReceiver=false&forOrg=false&noSms=${Mer_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                nine();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}
function nine() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=ENROUTE_TO_DELIVERY&smsContent=${Receiver_ETD.value ? "" : ""}&forSernder=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDDD2').hide();
                $(".circle-loader").removeClass("load-compvare");
                $("#sureDDD2").html("");
                $("#myModalCreateDDD1").modal('show');
                $("#sureDDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-compvare");

                        $('#tickDDD2').show();

                        $("#sureDDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}


document.getElementById("setSMSBtnD").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=DELIVERED&smsContent=${Org_D.value ? "" : ""}&forSernder=false&forReceiver=false&forOrg=true&noSms=${Org_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                ten();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
});

function ten() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=DELIVERED&smsContent=${Mer_D.value ? "" : ""}&forSernder=true&forReceiver=false&forOrg=false&noSms=${Mer_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                eleven();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}
function eleven() {
    $.ajax
        ({
            type: "POST",
            url: `${urlForAll}custom/sms/create/${localStorage.getItem('userID')}?smsStates=DELIVERED&smsContent=${Receiver_D.value ? "" : ""}&forSernder=false&forReceiver=true&forOrg=false&noSms=${Receiver_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#tickDDD2').hide();
                $(".circle-loader").removeClass("load-compvare");
                $("#sureDDD2").html("");
                $("#myModalCreateDDD1").modal('show');
                $("#sureDDD2").html("Please wait!");
                if (data.status == 'OK') {
                    setTimeout(function () {
                        $(".circle-loader").addClass("load-compvare");

                        $('#tickDDD2').show();

                        $("#sureDDD2").html("Organization Settings Updated!");
                    }, 3000);
                    setTimeout(function () {

                        $("#myModalCreateDDD1").modal('hide');
                    }, 4000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#myModal2').modal('show');
            }
        })
}