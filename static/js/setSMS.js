$(document).ready(function () {
    $("#settings").hide();
});

var errorMessage = document.querySelector("#myModal200 p");
var stateJC = [];
var stateETP = [];
var statePU = [];
var stateETD = [];
var stateD = [];
var stateOH = [];
var stateR = [];
var stateC = [];

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
                console.log(item);
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


document.getElementById("setSMSBtnJC").addEventListener("click", function (event) {
    event.preventDefault();
    console.log(stateJC[0] && stateJC[0] ? "PUT" : "POST");
    console.log(stateJC[0] && stateJC[0] ? "update" : "create");

    console.log(stateJC[1] && stateJC[1] ? "PUT" : "POST");
    console.log(stateJC[1] && stateJC[1] ? "update" : "create");

    console.log(stateJC[2] && stateJC[2] ? "PUT" : "POST");
    console.log(stateJC[2] && stateJC[2] ? "update" : "create");
    // $.ajax
    //     ({
    //         type: stateJC[0] ? "PUT" : "POST",
    //         url: `${urlForAll}custom/sms/${stateJC[0] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ASSIGN&smsContent=${Org_JC.value ? Org_JC.value : null}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_JCC.checked}`,
    //         headers:
    //         {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             "Authorization": 'Bearer ' + localStorage.getItem('token')
    //         },
    //         success: function (data) {
    //             two();
    //         },
    //         error: function (data) {
    //             var ob = Object.keys(data);
    //             if (ob[17] == "responseJSON") {
    //                 errorMessage.textContent = data.responseJSON.errorMessage;
    //             }
    //             else {
    //                 errorMessage.textContent = "Something Went Wrong!";
    //             }
    //             $('#myModal200').modal('show');
    //         }
    //     })
});

function two() {
    $.ajax
        ({
            type: stateJC[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateJC[1] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ASSIGN&smsContent=${Mer_JC.value ? Mer_JC.value : null}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_JCC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                three();
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
}
function three() {
    $.ajax
        ({
            type: stateJC[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateJC[2] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ASSIGN&smsContent=${Receiver_JC.value ? Receiver_JC.value : null}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_JCC.checked}`,
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
}


document.getElementById("setSMSBtnETP").addEventListener("click", function (event) {
    event.preventDefault();
    $.ajax
        ({
            type: stateETP[0] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[0] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_PICKUP&smsContent=${Org_ETP.value ? Org_ETP.value : null}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                four();
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

function four() {
    $.ajax
        ({
            type: stateETP[1] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[1] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_PICKUP&smsContent=${Mer_ETP.value ? Mer_ETP.value : null}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_ETPC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                five();
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
}
function five() {
    $.ajax
        ({
            type: stateETP[2] ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${stateETP[2] ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_PICKUP&smsContent=${Receiver_ETP.value ? Receiver_ETP.value : null}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETPC.checked}`,
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
}


document.getElementById("setSMSBtnPU").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: Org_PU && Org_PUC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Org_PU && Org_PUC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=PICKED_UP&smsContent=${Org_PU.value ? Org_PU.value : null}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                six();
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

function six() {
    $.ajax
        ({
            type: Mer_PU && Mer_PUC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Mer_PU && Mer_PUC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=PICKED_UP&smsContent=${Mer_PU.value ? Mer_PU.value : null}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_PUC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                seven();
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
}
function seven() {
    $.ajax
        ({
            type: Receiver_PU && Receiver_PUC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Receiver_PU && Receiver_PUC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=PICKED_UP&smsContent=${Receiver_PU.value ? Receiver_PU.value : null}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_PUC.checked}`,
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
}


document.getElementById("setSMSBtnETD").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: Org_ETD && Org_ETDC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Org_ETD && Org_ETDC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Org_ETD.value ? Org_ETD.value : null}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                eight();
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

function eight() {
    $.ajax
        ({
            type: Mer_ETD && Mer_ETDC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Mer_ETD && Mer_ETDC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Mer_ETD.value ? Mer_ETD.value : null}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_ETDC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                nine();
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
}
function nine() {
    $.ajax
        ({
            type: Receiver_ETD && Receiver_ETDC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Receiver_ETD && Receiver_ETDC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=ENROUTE_TO_DELIVERY&smsContent=${Receiver_ETD.value ? Receiver_ETD.value : null}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_ETDC.checked}`,
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
}


document.getElementById("setSMSBtnD").addEventListener("click", function (event) {
    event.preventDefault();

    $.ajax
        ({
            type: Org_D && Org_DC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Org_D && Org_DC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=DELIVERED&smsContent=${Org_D.value ? Org_D.value : null}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                ten();
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

function ten() {
    $.ajax
        ({
            type: Mer_D && Mer_DC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Mer_D && Mer_DC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=DELIVERED&smsContent=${Mer_D.value ? Mer_D.value : null}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_DC.checked}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                eleven();
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
}
function eleven() {
    $.ajax
        ({
            type: Receiver_DC && Receiver_DCC ? "PUT" : "POST",
            url: `${urlForAll}custom/sms/${Receiver_DC && Receiver_DCC ? "update" : "create"}/${localStorage.getItem('userID')}?smsState=DELIVERED&smsContent=${Receiver_D.value ? Receiver_D.value : null}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_DC.checked}`,
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
}