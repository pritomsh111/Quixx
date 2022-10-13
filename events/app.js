document.querySelector('.a').addEventListener('click', function (e) {
    console.log('a');
}, false);

document.querySelector('.b').addEventListener('click', function (e) {
    console.log('b');
    e.stopPropagation();
}, false);

document.querySelector('.c').addEventListener('click', function (e) {
    console.log('c');
}, true);

document.querySelector('.d').addEventListener('click', function (e) {
    console.log('d');
}, false);

document.querySelector('.e').addEventListener('click', function (e) {
    console.log('e');
}, false);
