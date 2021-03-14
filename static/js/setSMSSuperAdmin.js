$(document).ready(function () {
    $("#settings").hide();
    var orgIDs = [4, 12, 25, 397];
    var orgID = 4;
    $.ajax
        ({
            async: true,
            type: "GET",
            url: urlForAll + "custom/sms/get/" + orgID,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                data.data.map(item => {
                    if (item.state === "ASSIGN") {
                        if (item.forOrg) {
                            stateJC[1] = 1;
                            Org_JC.value = item.customSms ? item.customSms : "";
                            Org_JCC.checked = item.noSMS;
                            if (Org_JC.value) {
                                Org_JCC.disabled = true;
                            }
                            if (Org_JCC.checked) {
                                Org_JC.disabled = true;
                            }
                        }
                        if (item.forSender) {
                            stateJC[2] = 1;
                            Mer_JC.value = item.customSms ? item.customSms : "";
                            Mer_JCC.checked = item.noSMS;
                            if (Mer_JC.value) {
                                Mer_JCC.disabled = true;
                            }
                            if (Mer_JCC.checked) {
                                Mer_JC.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateJC[3] = 1;
                            Receiver_JC.value = item.customSms ? item.customSms : "";
                            Receiver_JCC.checked = item.noSMS;

                            if (Receiver_JC.value) {
                                Receiver_JCC.disabled = true;
                            }
                            if (Receiver_JCC.checked) {
                                Receiver_JC.disabled = true;
                            }
                        }
                    }
                    if (item.state === "ENROUTE_TO_PICKUP") {
                        if (item.forOrg) {
                            stateETP[1] = 1;
                            Org_ETP.value = item.customSms ? item.customSms : "";
                            Org_ETPC.checked = item.noSMS;

                            if (Org_ETP.value) {
                                Org_ETPC.disabled = true;
                            }
                            if (Org_ETPC.checked) {
                                Org_ETP.disabled = true;
                            }
                        }
                        if (item.forSender) {
                            stateETP[2] = 1;
                            Mer_ETP.value = item.customSms ? item.customSms : "";
                            Mer_ETPC.checked = item.noSMS;
                            if (Mer_ETP.value) {
                                Mer_ETPC.disabled = true;
                            }
                            if (Mer_ETPC.checked) {
                                Mer_ETP.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateETP[3] = 1;
                            Receiver_ETP.value = item.customSms ? item.customSms : "";
                            Receiver_ETPC.checked = item.noSMS;
                            if (Receiver_ETP.value) {
                                Receiver_ETPC.disabled = true;
                            }
                            if (Receiver_ETPC.checked) {
                                Receiver_ETP.disabled = true;
                            }
                        }
                    }
                    if (item.state === "PICKED_UP") {
                        if (item.forOrg) {
                            statePU[1] = 1;
                            Org_PU.value = item.customSms;
                            Org_PUC.checked = item.noSMS;
                            if (Org_PU.value) {
                                Org_PUC.disabled = true;
                            }
                            if (Org_PUC.checked) {
                                Org_PU.disabled = true;
                            }
                        }
                        if (item.forSender) {
                            statePU[2] = 1;
                            Mer_PU.value = item.customSms ? item.customSms : "";
                            Mer_PUC.checked = item.noSMS;
                            if (Mer_PU.value) {
                                Mer_PUC.disabled = true;
                            }
                            if (Mer_PUC.checked) {
                                Mer_PU.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            statePU[3] = 1;
                            Receiver_PU.value = item.customSms ? item.customSms : "";
                            Receiver_PUC.checked = item.noSMS;
                            if (Receiver_PU.value) {
                                Receiver_PUC.disabled = true;
                            }
                            if (Receiver_PUC.checked) {
                                Receiver_PU.disabled = true;
                            }
                        }
                    }
                    if (item.state === "ENROUTE_TO_DELIVERY") {
                        if (item.forOrg) {
                            stateETD[1] = 1;
                            Org_ETD.value = item.customSms ? item.customSms : "";
                            Org_ETDC.checked = item.noSMS;
                            if (Org_ETD.value) {
                                Org_ETDC.disabled = true;
                            }
                            if (Org_ETDC.checked) {
                                Org_ETD.disabled = true;
                            }

                        }
                        if (item.forSender) {
                            stateETD[2] = 1;
                            Mer_ETD.value = item.customSms ? item.customSms : "";
                            Mer_ETDC.checked = item.noSMS;
                            if (Mer_ETD.value) {
                                Mer_ETDC.disabled = true;
                            }
                            if (Mer_ETDC.checked) {
                                Mer_ETD.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateETD[3] = 1;
                            Receiver_ETD.value = item.customSms ? item.customSms : "";
                            Receiver_ETDC.checked = item.noSMS;
                            if (Receiver_ETD.value) {
                                Receiver_ETDC.disabled = true;
                            }
                            if (Receiver_ETDC.checked) {
                                Receiver_ETD.disabled = true;
                            }
                        }
                    }
                    if (item.state === "DELIVERED") {
                        if (item.forOrg) {
                            stateD[1] = 1;
                            Org_D.value = item.customSms ? item.customSms : "";
                            Org_DC.checked = item.noSMS;
                            if (Org_D.value) {
                                Org_DC.disabled = true;
                            }
                            if (Org_DC.checked) {
                                Org_D.disabled = true;
                            }

                        }
                        if (item.forSender) {
                            stateD[2] = 1;
                            Mer_D.value = item.customSms ? item.customSms : "";
                            Mer_DC.checked = item.noSMS;
                            if (Mer_D.value) {
                                Mer_DC.disabled = true;
                            }
                            if (Mer_DC.checked) {
                                Mer_D.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateD[3] = 1;
                            Receiver_D.value = item.customSms ? item.customSms : "";
                            Receiver_DC.checked = item.noSMS;
                            if (Receiver_D.value) {
                                Receiver_DC.disabled = true;
                            }
                            if (Receiver_DC.checked) {
                                Receiver_D.disabled = true;
                            }
                        }
                    }
                    if (item.state === "ON_HOLD") {
                        if (item.forOrg) {
                            stateOH[1] = 1;
                            Org_OH.value = item.customSms ? item.customSms : "";
                            Org_OHC.checked = item.noSMS;
                            if (Org_OH.value) {
                                Org_OHC.disabled = true;
                            }
                            if (Org_OHC.checked) {
                                Org_OH.disabled = true;
                            }

                        }
                        if (item.forSender) {
                            stateOH[2] = 1;
                            Mer_OH.value = item.customSms ? item.customSms : "";
                            Mer_OHC.checked = item.noSMS;
                            if (Mer_OH.value) {
                                Mer_OHC.disabled = true;
                            }
                            if (Mer_OHC.checked) {
                                Mer_OH.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateOH[3] = 1;
                            Receiver_OH.value = item.customSms ? item.customSms : "";
                            Receiver_OHC.checked = item.noSMS;
                            if (Receiver_OH.value) {
                                Receiver_OHC.disabled = true;
                            }
                            if (Receiver_OHC.checked) {
                                Receiver_OH.disabled = true;
                            }
                        }
                    }
                    if (item.state === "RETURNED") {
                        if (item.forOrg) {
                            stateR[1] = 1;
                            Org_R.value = item.customSms ? item.customSms : "";
                            Org_RC.checked = item.noSMS;
                            if (Org_R.value) {
                                Org_RC.disabled = true;
                            }
                            if (Org_RC.checked) {
                                Org_R.disabled = true;
                            }
                        }
                        if (item.forSender) {
                            stateR[2] = 1;
                            Mer_R.value = item.customSms ? item.customSms : "";
                            Mer_RC.checked = item.noSMS;
                            if (Mer_R.value) {
                                Mer_RC.disabled = true;
                            }
                            if (Mer_RC.checked) {
                                Mer_R.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateR[3] = 1;
                            Receiver_R.value = item.customSms ? item.customSms : "";
                            Receiver_RC.checked = item.noSMS;
                            if (Receiver_R.value) {
                                Receiver_RC.disabled = true;
                            }
                            if (Receiver_RC.checked) {
                                Receiver_R.disabled = true;
                            }
                        }
                    }
                    if (item.state === "CANCELLED") {
                        if (item.forOrg) {
                            stateC[1] = 1;
                            Org_C.value = item.customSms ? item.customSms : "";
                            Org_CC.checked = item.noSMS;
                            if (Org_C.value) {
                                Org_CC.disabled = true;
                            }
                            if (Org_CC.checked) {
                                Org_C.disabled = true;
                            }
                        }
                        if (item.forSender) {
                            stateC[2] = 1;
                            Mer_C.value = item.customSms ? item.customSms : "";
                            Mer_CC.checked = item.noSMS;

                            if (Mer_C.value) {
                                Mer_CC.disabled = true;
                            }
                            if (Mer_CC.checked) {
                                Mer_C.disabled = true;
                            }
                        }
                        if (item.forReceiver) {
                            stateC[3] = 1;
                            Receiver_C.value = item.customSms ? item.customSms : "";
                            Receiver_CC.checked = item.noSMS;
                            if (Receiver_C.value) {
                                Receiver_CC.disabled = true;
                            }
                            if (Receiver_CC.checked) {
                                Receiver_C.disabled = true;
                            }
                        }
                    }
                }
                );
            },
            error: function (data) {
                var ob = Object.keys(data);
                if (ob[17] == "responseJSON") {
                    errorMessage.textContent = data.responseJSON.errorMessage;
                }
                else {
                    errorMessage.textContent = "Something Went Wrong!";
                }
                $('#myModal200').modal('show');
            }
        })
});

var errorMessage = document.querySelector("#myModal200 p");
var stateJC = [0, 0, 0, 0];
var stateETP = [0, 0, 0, 0];
var statePU = [0, 0, 0, 0];
var stateETD = [0, 0, 0, 0];
var stateD = [0, 0, 0, 0];
var stateOH = [0, 0, 0, 0];
var stateR = [0, 0, 0, 0];
var stateC = [0, 0, 0, 0];

var btnJC = document.getElementById("setSMSBtnJC");
var btnETP = document.getElementById("setSMSBtnETP");
var btnPU = document.getElementById("setSMSBtnPU");
var btnETD = document.getElementById("setSMSBtnETD");
var btnD = document.getElementById("setSMSBtnD");
var btnOH = document.getElementById("setSMSBtnOH");
var btnR = document.getElementById("setSMSBtnR");
var btnC = document.getElementById("setSMSBtnC");

var Org_JC = document.getElementById("Org_JC");
var Mer_JC = document.getElementById("Mer_JC");
var Receiver_JC = document.getElementById("Receiver_JC");

var Org_JCC = document.getElementById("Org_JCC");
var Mer_JCC = document.getElementById("Mer_JCC");
var Receiver_JCC = document.getElementById("Receiver_JCC");

Org_JC.addEventListener("keyup", function (e) {
    Org_JCC.disabled = true;
    if (!Org_JC.value.length) {
        Org_JCC.disabled = false;
    }
});

Mer_JC.addEventListener("keyup", function (e) {
    Mer_JCC.disabled = true;
    if (!Mer_JC.value.length) {
        Mer_JCC.disabled = false;
    }
});

Receiver_JC.addEventListener("keyup", function (e) {
    Receiver_JCC.disabled = true;
    if (!Receiver_JC.value.length) {
        Receiver_JCC.disabled = false;
    }
});

Org_JCC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_JC.disabled = false;
    }
    else {
        Org_JC.disabled = true;
    }
});

Mer_JCC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_JC.disabled = false;
    }
    else {
        Mer_JC.disabled = true;
    }
});

