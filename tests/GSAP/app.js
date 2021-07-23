gsap.to("#recx", { x: 400, scale: 1.2, rotation: 60, duration: 3, xPercent: -300 });


// let a = Object.create({}, { one: { value: 3, enumerable: true }, two: { value: 4 } });

// console.log(a);

// for (const key in a) {
//     console.log(key);
// }
// console.log(b);

function Person() {
    this.name = "Hello"
}

let a = new Person();

Person.prototype.age = 10;

let b = Object.create(a);

Array.prototype.hello = 100;

let arr = [12, 12, 12];

class Hello {
    omg = "Hello";
}

Hello.prototype.ass = () => {
    console.log(this);
}

let h = new Hello();

class pelllo extends Hello {

}

let p = new pelllo();