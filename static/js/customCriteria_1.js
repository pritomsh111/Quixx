var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
var day = weight = distance = type = flag = 0;
function createFieldStart(data, isTab) {
    let div;
    Object.keys(data).map(item => {
        div = document.querySelector(`.col.${item}`);
        for (let i of data[item]) {
            isTab ? fillInputDetails(item, i) : createField(item, i);
        }
    });
}
function fillInput(isTab = false) {
    $.ajax({
        url: urlForAll + "delivery/criteria/keys/" + org_ID,
        type: "GET",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            createFieldStart(data.data, isTab);

        }
    });
}

function getKeys() {
    let keys = [4, 12];
    return keys.indexOf(Number(localStorage.getItem("userID"))) !== -1 ? true : false;
}

$(document).ready(function () {
    $('#settings').hide();
    $('.container').hide();
    $('#createCriteria').hide();
    document.getElementById('setCriteriaDetails').style.display = "none";
    flag = getKeys();
    $.ajax({
        url: urlForAll + "delivery/criteria/enable/" + org_ID,
        type: "GET",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            fillInput();
        }
    });
});