Receiver_JCC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_JC.disabled = false;
    }
    else {
        Receiver_JC.disabled = true;
    }
});


var Org_ETP = document.getElementById("Org_ETP");
var Mer_ETP = document.getElementById("Mer_ETP");
var Receiver_ETP = document.getElementById("Receiver_ETP");

var Org_ETPC = document.getElementById("Org_ETPC");
var Mer_ETPC = document.getElementById("Mer_ETPC");
var Receiver_ETPC = document.getElementById("Receiver_ETPC");


Org_ETP.addEventListener("keyup", function (e) {
    Org_ETPC.disabled = true;
    if (!Org_ETP.value.length) {
        Org_ETPC.disabled = false;
    }
});

Mer_ETP.addEventListener("keyup", function (e) {
    Mer_ETPC.disabled = true;
    if (!Mer_ETP.value.length) {
        Mer_ETPC.disabled = false;
    }
});

Receiver_ETP.addEventListener("keyup", function (e) {
    Receiver_ETPC.disabled = true;
    if (!Receiver_ETP.value.length) {
        Receiver_ETPC.disabled = false;
    }
});

Org_ETPC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_ETP.disabled = false;
    }
    else {
        Org_ETP.disabled = true;
    }
});

Mer_ETPC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_ETP.disabled = false;
    }
    else {
        Mer_ETP.disabled = true;
    }
});

