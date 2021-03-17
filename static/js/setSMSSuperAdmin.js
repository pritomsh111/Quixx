$(document).ready(function () {
    $("#settings").hide();
    var orgID;
    btnC.disabled = btnD.disabled = btnETD.disabled = btnETP.disabled = btnJC.disabled = btnOH.disabled = btnPU.disabled = btnR.disabled = true;
    $.ajax
        ({
            url: urlForAll + "approved/all/organization/id",
            type: "GET",
            async: true,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                $('#approvedOrg')
                    .empty()
                    .append('<option selected="selected" value="">Choose ORG</option>')
                    ;
                for (var i = 0; i < data.data.length; i++) {
                    var option = new Option(data.data[i], data.data[i]);
                    $(option).html(data.data[i]);
                    $("#approvedOrg").append(option);
                }
            }
        });
});

var approveMessage = document.querySelectorAll(".flex-all>div:first-child");
var approveMessageIterator = 0;

var approvedORG = document.getElementById("approvedOrg");
approvedORG.addEventListener("change", function (e) {
    selectOrg(approvedORG);
});
function forAllFieldsFill(checkbox, textbox, item, msg = "") {
    textbox.value = item.customSms ? item.customSms : "";
    if (msg) {
        textbox.value = item.customSmsSuperAdmin ? item.customSmsSuperAdmin : "";
    }
    checkbox.checked = item.noSMS;
    if (textbox.value) {
        checkbox.disabled = true;
    }
    if (checkbox.checked) {
        textbox.disabled = true;
    }
}

