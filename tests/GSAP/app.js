gsap.to("#recx", { x: 200, scale: 1.2, rotation: 90, duration: 3, xPercent: 100 });
gsap.to("#recx", { strokeWidth: 20 });
gsap.to("#recx", { strokeDasharray: 0, duration: 10, yoyo: true, repeat: -1 });

window.addEventListener("load", function () {
    console.log("load");
});
window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM");
});
function _32() {
    console.log("HEllo");
}

_32();
// let a = Object.create({}, { one: { value: 3, enumerable: true }, two: { value: 4 } });

// console.log(a);

// for (const key in a) {
//     console.log(key);
// }
// console.log(b);

// function Person() {
//     this.name = "Hello"
// }

// let a = new Person();

// Person.prototype.age = 10;

// let b = Object.create(a);

// Array.prototype.hello = 100;

// let arr = [12, 12, 12];

// class Hello {
//     omg = "Hello";
// }

// Hello.prototype.ass = () => {
//     console.log(this);
// }

// let h = new Hello();

// class pelllo extends Hello {

// }

// let p = new pelllo();