Receiver_ETPC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_ETP.disabled = false;
    }
    else {
        Receiver_ETP.disabled = true;
    }
});


var Org_PU = document.getElementById("Org_PU");
var Mer_PU = document.getElementById("Mer_PU");
var Receiver_PU = document.getElementById("Receiver_PU");

var Org_PUC = document.getElementById("Org_PUC");
var Mer_PUC = document.getElementById("Mer_PUC");
var Receiver_PUC = document.getElementById("Receiver_PUC");


Org_PU.addEventListener("keyup", function (e) {
    Org_PUC.disabled = true;
    if (!Org_PU.value.length) {
        Org_PUC.disabled = false;
    }
});

Mer_PU.addEventListener("keyup", function (e) {
    Mer_PUC.disabled = true;
    if (!Mer_PU.value.length) {
        Mer_PUC.disabled = false;
    }
});

Receiver_PU.addEventListener("keyup", function (e) {
    Receiver_PUC.disabled = true;
    if (!Receiver_PU.value.length) {
        Receiver_PUC.disabled = false;
    }
});


Org_PUC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_PU.disabled = false;
    }
    else {
        Org_PU.disabled = true;
    }
});

Mer_PUC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_PU.disabled = false;
    }
    else {
        Mer_PU.disabled = true;
    }
});