function approveText(item) {
    var h4First = document.createElement("h4");
    h4First.innerText = item.approved ? "Approved" : "Unapproved";
    var h4Second = document.createElement("h4");
    h4Second.innerText = item.approvedBy ? `Approved By: ${item.approvedBy}` : "";
    approveMessage[approveMessageIterator++].append(h4First, h4Second);
    console.log(item, approveMessageIterator);
}
function selectOrg(org) {
    approveMessageIterator = 0;
    document.getElementById("formDD").reset();
    document.querySelectorAll("#formDD textarea").forEach(item => item.disabled = false);
    document.querySelectorAll("#formDD input[type=checkbox]").forEach(item => item.disabled = false);
    approveMessage.forEach(item => item.innerHTML = "");
    if (!org.value) {
        return;
    }

    btnC.disabled = btnD.disabled = btnETD.disabled = btnETP.disabled = btnJC.disabled = btnOH.disabled = btnPU.disabled = btnR.disabled = false;
    orgID = org.value;

    $.ajax
        ({
            async: true,
            type: "GET",
            url: urlForAll + "custom/sms/get/" + org.value,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                if (data.data) {
                    data.data.map(item => {
                        if (item.state === "ASSIGN") {
                            if (item.forOrg) {
                                stateJC[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_JCC, Org_JC, item);
                                forAllFieldsFill(Org_JCCSP, Org_JCSP, item, "super");
                            }
                            if (item.forSender) {
                                stateJC[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_JCC, Mer_JC, item);
                                forAllFieldsFill(Mer_JCCSP, Mer_JCSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateJC[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_JCC, Receiver_JC, item);
                                forAllFieldsFill(Receiver_JCCSP, Receiver_JCSP, item, "super");
                            }
                        }
                        if (item.state === "ENROUTE_TO_PICKUP") {
                            if (item.forOrg) {
                                stateETP[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_ETPC, Org_ETP, item);
                                forAllFieldsFill(Org_ETPCSP, Org_ETPSP, item, "super");
                            }
                            if (item.forSender) {
                                stateETP[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_ETPC, Mer_ETP, item);
                                forAllFieldsFill(Mer_ETPCSP, Mer_ETPSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateETP[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_ETPC, Receiver_ETP, item);
                                forAllFieldsFill(Receiver_ETPCSP, Receiver_ETPSP, item, "super");
                            }
                        }
                        if (item.state === "PICKED_UP") {
                            if (item.forOrg) {
                                statePU[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_PUC, Org_PU, item);
                                forAllFieldsFill(Org_PUCSP, Org_PUSP, item, "super");
                            }
                            if (item.forSender) {
                                statePU[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_PUC, Mer_PU, item);
                                forAllFieldsFill(Mer_PUCSP, Mer_PUSP, item, "super");
                            }
                            if (item.forReceiver) {
                                statePU[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_PUC, Receiver_PU, item);
                                forAllFieldsFill(Receiver_PUCSP, Receiver_PUSP, item, "super");
                            }
                        }
                        if (item.state === "ENROUTE_TO_DELIVERY") {
                            if (item.forOrg) {
                                stateETD[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_ETDC, Org_ETD, item);
                                forAllFieldsFill(Org_ETDCSP, Org_ETDSP, item, "super");
                            }
                            if (item.forSender) {
                                stateETD[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_ETDC, Mer_ETD, item);
                                forAllFieldsFill(Mer_ETDCSP, Mer_ETDSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateETD[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_ETDC, Receiver_ETD, item);
                                forAllFieldsFill(Receiver_ETDCSP, Receiver_ETDSP, item, "super");
                            }
                        }
                        if (item.state === "DELIVERED") {
                            if (item.forOrg) {
                                stateD[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_DC, Org_D, item);
                                forAllFieldsFill(Org_DCSP, Org_DSP, item, "super");
                            }
                            if (item.forSender) {
                                stateD[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_DC, Mer_D, item);
                                forAllFieldsFill(Mer_DCSP, Mer_DSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateD[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_DC, Receiver_D, item);
                                forAllFieldsFill(Receiver_DCSP, Receiver_DSP, item, "super");
                            }
                        }
                        if (item.state === "ON_HOLD") {
                            if (item.forOrg) {
                                stateOH[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_OHC, Org_OH, item);
                                forAllFieldsFill(Org_OHCSP, Org_OHSP, item, "super");

                            }
                            if (item.forSender) {
                                stateOH[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_OHC, Mer_OH, item);
                                forAllFieldsFill(Mer_OHCSP, Mer_OHSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateOH[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_OHC, Receiver_OH, item);
                                forAllFieldsFill(Receiver_OHCSP, Receiver_OHSP, item, "super");
                            }
                        }
                        if (item.state === "RETURNED") {
                            if (item.forOrg) {
                                stateR[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_RC, Org_R, item);
                                forAllFieldsFill(Org_RCSP, Org_RSP, item, "super");
                            }
                            if (item.forSender) {
                                stateR[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_RC, Mer_R, item);
                                forAllFieldsFill(Mer_RCSP, Mer_RSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateR[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_RC, Receiver_R, item);
                                forAllFieldsFill(Receiver_RCSP, Receiver_RSP, item, "super");
                            }
                        }
                        if (item.state === "CANCELLED") {
                            if (item.forOrg) {
                                stateC[1] = 1;
                                approveText(item);
                                forAllFieldsFill(Org_CC, Org_C, item);
                                forAllFieldsFill(Org_CCSP, Org_CSP, item, "super");
                            }
                            if (item.forSender) {
                                stateC[2] = 1;
                                approveText(item);
                                forAllFieldsFill(Mer_CC, Mer_C, item);
                                forAllFieldsFill(Mer_CCSP, Mer_CSP, item, "super");
                            }
                            if (item.forReceiver) {
                                stateC[3] = 1;
                                approveText(item);
                                forAllFieldsFill(Receiver_CC, Receiver_C, item);
                                forAllFieldsFill(Receiver_CCSP, Receiver_CSP, item, "super");
                            }
                        }
                    }
                    );
                }
            },
            error: function (data) {
                var ob = Object.keys(data);
                if (ob[17] == "responseJSON") {
                    errorMessage.innerHTML = `<h3>${data.responseJSON.errorMessage}</h3>`;
                }
                else {
                    errorMessage.innerHTML = "<h3>Something Went Wrong!</h3>";
                }
                $('#myModal200').modal('show');
            }
        })
}

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

function textBoxKeyupHandler(checkbox, textbox) {
    checkbox.disabled = true;
    if (!textbox.value.length) {
        checkbox.disabled = false;
    }
}
function checkBoxClickHandler(checkbox, textbox) {
    if (checkbox.checked === false) {
        textbox.disabled = false;
    }
    else {
        textbox.disabled = true;
        textbox.value = "";
    }
}

// Super Admin Starts

var Org_JCSP = document.getElementById("Org_JCSP");
var Mer_JCSP = document.getElementById("Mer_JCSP");
var Receiver_JCSP = document.getElementById("Receiver_JCSP");

var Org_JCCSP = document.getElementById("Org_JCCSP");
var Mer_JCCSP = document.getElementById("Mer_JCCSP");
var Receiver_JCCSP = document.getElementById("Receiver_JCCSP");

var Org_ETPSP = document.getElementById("Org_ETPSP");
var Mer_ETPSP = document.getElementById("Mer_ETPSP");
var Receiver_ETPSP = document.getElementById("Receiver_ETPSP");

var Org_ETPCSP = document.getElementById("Org_ETPCSP");
var Mer_ETPCSP = document.getElementById("Mer_ETPCSP");
var Receiver_ETPCSP = document.getElementById("Receiver_ETPCSP");

var Org_PUSP = document.getElementById("Org_PUSP");
var Mer_PUSP = document.getElementById("Mer_PUSP");
var Receiver_PUSP = document.getElementById("Receiver_PUSP");

var Org_PUCSP = document.getElementById("Org_PUCSP");
var Mer_PUCSP = document.getElementById("Mer_PUCSP");
var Receiver_PUCSP = document.getElementById("Receiver_PUCSP");

var Org_ETDSP = document.getElementById("Org_ETDSP");
var Mer_ETDSP = document.getElementById("Mer_ETDSP");
var Receiver_ETDSP = document.getElementById("Receiver_ETDSP");

var Org_ETDCSP = document.getElementById("Org_ETDCSP");
var Mer_ETDCSP = document.getElementById("Mer_ETDCSP");
var Receiver_ETDCSP = document.getElementById("Receiver_ETDCSP");

var Org_DSP = document.getElementById("Org_DSP");
var Mer_DSP = document.getElementById("Mer_DSP");
var Receiver_DSP = document.getElementById("Receiver_DSP");

var Org_DCSP = document.getElementById("Org_DCSP");
var Mer_DCSP = document.getElementById("Mer_DCSP");
var Receiver_DCSP = document.getElementById("Receiver_DCSP");

var Org_OHSP = document.getElementById("Org_OHSP");
var Mer_OHSP = document.getElementById("Mer_OHSP");
var Receiver_OHSP = document.getElementById("Receiver_OHSP");

var Org_OHCSP = document.getElementById("Org_OHCSP");
var Mer_OHCSP = document.getElementById("Mer_OHCSP");
var Receiver_OHCSP = document.getElementById("Receiver_OHCSP");

var Org_RSP = document.getElementById("Org_RSP");
var Mer_RSP = document.getElementById("Mer_RSP");
var Receiver_RSP = document.getElementById("Receiver_RSP");

var Org_RCSP = document.getElementById("Org_RCSP");
var Mer_RCSP = document.getElementById("Mer_RCSP");
var Receiver_RCSP = document.getElementById("Receiver_RCSP");

var Org_CSP = document.getElementById("Org_CSP");
var Mer_CSP = document.getElementById("Mer_CSP");
var Receiver_CSP = document.getElementById("Receiver_CSP");

var Org_CCSP = document.getElementById("Org_CCSP");
var Mer_CCSP = document.getElementById("Mer_CCSP");
var Receiver_CCSP = document.getElementById("Receiver_CCSP");

// Super Admin Ends

Org_JCSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_JCCSP, Org_JCSP);
});
Mer_JCSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_JCCSP, Mer_JCSP);
});

