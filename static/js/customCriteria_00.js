function one1() {
    setTimeout(function () { $('#loaderMama8').fadeOut(); }, 2100);
}
function two2() {
    setTimeout(function () { $('div#hideKoro8').removeClass("hidden"); $('#hideKoro8').fadeIn(); }, 2900);
}
function three3() {
    setTimeout(function () {
        document.getElementById('one-cc').disabled = true;
        document.getElementById('two-cc').disabled = false;

        document.getElementById('one-cc').style.fontSize = '14.5px';
        document.getElementById('two-cc').style.fontSize = '13px';

        $('#createCriteria').show();
    }, 3700);
}