Receiver_PUC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_PU.disabled = false;
    }
    else {
        Receiver_PU.disabled = true;
    }
});

var Org_ETD = document.getElementById("Org_ETD");
var Mer_ETD = document.getElementById("Mer_ETD");
var Receiver_ETD = document.getElementById("Receiver_ETD");

var Org_ETDC = document.getElementById("Org_ETDC");
var Mer_ETDC = document.getElementById("Mer_ETDC");
var Receiver_ETDC = document.getElementById("Receiver_ETDC");


Org_ETD.addEventListener("keyup", function (e) {
    Org_ETDC.disabled = true;
    if (!Org_ETD.value.length) {
        Org_ETDC.disabled = false;
    }
});

Mer_ETD.addEventListener("keyup", function (e) {
    Mer_ETDC.disabled = true;
    if (!Mer_ETD.value.length) {
        Mer_ETDC.disabled = false;
    }
});

Receiver_ETD.addEventListener("keyup", function (e) {
    Receiver_ETDC.disabled = true;
    if (!Receiver_ETD.value.length) {
        Receiver_ETDC.disabled = false;
    }
});


Org_ETDC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_ETD.disabled = false;
    }
    else {
        Org_ETD.disabled = true;
    }
});

Mer_ETDC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_ETD.disabled = false;
    }
    else {
        Mer_ETD.disabled = true;
    }
});

Receiver_ETDC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_ETD.disabled = false;
    }
    else {
        Receiver_ETD.disabled = true;
    }
});

var Org_D = document.getElementById("Org_D");
var Mer_D = document.getElementById("Mer_D");
var Receiver_D = document.getElementById("Receiver_D");

var Org_DC = document.getElementById("Org_DC");
var Mer_DC = document.getElementById("Mer_DC");
var Receiver_DC = document.getElementById("Receiver_DC");


Org_D.addEventListener("keyup", function (e) {
    Org_DC.disabled = true;
    if (!Org_D.value.length) {
        Org_DC.disabled = false;
    }
});

Mer_D.addEventListener("keyup", function (e) {
    Mer_DC.disabled = true;
    if (!Mer_D.value.length) {
        Mer_DC.disabled = false;
    }
});

