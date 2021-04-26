var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
var day = weight = distance = type = city = flag = 0;
var criteriaEnabled = false, fillData;
function createFieldStart(data, isTab) {
    Object.keys(data).map(item => {
        div = document.querySelector(`.col.${item}`);
        for (let i of data[item]) {
            isTab ? fillInputDetails(item, i) : createField(item, i);
        }
    });
}

async function fillInput(isTab = false) {
    await $.ajax({
        url: urlForAll + "delivery/criteria/keys/" + org_ID,
        type: "GET",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            // let check = ["city", "dayType", "productType", "distance", "weight"]
            createFieldStart(data.data, isTab);
            fillData = data.data;
            // check.map(item => {
            //     if (!data.data[item]) {
            //         delete fillData[item];
            //     }
            // });
        }
    });

}

async function getKeys() {
    let result = await $.ajax({
        url: urlForAll + "delivery/criteria/enable/key/" + org_ID,
        type: "GET",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {

        }
    });
    return result.data;
}
$(document).ready(async function () {
    $('#settings').hide();
    $('.container').hide();
    $('#createCriteria').hide();
    document.getElementById('setCriteriaDetails').style.display = "none";
    flag = await getKeys();
    if (flag) {
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
                criteriaEnabled = data.data;
                fillInput();
            }
        });
    }
});
