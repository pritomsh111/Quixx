function one1() {
    setTimeout(function () { $('#loaderMama6').fadeOut(); }, 2100);
}
function two2() {
    setTimeout(() => {
        clearTimeout(interVal);
    }, 1000);
    setTimeout(function () { $('div#hideKoro6').removeClass("hidden"); $('#hideKoro6').fadeIn(); }, 2700);
}