Receiver_JCSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_JCCSP, Receiver_JCSP);
});

Org_JCCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_JCCSP, Org_JCSP);
});

Mer_JCCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_JCCSP, Mer_JCSP);
});

Receiver_JCCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_JCCSP, Receiver_JCSP);
});

Org_ETPSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_ETPCSP, Org_ETPSP);
});

Mer_ETPSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_ETPCSP, Mer_ETPSP);
});

Receiver_ETPSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_ETPCSP, Receiver_ETPSP);
});

Org_ETPCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_ETPCSP, Org_ETPSP);
});

Mer_ETPCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_ETPCSP, Mer_ETPSP);
});

Receiver_ETPCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_ETPCSP, Receiver_ETPSP);
});

Org_PUSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_PUCSP, Org_PUSP);
});
Mer_PUSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_PUCSP, Mer_PUSP);
});

Receiver_PUSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_PUCSP, Receiver_PUSP);
});

Org_PUCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_PUCSP, Org_PUSP);
});

Mer_PUCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_PUCSP, Mer_PUSP);
});

Receiver_PUCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_PUCSP, Receiver_PUSP);
});

Org_ETDSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_ETDCSP, Org_ETDSP);
});

Mer_ETDSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_ETDCSP, Mer_ETDSP);
});

Receiver_ETDSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_ETDCSP, Receiver_ETDSP);
});

