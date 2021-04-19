var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
var day = weight = distance = type = 0;
$(document).ready(function () {
    $('#settings').hide();
    $('.container').hide();
    $('#createCriteria').hide();

    function createFieldStart(data) {
        console.log(Object.keys(data), data);
        let div;
        Object.keys(data).map(item => {
            div = document.querySelector(`.col.${item}`);
            for (let i of data[item]) {
                createField(item, i);
                // item === "dayType" ? day++ : item === "productType" ? type++ : item === "weight" ? weight++ : item === "distance" ? distance++ : null;
            }
        });
    }
    function fillInput() {
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
                createFieldStart(data.data);
            }
        });
    }
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
            data.data === true ? fillInput() : null;
        }
    });
});