Receiver_D.addEventListener("keyup", function (e) {
    Receiver_DC.disabled = true;
    if (!Receiver_D.value.length) {
        Receiver_DC.disabled = false;
    }
});


Org_DC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_D.disabled = false;
    }
    else {
        Org_D.disabled = true;
    }
});

Mer_DC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_D.disabled = false;
    }
    else {
        Mer_D.disabled = true;
    }
});

Receiver_DC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_D.disabled = false;
    }
    else {
        Receiver_D.disabled = true;
    }
});

var Org_OH = document.getElementById("Org_OH");
var Mer_OH = document.getElementById("Mer_OH");
var Receiver_OH = document.getElementById("Receiver_OH");

var Org_OHC = document.getElementById("Org_OHC");
var Mer_OHC = document.getElementById("Mer_OHC");
var Receiver_OHC = document.getElementById("Receiver_OHC");

Org_OH.addEventListener("keyup", function (e) {
    Org_OHC.disabled = true;
    if (!Org_OH.value.length) {
        Org_OHC.disabled = false;
    }
});

Mer_OH.addEventListener("keyup", function (e) {
    Mer_OHC.disabled = true;
    if (!Mer_OH.value.length) {
        Mer_OHC.disabled = false;
    }
});

Receiver_OH.addEventListener("keyup", function (e) {
    Receiver_OHC.disabled = true;
    if (!Receiver_OH.value.length) {
        Receiver_OHC.disabled = false;
    }
});


Org_OHC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_OH.disabled = false;
    }
    else {
        Org_OH.disabled = true;
    }
});

Mer_OHC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_OH.disabled = false;
    }
    else {
        Mer_OH.disabled = true;
    }
});

Receiver_OHC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_OH.disabled = false;
    }
    else {
        Receiver_OH.disabled = true;
    }
});

var Org_R = document.getElementById("Org_R");
var Mer_R = document.getElementById("Mer_R");
var Receiver_R = document.getElementById("Receiver_R");

var Org_RC = document.getElementById("Org_RC");
var Mer_RC = document.getElementById("Mer_RC");
var Receiver_RC = document.getElementById("Receiver_RC");

Org_R.addEventListener("keyup", function (e) {
    Org_RC.disabled = true;
    if (!Org_R.value.length) {
        Org_RC.disabled = false;
    }
});

Mer_R.addEventListener("keyup", function (e) {
    Mer_RC.disabled = true;
    if (!Mer_R.value.length) {
        Mer_RC.disabled = false;
    }
});

Receiver_R.addEventListener("keyup", function (e) {
    Receiver_RC.disabled = true;
    if (!Receiver_R.value.length) {
        Receiver_RC.disabled = false;
    }
});

Org_RC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_R.disabled = false;
    }
    else {
        Org_R.disabled = true;
    }
});

Mer_RC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_R.disabled = false;
    }
    else {
        Mer_R.disabled = true;
    }
});

Receiver_RC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_R.disabled = false;
    }
    else {
        Receiver_R.disabled = true;
    }
});

var Org_C = document.getElementById("Org_C");
var Mer_C = document.getElementById("Mer_C");
var Receiver_C = document.getElementById("Receiver_C");

var Org_CC = document.getElementById("Org_CC");
var Mer_CC = document.getElementById("Mer_CC");
var Receiver_CC = document.getElementById("Receiver_CC");


Org_C.addEventListener("keyup", function (e) {
    Org_CC.disabled = true;
    if (!Org_C.value.length) {
        Org_CC.disabled = false;
    }
});

Mer_C.addEventListener("keyup", function (e) {
    Mer_CC.disabled = true;
    if (!Mer_C.value.length) {
        Mer_CC.disabled = false;
    }
});

Receiver_C.addEventListener("keyup", function (e) {
    Receiver_CC.disabled = true;
    if (!Receiver_C.value.length) {
        Receiver_CC.disabled = false;
    }
});


Org_CC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Org_C.disabled = false;
    }
    else {
        Org_C.disabled = true;
    }
});

Mer_CC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Mer_C.disabled = false;
    }
    else {
        Mer_C.disabled = true;
    }
});

Receiver_CC.addEventListener("click", function (e) {
    if (this.checked === false) {
        Receiver_C.disabled = false;
    }
    else {
        Receiver_C.disabled = true;
    }
});

