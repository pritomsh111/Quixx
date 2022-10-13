document.querySelector('.a').addEventListener('click', function (e) {
    console.log('a');
}, false);

document.querySelector('.b').addEventListener('click', function (e) {
    console.log('b');
}, true);

document.querySelector('.c').addEventListener('click', function (e) {
    console.log('c');
}, false);

document.querySelector('.d').addEventListener('click', function (e) {
    console.log('d');
    e.stopPropagation();
}, false);

document.querySelector('.e').addEventListener('click', function (e) {
    console.log('e');
}, false);
