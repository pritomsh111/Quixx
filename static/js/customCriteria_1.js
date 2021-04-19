var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
var day = weight = distance = type = flag = 0;
$(document).ready(function () {
    $('#settings').hide();
    $('.container').hide();
    $('#createCriteria').hide();
    document.getElementById('setCriteriaDetails').style.display = "none";
    function createFieldStart(data) {
        let div;
        Object.keys(data).map(item => {
            div = document.querySelector(`.col.${item}`);
            for (let i of data[item]) {
                createField(item, i);
                fillInputDetails(item, i);
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
            if (data.data === true) {
                fillInput();
                flag = 1;
            }
        }
    });
});