function showInitialModal(event, button) {
    event.preventDefault();
    button.disabled = true;
    $('#tickDDD2').hide();
    $(".circle-loader").removeClass("load-complete");
    $("#sureDDD2").html("");
    $("#myModalCreateDDD1").modal('show');
    $("#sureDDD2").html("Please wait!");
}

function showTickSuccessModal(data, button) {
    button.disabled = false;
    if (data.status == 'OK') {
        setTimeout(function () {
            $(".circle-loader").addClass("load-complete");

            $('#tickDDD2').show();

            $("#sureDDD2").html("Please Wait For Approval!<br><br>You Will Be Notified Through An Email!");
        }, 1500);
        setTimeout(function () {

            $("#myModalCreateDDD1").modal('hide');
        }, 2500);
    }
}

function errorShow(data, button) {
    button.disabled = false;
    var ob = Object.keys(data);
    if (ob[17] == "responseJSON") {
        errorMessage.textContent = data.responseJSON.errorMessage;
    }
    else {
        errorMessage.textContent = "Something Went Wrong!";
    }
    $("#myModalCreateDDD1").modal('hide');
    $('#myModal200').modal('show');
}

btnJC.addEventListener("click", function (event) {
    showInitialModal(event, btnJC);
    $.ajax
        ({
            type: stateJC[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateJC[1] ? "update" : "create"}/${orgID}?smsState=ASSIGN&smsContent=${Org_JC.value ? Org_JC.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateJC[1] = 1;
                two(btnJC);
            },
            error: function (data) {
                errorShow(data, btnJC);
            }
        })
});

