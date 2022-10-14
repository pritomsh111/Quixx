// Event Bubbling and Capturing/Trickling
// document.querySelector('.a').addEventListener('click', function (e) {
//     console.log('a');
// }, false);

// document.querySelector('.b').addEventListener('click', function (e) {
//     console.log('b');
//     e.stopPropagation();
// }, false);

// document.querySelector('.c').addEventListener('click', function (e) {
//     console.log('c');
// }, true);

// document.querySelector('.d').addEventListener('click', function (e) {
//     console.log('d');
// }, false);

// document.querySelector('.e').addEventListener('click', function (e) {
//     console.log('e');
// }, false);


// Keystroke Speed test


const speed = document.querySelector("#speed");

speed.addEventListener('keypress', (e) => {
    console.log(e.key + " keypress");
});

speed.addEventListener('keydown', (e) => {
    console.log(e.key + " keydown");
});

speed.addEventListener('keyup', (e) => {
    console.log(e.key + " keyup");
});