Org_ETDCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_ETDCSP, Org_ETDSP);
});

Mer_ETDCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_ETDCSP, Mer_ETDSP);
});

Receiver_ETDCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_ETDCSP, Receiver_ETDSP);
});
Org_DSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_DCSP, Org_DSP);
});

Mer_DSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_DCSP, Mer_DSP);
});
Receiver_DSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_DCSP, Receiver_DSP);
});

Org_DCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_DCSP, Org_DSP);
});

Mer_DCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_DCSP, Mer_DSP);
});

Receiver_DCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_DCSP, Receiver_DSP);
});
Org_OHSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_OHCSP, Org_OHSP);
});

Mer_OHSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_OHCSP, Mer_OHSP);
});

Receiver_OHSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_OHCSP, Receiver_OHSP);
});

Org_OHCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_OHCSP, Org_OHSP);
});

Mer_OHCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_OHCSP, Mer_OHSP);
});

Receiver_OHCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_OHCSP, Receiver_OHSP);
});

Org_RSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_RCSP, Org_RSP);
});

Mer_RSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_RCSP, Mer_RSP);
});

Receiver_RSP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_RCSP, Receiver_RSP);
});

Org_RCSP.addEventListener("click", function () {
    checkBoxClickHandler(Org_RCSP, Org_RSP);
});

Mer_RCSP.addEventListener("click", function () {
    checkBoxClickHandler(Mer_RCSP, Mer_RSP);
});

Receiver_RCSP.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_RCSP, Receiver_RSP);
});

/* 


*/

var Org_JC = document.getElementById("Org_JC");
var Mer_JC = document.getElementById("Mer_JC");
var Receiver_JC = document.getElementById("Receiver_JC");

var Org_JCC = document.getElementById("Org_JCC");
var Mer_JCC = document.getElementById("Mer_JCC");
var Receiver_JCC = document.getElementById("Receiver_JCC");

Org_JC.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_JCC, Org_JC);
});

Mer_JC.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_JCC, Mer_JC);
});

Receiver_JC.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_JCC, Receiver_JC);
});

Org_JCC.addEventListener("click", function () {
    checkBoxClickHandler(Org_JCC, Org_JC);
});

Mer_JCC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_JCC, Mer_JC);
});

Receiver_JCC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_JCC, Receiver_JC);
});


var Org_ETP = document.getElementById("Org_ETP");
var Mer_ETP = document.getElementById("Mer_ETP");
var Receiver_ETP = document.getElementById("Receiver_ETP");

var Org_ETPC = document.getElementById("Org_ETPC");
var Mer_ETPC = document.getElementById("Mer_ETPC");
var Receiver_ETPC = document.getElementById("Receiver_ETPC");


Org_ETP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_ETPC, Org_ETP);
});

Mer_ETP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_ETPC, Mer_ETP);
});

Receiver_ETP.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_ETPC, Receiver_ETP);
});

Org_ETPC.addEventListener("click", function () {
    checkBoxClickHandler(Org_ETPC, Org_ETP);
});

