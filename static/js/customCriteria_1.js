var org_ID = localStorage.getItem('userID');
var org_Email = localStorage.getItem('userEmail');
$(document).ready(function () {

    $('#settings').hide();
    $('.container').hide();
    $('#createCriteria').hide();
    $.ajax({
        url: urlForAll + "approved/delivery/district",
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
});