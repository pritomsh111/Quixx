document.querySelector('.a').addEventListener('click', (e) => {
    console.log("1");
}, true);
document.querySelector('.b').addEventListener('click', (e) => {
    console.log("2");
});
document.querySelector('.c').addEventListener('click', (e) => {
    console.log("3");
}, true);
document.querySelector('.d').addEventListener('click', (e) => {
    console.log("4");
});
document.querySelector('.e').addEventListener('click', (e) => {
    console.log("5");
}, true);

let obj = { a: 1 };

function hello() {
    console.log(this);
}

const h = () => {
    console.log(this);
}

hello.call(obj);
h.call(obj);