Mer_ETPC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_ETPC, Mer_ETP);
});

Receiver_ETPC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_ETPC, Receiver_ETP);
});


var Org_PU = document.getElementById("Org_PU");
var Mer_PU = document.getElementById("Mer_PU");
var Receiver_PU = document.getElementById("Receiver_PU");

var Org_PUC = document.getElementById("Org_PUC");
var Mer_PUC = document.getElementById("Mer_PUC");
var Receiver_PUC = document.getElementById("Receiver_PUC");


Org_PU.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_PUC, Org_PU);
});

Mer_PU.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_PUC, Mer_PU);
});

Receiver_PU.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_PUC, Receiver_PU);
});

Org_PUC.addEventListener("click", function () {
    checkBoxClickHandler(Org_PUC, Org_PU);
});

Mer_PUC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_PUC, Mer_PU);
});

Receiver_PUC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_PUC, Receiver_PU);
});

var Org_ETD = document.getElementById("Org_ETD");
var Mer_ETD = document.getElementById("Mer_ETD");
var Receiver_ETD = document.getElementById("Receiver_ETD");

var Org_ETDC = document.getElementById("Org_ETDC");
var Mer_ETDC = document.getElementById("Mer_ETDC");
var Receiver_ETDC = document.getElementById("Receiver_ETDC");


Org_ETD.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_ETDC, Org_ETD);
});

Mer_ETD.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_ETDC, Mer_ETD);
});

Receiver_ETD.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_ETDC, Receiver_ETD);
});


Org_ETDC.addEventListener("click", function () {
    checkBoxClickHandler(Org_ETDC, Org_ETD);
});

Mer_ETDC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_ETDC, Mer_ETD);
});

Receiver_ETDC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_ETDC, Receiver_ETD);
});

var Org_D = document.getElementById("Org_D");
var Mer_D = document.getElementById("Mer_D");
var Receiver_D = document.getElementById("Receiver_D");

var Org_DC = document.getElementById("Org_DC");
var Mer_DC = document.getElementById("Mer_DC");
var Receiver_DC = document.getElementById("Receiver_DC");


Org_D.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_DC, Org_D);
});

Mer_D.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_DC, Mer_D);
});

Receiver_D.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_DC, Receiver_D);
});


Org_DC.addEventListener("click", function () {
    checkBoxClickHandler(Org_DC, Org_D);
});

Mer_DC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_DC, Mer_D);
});

Receiver_DC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_DC, Receiver_D);
});

var Org_OH = document.getElementById("Org_OH");
var Mer_OH = document.getElementById("Mer_OH");
var Receiver_OH = document.getElementById("Receiver_OH");

var Org_OHC = document.getElementById("Org_OHC");
var Mer_OHC = document.getElementById("Mer_OHC");
var Receiver_OHC = document.getElementById("Receiver_OHC");

Org_OH.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_OHC, Org_OH);
});

Mer_OH.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_OHC, Mer_OH);
});

Receiver_OH.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_OHC, Receiver_OH);
});

Org_OHC.addEventListener("click", function () {
    checkBoxClickHandler(Org_OHC, Org_OH);
});

Mer_OHC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_OHC, Mer_OH);
});

Receiver_OHC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_OHC, Receiver_OH);
});

var Org_R = document.getElementById("Org_R");
var Mer_R = document.getElementById("Mer_R");
var Receiver_R = document.getElementById("Receiver_R");

var Org_RC = document.getElementById("Org_RC");
var Mer_RC = document.getElementById("Mer_RC");
var Receiver_RC = document.getElementById("Receiver_RC");

Org_R.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_RC, Org_R);
});

Mer_R.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_RC, Mer_R);
});

Receiver_R.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_RC, Receiver_R);
});

Org_RC.addEventListener("click", function () {
    checkBoxClickHandler(Org_RC, Org_R);
});

Mer_RC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_RC, Mer_R);
});

Receiver_RC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_RC, Receiver_R);
});

var Org_C = document.getElementById("Org_C");
var Mer_C = document.getElementById("Mer_C");
var Receiver_C = document.getElementById("Receiver_C");