function two(button) {
    $.ajax
        ({
            type: stateJC[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateJC[2] ? "update" : "create"}/${orgID}?smsState=ASSIGN&smsContent=${Mer_JC.value ? Mer_JC.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateJC[2] = 1;
                three(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}
function three(button) {
    $.ajax
        ({
            type: stateJC[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateJC[3] ? "update" : "create"}/${orgID}?smsState=ASSIGN&smsContent=${Receiver_JC.value ? Receiver_JC.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateJC[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}


btnETP.addEventListener("click", function (event) {
    showInitialModal(event, btnETP);
    $.ajax
        ({
            type: stateETP[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[1] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_PICKUP&smsContent=${Org_ETP.value ? Org_ETP.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETP[1] = 1;
                four(btnETP);
            },
            error: function (data) {
                errorShow(data, btnETP);
            }
        })
});

function four(button) {
    $.ajax
        ({
            type: stateETP[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[2] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_PICKUP&smsContent=${Mer_ETP.value ? Mer_ETP.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETP[2] = 1;
                five(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}
function five(button) {
    $.ajax
        ({
            type: stateETP[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[3] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_PICKUP&smsContent=${Receiver_ETP.value ? Receiver_ETP.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETP[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}


btnPU.addEventListener("click", function (event) {
    showInitialModal(event, btnPU);
    $.ajax
        ({
            type: statePU[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${statePU[1] ? "update" : "create"}/${orgID}?smsState=PICKED_UP&smsContent=${Org_PU.value ? Org_PU.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                statePU[1] = 1;
                six(btnPU);
            },
            error: function (data) {
                errorShow(data, btnPU);
            }
        })
});

function six(button) {
    $.ajax
        ({
            type: statePU[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${statePU[2] ? "update" : "create"}/${orgID}?smsState=PICKED_UP&smsContent=${Mer_PU.value ? Mer_PU.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                statePU[2] = 1;
                seven(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}
function seven(button) {
    $.ajax
        ({
            type: statePU[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${statePU[3] ? "update" : "create"}/${orgID}?smsState=PICKED_UP&smsContent=${Receiver_PU.value ? Receiver_PU.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                statePU[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}


btnETD.addEventListener("click", function (event) {
    showInitialModal(event, btnETD);
    $.ajax
        ({
            type: stateETD[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETD[1] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Org_ETD.value ? Org_ETD.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETD[1] = 1;
                eight(btnETD);
            },
            error: function (data) {
                errorShow(data, btnETD);
            }
        })
});

function eight(button) {
    $.ajax
        ({
            type: stateETD[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETD[2] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Mer_ETD.value ? Mer_ETD.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETD[2] = 1;
                nine(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}
function nine(button) {
    $.ajax
        ({
            type: stateETD[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETD[3] ? "update" : "create"}/${orgID}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Receiver_ETD.value ? Receiver_ETD.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateETD[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}


btnD.addEventListener("click", function (event) {
    showInitialModal(event, btnD);
    $.ajax
        ({
            type: stateD[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateD[1] ? "update" : "create"}/${orgID}?smsState=DELIVERED&smsContent=${Org_D.value ? Org_D.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateD[1] = 1;
                ten(btnD);
            },
            error: function (data) {
                errorShow(data, btnD);
            }
        })
});

function ten(button) {
    $.ajax
        ({
            type: stateD[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateD[2] ? "update" : "create"}/${orgID}?smsState=DELIVERED&smsContent=${Mer_D.value ? Mer_D.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateD[2] = 1;
                eleven(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}
function eleven(button) {
    $.ajax
        ({
            type: stateD[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateD[3] ? "update" : "create"}/${orgID}?smsState=DELIVERED&smsContent=${Receiver_D.value ? Receiver_D.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateD[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

btnOH.addEventListener("click", function (event) {
    showInitialModal(event, btnOH);
    $.ajax
        ({
            type: stateOH[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateOH[1] ? "update" : "create"}/${orgID}?smsState=ON_HOLD&smsContent=${Org_OH.value ? Org_OH.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_OHC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateOH[1] = 1;
                twelve(btnOH);
            },
            error: function (data) {
                errorShow(data, btnOH);
            }
        })
});

function twelve(button) {
    $.ajax
        ({
            type: stateOH[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateOH[2] ? "update" : "create"}/${orgID}?smsState=ON_HOLD&smsContent=${Mer_OH.value ? Mer_OH.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_OHC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateOH[2] = 1;
                thirteen(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

function thirteen(button) {
    $.ajax
        ({
            type: stateOH[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateOH[3] ? "update" : "create"}/${orgID}?smsState=ON_HOLD&smsContent=${Receiver_OH.value ? Receiver_OH.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_OHC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateOH[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

btnR.addEventListener("click", function (event) {
    showInitialModal(event, btnR);
    $.ajax
        ({
            type: stateR[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateR[1] ? "update" : "create"}/${orgID}?smsState=RETURNED&smsContent=${Org_R.value ? Org_R.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_RC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateR[1] = 1;
                fourteen(btnR);
            },
            error: function (data) {
                errorShow(data, btnR);
            }
        })
});

function fourteen(button) {
    $.ajax
        ({
            type: stateR[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateR[2] ? "update" : "create"}/${orgID}?smsState=RETURNED&smsContent=${Mer_R.value ? Mer_R.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_RC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateR[2] = 1;
                fifteen(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

function fifteen(button) {
    $.ajax
        ({
            type: stateR[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateR[3] ? "update" : "create"}/${orgID}?smsState=RETURNED&smsContent=${Receiver_R.value ? Receiver_R.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_RC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateR[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

btnC.addEventListener("click", function (event) {
    showInitialModal(event, btnC);
    $.ajax
        ({
            type: stateC[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateC[1] ? "update" : "create"}/${orgID}?smsState=CANCELLED&smsContent=${Org_C.value ? Org_C.value : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_CC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateC[1] = 1;
                sixteen(btnC);
            },
            error: function (data) {
                errorShow(data, btnC);
            }
        })
});

function sixteen(button) {
    $.ajax
        ({
            type: stateC[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateC[2] ? "update" : "create"}/${orgID}?smsState=CANCELLED&smsContent=${Mer_C.value ? Mer_C.value : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_CC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateC[2] = 1;
                seventeen(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

function seventeen(button) {
    $.ajax
        ({
            type: stateC[3] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateC[3] ? "update" : "create"}/${orgID}?smsState=CANCELLED&smsContent=${Receiver_C.value ? Receiver_C.value : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_CC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                stateC[3] = 1;
                showTickSuccessModal(data, button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}