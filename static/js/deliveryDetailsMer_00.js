var merchant_ID = localStorage.getItem("userID");
$.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class

function one1() {
    setTimeout(function () { $('#loaderMama10').fadeOut(); }, 2100);
}
function two2() {
    setTimeout(function () { $('div#hideKoro10').removeClass("hidden"); $('#hideKoro10').fadeIn(); }, 2900);
}
function three3() {
    setTimeout(function () {
        $('#dtBasicExample').hide();
        $('.a').hide();
        $('#dtBasicExampleAp').hide();
        $('#dtBasicExampleNew').hide();
        $('.b').hide();
        $('.c').hide();
        $('.d').hide();
        $('.e').hide();
        $('#dtBasicExampled').hide();
        onGoingDeliveries();
    }, 3700);
}

$(document).ready(function () {
    $('#settingsMer').hide();
    $("#cod").hide();
    $('#dtBasicExample').hide();
    $('.a').hide();
    $('#dtBasicExampleAp').hide();
    $('#dtBasicExampleNew').hide();
    $('.b').hide();
    $('.c').hide();
    $('.d').hide();
    $('.e').hide();
    $('#dtBasicExampled').hide();
    $(".container").hide();
    $('.criteria')
        .hide();
    document.getElementById('body').style.pointerEvents = "auto";
    $.fn.dataTable.ext.classes.sPageButton = 'btn btn-outline btn-round'; // Change Pagination Button Class
});