var Org_CC = document.getElementById("Org_CC");
var Mer_CC = document.getElementById("Mer_CC");
var Receiver_CC = document.getElementById("Receiver_CC");

Org_C.addEventListener("keyup", function () {
    textBoxKeyupHandler(Org_CC, Org_C);
});

Mer_C.addEventListener("keyup", function () {
    textBoxKeyupHandler(Mer_CC, Mer_C);
});

Receiver_C.addEventListener("keyup", function () {
    textBoxKeyupHandler(Receiver_CC, Receiver_C);
});

Org_CC.addEventListener("click", function () {
    checkBoxClickHandler(Org_CC, Org_C);
});

Mer_CC.addEventListener("click", function () {
    checkBoxClickHandler(Mer_CC, Mer_C);
});

Receiver_CC.addEventListener("click", function () {
    checkBoxClickHandler(Receiver_CC, Receiver_C);
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
        }, 4500);
    }
}

function errorShow(data, button) {
    button.disabled = false;
    var ob = Object.keys(data);
    if (ob[17] == "responseJSON") {
        errorMessage.innerHTML = `<h3>${data.responseJSON.errorMessage}</h3>`;
    }
    else {
        errorMessage.innerHTML = "<h3>Something Went Wrong!</h3>";
    }
    $("#myModalCreateDDD1").modal('hide');
    $('#myModal200').modal('show');
}

function emptyCheckForJC(org, orgc, mer, merc, rec, recc) {
    var counter = 0;
    var text = "";
    org.value || orgc.checked ? ++counter : text = "Organization - Either give some text OR check 'No SMS'";
    if (text) {
        return { counter, text };
    }
    mer.value || merc.checked ? ++counter : text = "Merchant - Either give some text OR check 'No SMS'";
    if (text) {
        return { counter, text };
    }
    rec.value || recc.checked ? ++counter : text = "Receiver - Either give some text OR check 'No SMS'";
    return { counter, text };
}

function check(org, orgc, mer, merc, rec, recc, msg) {
    var checking = emptyCheckForJC(org, orgc, mer, merc, rec, recc);
    if (checking.counter !== 3) {
        errorMessage.innerHTML = `<h3>${msg}<br>${checking.text}</h3>`;
        $('#myModal200').modal('show');
        return false;
    }
    return true;
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
                Org_JCAdmin(btnJC);
            },
            error: function (data) {
                errorShow(data, btnJC);
            }
        })
});

function Org_JCAdmin(button) {
    $.ajax
        ({
            type: "PUT",
            url: `${urlForAll}custom/sms/update/admin/${orgID}?smsState=ASSIGN&smsContentSuperAdmin=${Org_JCSP.value ? encodeURIComponent(Org_JCSP.value) : ""}&forSender=false&forReceiver=false&forOrg=true&noSms=${Org_JCCSP.checked}&approvedBy=${localStorage.getItem('userEmail')}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                two(button);
            },
            error: function (data) {
                errorShow(data, btnJC);
            }
        })
}

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
                Mer_JCAdmin(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

function Mer_JCAdmin(button) {
    $.ajax
        ({
            type: "PUT",
            url: `${urlForAll}custom/sms/update/admin/${orgID}?smsState=ASSIGN&smsContentSuperAdmin=${Mer_JCSP.value ? encodeURIComponent(Mer_JCSP.value) : ""}&forSender=true&forReceiver=false&forOrg=false&noSms=${Mer_JCCSP.checked}&approvedBy=${localStorage.getItem('userEmail')}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
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
                Rec_JCAdmin(button);
            },
            error: function (data) {
                errorShow(data, button);
            }
        })
}

function Rec_JCAdmin(button) {
    $.ajax
        ({
            type: "PUT",
            url: `${urlForAll}custom/sms/update/admin/${orgID}?smsState=ASSIGN&smsContentSuperAdmin=${Receiver_JCSP.value ? encodeURIComponent(Receiver_JCSP.value) : ""}&forSender=false&forReceiver=true&forOrg=false&noSms=${Receiver_JCCSP.checked}&approvedBy=${localStorage.getItem('userEmail')}`,
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
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